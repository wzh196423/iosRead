import {Room} from "../entities/room";
import {Injectable} from "@angular/core";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Campus} from "../entities/campus";

@Injectable()
export class RoomService {
  roomList: Room[];
  observers: any[];
  constructor(private sqlite: SQLite) {
    this.roomList = [];
    this.observers = [];
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS room(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,' +
        ' campusId INTEGER, FOREIGN KEY (campusId) REFERENCES campus(id))', [])
        .then(res => console.log('Executed create table SQL'))
        .catch(e => console.log('create table room error: ',e.message));
    })
  }

  updateFromLocal(){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM room', [])
        .then(res => {
          this.roomList = [];
          for(let i=0; i<res.rows.length; i++) {
            this.roomList.push(new Room(res.rows.item(i).name,res.rows.item(i).campusId, res.rows.item(i).id));
          }
          return this.roomList;
        }).catch(e => {
          console.log('RoomService-updateFromLocal error: ',e.message);
          return [];
        });
    }).catch(e => {
      console.log('RoomService-updateFromLocal error: ',e.message);
      return [];
    })
  }

  addToLocal(room: Room){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then( (db:SQLiteObject) => {
      return db.executeSql('INSERT INTO room VALUES(NULL,?,?)', [room.name,room.campusId])
        .then( res => {
          room.id = res.insertId;
          console.log(res);
          console.log('the id is:' + res.insertId);
          //{"rows":{"length":0},"rowsAffected":1,"insertId":1}
          this.roomList.push(room);
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('RoomService-addToLocal INSERT error: ',e.message);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('RoomService-addToLocal open error: ',e.message);
      return Promise.resolve('error');
    })
  }

  getRoomList() {
    return this.roomList;
  }

  registerPage(page: any) {
    this.observers.push(page);
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
  }

  update() {
    this.observers.forEach(item => item.update());
  }
}
