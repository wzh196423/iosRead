import {Component} from "@angular/core";
import {App} from "ionic-angular";
import {SchoolManagePage} from "./location/school/school-manage.component";
import {CampusManagePage} from "./location/campus/campus-manage.component";
import {RoomManagePage} from "./location/room/room-manage.component";
import {CameraManagePage} from "../camera/camera-manage.component";

@Component({
  selector: 'page-management',
  templateUrl: 'management-tab.component.html'
})

export class ManagementTabPage {
  things: string[];
  pages: any[];

  constructor(public appCtrl: App) {
    //this.things = new string[0];
    this.things = [];
    this.pages = [];
    this.things.push('学校管理');
    this.pages.push(SchoolManagePage);

    this.things.push('校区管理');
    this.pages.push(CampusManagePage);

    this.things.push('教室管理');
    this.pages.push(RoomManagePage);

    this.things.push('摄像头管理');
    this.pages.push(CameraManagePage);
    //
    // this.things.push('直播频道管理');
    // this.pages.push(ChannelManagePage);
    //
    // this.things.push('服务器管理');
    // this.pages.push(ServerManagePage);

  }

  showDetail(thing: string) {
    this.appCtrl.getRootNavs()[0].push(this.pages[this.things.indexOf(thing)])
  }
}
