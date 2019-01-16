import {Component} from "@angular/core";
import {Camera} from "../../../../entities/camera";
import {Server} from "../../../../entities/server";
import {Room} from "../../../../entities/room";
import {App, NavParams} from "ionic-angular";
import {School} from "../../../../entities/school";
import {Campus} from "../../../../entities/campus";
import {DirectStream} from "../../../../entities/directStream";
import {CameraService} from "../../../../services/camera.service";

@Component({
  selector: 'page-room-info',
  templateUrl: 'room-info.component.html'
})

export class RoomInfoPage{
  school:School;
  campus:Campus;
  room:Room;
  cameraList: Camera[];
  serverList: Server[];
  directStreamList: DirectStream[];
  constructor(public cameraService: CameraService,
              /*
              public serverService: ServerService,
              public directStreamService: DirectStreamService,*/
              public navParam: NavParams,
              public appCtrl: App
              ){
    this.school = navParam.get('school');
    this.campus = navParam.get('campus');
    this.room = navParam.get('room');
    /*
    this.cameraList = cameraService.getCameraList();
    this.serverList = serverService.getServerList();
    this.directStreamList = directStreamService.getDirectStreamList();
    */


  }

  showStreamUrl(camera:Camera){
    return '';
    // if (camera.directStreamId == null || camera.directStreamId == undefined)
    //   return '';
    // else {
    //   let temp:DirectStream = this.directStreamService.getDirectStreamById(camera.directStreamId);
    //   if (temp == undefined)
    //     return '';
    //   else
    //     return temp.url;
    // }
  }
  ionViewDidEnter(){
    this.cameraService.updateFromLocal().then( cameras => {
      this.cameraList = cameras;
    });
    this.cameraService.registerPage(this);
    /*
    this.serverService.updateServerList().then( servers => {
      this.serverList = servers;
    });
    this.directStreamService.updateDirectStreamList().then(streams => {
      this.directStreamList = streams;
    });
    this.directStreamService.registerPage(this);
    this.serverService.registerPage(this);
    */
  }

  ionViewDidLeave(){
    this.cameraService.removePage(this);
    // this.serverService.removePage(this);
    // this.directStreamService.removePage(this);
  }

  update(){
    this.cameraService.updateFromLocal().then( cameras => {
      this.cameraList = cameras;
    });
    // this.serverService.updateServerList().then( servers => {
    //   this.serverList = servers;
    // });
  }

  // gotoServerInfo(server:Server){
  //   this.appCtrl.getRootNavs()[0].push(ServerInfoPage,{
  //     server:server,
  //     roomName:this.room.name
  //   })
  // }
}
