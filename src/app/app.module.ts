import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SQLite} from "@ionic-native/sqlite";
import {Toast} from "@ionic-native/toast";
import {EditDataPage} from "../pages/home/edit-data.component";
import {AddDataPage} from "../pages/home/add-data.component";
import {SchoolService} from "../services/school.service";
import {ManagementTabPage} from "../pages/managements/management-tab.component";
import {SchoolManagePage} from "../pages/managements/location/school/school-manage.component";
import {SchoolAddPage} from "../pages/managements/location/school/school-add.component";
import {CampusService} from "../services/campus.service";
import {CampusManagePage} from "../pages/managements/location/campus/campus-manage.component";
import {CampusAddPage} from "../pages/managements/location/campus/campus-add.component";
import {RoomService} from "../services/room.service";
import {RoomInfoPage} from "../pages/managements/location/room/room-info.component";
import {RoomAddPage} from "../pages/managements/location/room/room-add.component";
import {RoomManagePage} from "../pages/managements/location/room/room-manage.component";
import {CameraService} from "../services/camera.service";
import {CameraDetailPage} from "../pages/camera/camera-detail.component";
import {CameraAddPage} from "../pages/camera/camera-add.component";
import {CameraManagePage} from "../pages/camera/camera-manage.component";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EditDataPage,
    AddDataPage,
    ManagementTabPage,
    SchoolManagePage,
    SchoolAddPage,
    CampusManagePage,
    CampusAddPage,
    RoomInfoPage,
    RoomAddPage,
    RoomManagePage,
    CameraDetailPage,
    CameraAddPage,
    CameraManagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EditDataPage,
    AddDataPage,
    ManagementTabPage,
    SchoolManagePage,
    SchoolAddPage,
    CampusManagePage,
    CampusAddPage,
    RoomInfoPage,
    RoomAddPage,
    RoomManagePage,
    CameraDetailPage,
    CameraAddPage,
    CameraManagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Toast,
    SchoolService,
    CampusService,
    RoomService,
    CameraService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
