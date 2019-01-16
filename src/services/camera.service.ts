import {Camera} from "../entities/camera";
import {Injectable} from "@angular/core";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {RequestOptions, Headers, Http} from "@angular/http";

@Injectable()
export class CameraService {
  cameraList: Camera[];
  observers: any[];

  constructor(private sqlite: SQLite,
              private http: Http) {
    this.cameraList = [];
    this.observers = [];
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS camera(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'model TEXT, brand TEXT, serialNumber TEXT UNIQUE, ip TEXT, registerTime datetime, status INTEGER,' +
        'roomId INTEGER, directStreamUrl TEXT DEFAULT NULL,' +
        'FOREIGN KEY (roomId) REFERENCES room(id))'
        // + 'FOREIGN KEY (directStreamId) REFERENCES directStream(id))'
        , [])
        .then(res => console.log('Executed create table SQL'))
        .catch(e => console.log('create table camera error1: '+e.message));
    })
  }

  updateFromLocal(){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM camera', [])
        .then(res => {
          this.cameraList = [];
          for(let i=0; i<res.rows.length; i++) {
            this.cameraList.push(new Camera(res.rows.item(i).model,res.rows.item(i).brand,res.rows.item(i).serialNumber,
              res.rows.item(i).ip,res.rows.item(i).registerTime,res.rows.item(i).status,res.rows.item(i).roomId,res.rows.item(i).directStreamUrl,res.rows.item(i).id));
          }
          return this.cameraList;
        }).catch(e => {
          console.log('CameraService-updateFromLocal error: '+e.message,e);
          return [];
        });
    }).catch(e => {
      console.log('CameraService-updateFromLocal error: '+e.message,e);
      return [];
    })
  }

  addToLocal(camera: Camera){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then( (db:SQLiteObject) => {
      return db.executeSql('INSERT INTO camera VALUES(NULL,?,?,?,?,?,?,?,?)',
        [camera.model,camera.brand,camera.serialNumber,camera.ip,camera.registerTime,camera.status,camera.roomId,camera.directStreamUrl])
        .then( res => {
          console.log(res);
          camera.id = res.insertId;
          this.cameraList.push(camera);
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('CameraService-addToLocal INSERT error: '+e.message,e);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('CameraService-addToLocal open error: '+e.message,e);
      return Promise.resolve('error');
    })
  }

  modifyLocalStatus(camera:Camera,status:boolean) {
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db:SQLiteObject) => {
      return db.executeSql('UPDATE camera SET status=? WHERE id=?',[status,camera.id])
        .then(res => {
          camera.status = status;
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('CameraService-modifyLocalStatus UPDATE error: '+e.message,e);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('CameraService-modifyLocalStatus open error: '+e.message,e);
      return Promise.resolve('error');
    })
  }

  modifyLocalUrl(camera:Camera,url:string){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db:SQLiteObject) => {
      return db.executeSql('UPDATE camera SET directStreamUrl=? WHERE id=?',[url,camera.id])
        .then(res => {
          camera.directStreamUrl = url;
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('CameraService-modifyLocalUrl UPDATE error: '+e.message,e);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('CameraService-modifyLocalUrl open error: '+e.message,e);
      return Promise.resolve('error');
    })
  }

  startLive(camera:Camera){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
  }

  stopLive(camera:Camera){

  }

  changeCameraUrl(camera:Camera,newUrl:string){

  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getCameraList() {
    return this.cameraList;
  }

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }
}
