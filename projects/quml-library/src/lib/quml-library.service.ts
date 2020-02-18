import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QumlLibraryService {

  constructor(public http: HttpClient) {
  }

  async getQuestions() {
    return this.http.get('https://staging.ntp.net.in/api/content/v1/read/do_21295060192112640143?fields=body').toPromise();
  }

  generateTelemetry(telemetryObject?: any) {
    const date = new Date();
    const telemetryData = {
      'eid': 'DC_ASSESS', // asses
      'mid': undefined,  // uuid
      'ets': Date.now(), // time stamp
      'did': telemetryObject.did,
      'profileId': telemetryObject.profileId, // query param
      'stallId': telemetryObject.stallId, // query param
      'ideaId': telemetryObject.ideaId, // query param
      'sid': telemetryObject.sid, // query param
      'contentId': telemetryObject.contentId, // query param
      'contentType': telemetryObject.contentType, // json
      'contentName': telemetryObject.contentName, // json
      'edata': {
        'duration': telemetryObject.edata.duration, // json
        'maxScore': telemetryObject.edata.maxScore, // json
        'score': telemetryObject.edata.score // json
      }
    };
    console.log('telemetry is', telemetryData);
  }
}
