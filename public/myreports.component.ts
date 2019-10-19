import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../service/user.service'
import { NgForOfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ReportService } from '../service/report.service';
import {User} from '../../../backend/models/User'
import {saveAs} from 'file-saver'


@Component({
  selector: 'app-myreports',
  templateUrl: './myreports.component.html',
  styleUrls: ['./myreports.component.css']
})
export class MyreportsComponent implements OnInit {
  filesToUpload: Array<File>;
  filename:String;
  reportname:String
  userdetails:any
  user_id:any
  reports:any=[]
  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router,private reportservice:ReportService) { 
    this.filesToUpload = [];
    
   
  }

  ngOnInit() {
    if(this.userdetails=this.userservice.loggedIn() !=undefined){
      this.route.params.subscribe(params=>{this.user_id=params['id']})
      console.log(this.user_id)
      this.userdetails=this.userservice.getDetails();
      console.log(this.userdetails);
      this.getreport();
      
    }else{
      window.alert("you are not logged in")
  this.router.navigate(['/login']);
    }
    $(document).ready(function(){
      $("button").click(function(){
        $("#reportform").toggle();
      });
    });
  }
  upload() {
    this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
        console.log(result[0]);
        this.reportname=result[0].originalname;
        this.filename=result[0].filename;
        console.log(this.reportname);
        console.log(this.filename);
        var data={user:this.userdetails,reportname:this.reportname,filename:this.filename};
        this.reportservice.addreport(data);
        this.ngOnInit();

    }, (error) => {
        console.error(error);
    });
    console.log(this.filename);
}

fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads", files[i], files[i].name);
        
        }
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}
getreport(){
  this.reportservice.getreport(this.user_id).subscribe((result)=>{
    console.log(result)
    this.reports=result;
  })

}
download(index){
  console.log(index)
  var filename = this.reports[index].filename+this.reports[index].reportname;
  console.log(filename);
  this.reportservice.downloadFile(filename)
  .subscribe(
      data => saveAs(data, filename),
      error => console.error(error)
  );
}
}
