import { Component, OnInit } from '@angular/core';
import {FuseConfigService} from '@fuse/services/config.service';
import { UsersService } from '../services/users.service';



@Component({
    selector   : 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit
{
    loggedUser:any;
    username:string;


    constructor(private _fuseConfigService: FuseConfigService,
        private _userService:UsersService) {


        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: false
                }
            }
        };
        
    }

    ngOnInit(){
        this.getProfile();
    }

    getProfile(){
        this._userService.getProfile().subscribe((response)=>{           
            this.loggedUser = response;
            this.username = this.loggedUser.username;
        }, (error)=>{
            console.log(error);
            
        });
    }
}
