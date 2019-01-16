import {Injectable} from "@angular/core";
import {School} from "../entities/school";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export class SchoolService {
  schoolList: School[];
  observers: any[];

  constructor(private sqlite: SQLite) {
    console.log('service init');
    this.observers = [];
    this.schoolList = [];
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS school(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)', [])
        .then(res => console.log('Executed create table SQL'))
        .catch(e => console.log('create table school error: ',e.message));
    })
  }

  updateFromLocal(){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT * FROM school', [])
        .then(res => {
          this.schoolList = [];
          for(let i=0; i<res.rows.length; i++) {
            this.schoolList.push(new School(res.rows.item(i).name, res.rows.item(i).id));
          }
          return this.schoolList;
        }).catch(e => {
          console.log('SchoolService-updateFromLocal SELECT error: ',e.message);
          return [];
        });
    }).catch(e => {
      console.log('SchoolService-updateFromLocal open error: ',e.message);
      return [];
    })
  }

  addToLocal(school: School){
    return this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then( (db:SQLiteObject) => {
      return db.executeSql('INSERT INTO school VALUES(NULL,?)', [school.name])
        .then( res => {
          console.log(res);
          school.id = res.insertId;
          this.schoolList.push(school);
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('SchoolService-addToLocal INSERT error: ',e.message);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('SchoolService-addToLocal open error: ',e.message);
      return Promise.resolve('error');
    })
  }

  deleteFromLocal(school:School){
    return this.sqlite.create({
      name:'ionicdb.db',
      location: 'default'
    }).then((db:SQLiteObject) => {
      return db.executeSql('DELETE FROM school WHERE id=?',[school.id])
        .then(res => {
          console.log(res);
          this.schoolList.splice(this.schoolList.indexOf(school),1);
          this.update();
          return Promise.resolve('success');
        }).catch(e => {
          console.log('SchoolService-deleteFromLocal DELETE error: ',e.message);
          return Promise.resolve('error');
        })
    }).catch(e => {
      console.log('SchoolService-deleteFromLocal open error: ',e.message);
      return Promise.resolve('error');
    })
  }

  getSchoolList() {
    return this.schoolList;
  }

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getSchoolById(id: number) {
    return this.schoolList.find(item => {
      return item.id == id;
    })
  }




}
