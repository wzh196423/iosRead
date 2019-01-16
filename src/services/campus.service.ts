import {Injectable} from "@angular/core";
import {Campus} from "../entities/campus";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class CampusService{
  campusList : Campus[];
  observers: any[];

  constructor(private sqlite: SQLite) {
    this.campusList = [];
    this.observers = [];
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS campus(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,' +
        ' schoolId INTEGER, FOREIGN KEY (schoolId) REFERENCES school(id))', [])
        .then(res => console.log('Executed create table SQL'))
        .catch(e => console.log('create table campus error: ',e.message));
    })
  }

  updateFromLocal(){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM campus', [])
        .then(res => {
          this.campusList = [];
          for(let i=0; i<res.rows.length; i++) {
            this.campusList.push(new Campus(res.rows.item(i).name,res.rows.item(i).schoolId, res.rows.item(i).id));
          }
          return this.campusList;
        }).catch(e => {
          console.log('CampusService-updateFromLocal error: ',e.message);
          return [];
        });
    }).catch(e => {
      console.log('CampusService-updateFromLocal error: ',e.message);
      return [];
    })
  }

  addToLocal(campus: Campus){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then( (db:SQLiteObject) => {
      return db.executeSql('INSERT INTO campus VALUES(NULL,?,?)', [campus.name,campus.schoolId])
        .then( res => {
          console.log(res);
          campus.id = res.insertId;
          this.campusList.push(campus);
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('CampusService-addToLocal INSERT error: ',e.message);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('CampusService-addToLocal open error: ',e.message);
      return Promise.resolve('error');
    })
  }

  getCampusList() {
    return this.campusList;
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
