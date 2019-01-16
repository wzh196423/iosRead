import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Camera} from "../entities/camera";

@Injectable()
export class HttpService{
  baseUrl:string;
  constructor(private http: Http){
    this.baseUrl = 'http://192.168.199.140:20000';
  }

  directConnectToCamera(camera: Camera){
    let url = 'http://'+ camera.ip + ':20000/osc/commands/execute';
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = {
      name:"camera._connect",
      parameters:{
        hw_time: "MMDDhhmm[[CC]YY][.ss]",
        time_zone:"GMT+08:00"
      }
    };
    return this.http.post(url,body,options)
      .toPromise()
      .then(res => {
        if(res.json().state == 'done'){
          return Promise.resolve(res.json().results.Fingerprint);
        }else{
          console.log('HttoService-directConnectToCamera state is error: ' + res.json().state);
          return Promise.resolve('error');
        }
      }).catch( e => {
        console.log('HttpService-directConnectToCamera error:' + e.message, e);
        return Promise.resolve('error');
      });
  }

  directStartLive(camera:Camera){
    let url = 'http://'+ camera.ip + ':20000/osc/commands/execute';
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.directConnectToCamera(camera)
      .then(data => {
        if (data != 'error'){
          headers.append('fingerprint',data);
          let options = new RequestOptions({headers: headers});
          let body = {
            name:"camera._startLive",
            parameters:{
              origin: {
                bitrate: 20000,
                width: 1920,
                framerate: 24,
                height: 1440,
                mime: "h264",
                saveOrigin: false
              },
              audio: {
                sampleFormat: "s16",
                channelLayout: "stereo",
                bitrate: 128,
                mime: "aac",
                samplerate: 48000
              },
              stiching: {
                mode: "pano",
                bitrate: 30000,
                width: 3840,
                _liveUrl: camera.directStreamUrl,
                framerate: 24,
                height: 1920,
                mime: "h264",
                fileSave:false
              }
            },
            autoConnect:{
              enable:false
            },
            storagePath:"/mnt/media_rw/3033-3738/111",
            stabilization:false
          };
          return this.http.post(url, body, options)
            .toPromise()
            .then( res => {

          })
        }
      })

    })
  }
}
