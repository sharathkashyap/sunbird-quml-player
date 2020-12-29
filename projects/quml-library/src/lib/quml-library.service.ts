import { EventEmitter, Injectable } from '@angular/core';
import { CsTelemetryModule } from '@project-sunbird/client-services/telemetry';
import { QumlPlayerConfig, Context } from './quml-library-interface';
import { UtilService } from './util-service';


@Injectable({
  providedIn: 'root'
})
export class QumlLibraryService {
  duration: number;
  channel: string;
  telemetryEvent = new EventEmitter<any>();
  private context: Context;
  private telemetryObject: any;
  private contentSessionId: string;
  private playSessionId: string;

  constructor(
    public utilService: UtilService
  ) {

  }

  initializeTelemetry(config: QumlPlayerConfig) {
    this.duration = new Date().getTime();
    this.context = config.context;
    this.contentSessionId = this.utilService.uniqueId();
    this.playSessionId = this.utilService.uniqueId();
    console.log('context', this.context);

    if (!CsTelemetryModule.instance.isInitialised) {
      CsTelemetryModule.instance.init({});
      CsTelemetryModule.instance.telemetryService.initTelemetry(
        {
          config: {
            pdata: config.context.pdata,
            env: 'ContentPlayer',
            channel: config.context.channel,
            did: config.context.did,
            authtoken: config.context.authToken || '',
            uid: config.context.uid || '',
            sid: config.context.sid,
            batchsize: 20,
            mode: config.context.mode,
            host: config.context.host || '',
            endpoint: config.context.endpoint || '/data/v3/telemetry',
            tags: config.context.tags,
            cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
            { id: this.playSessionId, type: 'PlaySession' }]
          },
          userOrgDetails: {}
        }
      );
    }

    this.telemetryObject = {
      id: config.metadata.identifier,
      type: 'Content',
      ver: config.metadata.pkgVersion + '',
      rollup: this.context.objectRollup || {}
    };
  }

  // public onTelemetry(callback: () => void) {

  // }

  public start(duration) {
    CsTelemetryModule.instance.telemetryService.raiseStartTelemetry(
      {
        options: this.getEventOptions(),
        edata: { type: 'content', mode: 'play', pageid: '', duration: Number((duration / 1e3).toFixed(2)) }
      }
    );
  }
  public end(duration, currentQuestionIndex, totalNoofQuestions, visitedQuestions, endpageseen) {
    console.log(currentQuestionIndex, totalNoofQuestions);
    const durationSec = Number((duration / 1e3).toFixed(2));
    const endEvent = {
      edata: {
        type: 'content',
        mode: 'play',
        pageid: 'sunbird-player-Endpage',
        summary: [
          {
            progress: Number(((currentQuestionIndex / totalNoofQuestions) * 100).toFixed(0))
          },
          {
            totalNoofQuestions: totalNoofQuestions
          },
          {
            visitedQuestions: visitedQuestions,
          },
          {
            endpageseen
          }
        ],
        duration: durationSec
      },
      options: this.getEventOptions()
    };
    CsTelemetryModule.instance.telemetryService.raiseEndTelemetry({
      edata: {
        type: 'content',
        mode: 'play',
        pageid: 'sunbird-player-Endpage',
        summary: [
          {
            progress: Number(((currentQuestionIndex / totalNoofQuestions) * 100).toFixed(0))
          },
          {
            totalNoofQuestions: totalNoofQuestions
          },
          {
            visitedQuestions: visitedQuestions,
          },
          {
            endpageseen
          }
        ],
        duration: durationSec
      },
      options: this.getEventOptions()
    });
    console.log('end event in raw is here', endEvent);
  }

  public interact(id, currentPage) {
    CsTelemetryModule.instance.telemetryService.raiseInteractTelemetry({
      options: this.getEventOptions(),
      edata: { type: 'TOUCH', subtype: '', id, pageid: currentPage + '' }
    });
  }

  public heartBeat(data) {
    CsTelemetryModule.instance.playerTelemetryService.onHeartBeatEvent(data, {});
  }

  public impression(currentPage) {
    CsTelemetryModule.instance.telemetryService.raiseImpressionTelemetry({
      options: this.getEventOptions(),
      edata: { type: 'workflow', subtype: '', pageid: currentPage + '', uri: '' }
    });
  }

  public error(error: Error) {
    CsTelemetryModule.instance.telemetryService.raiseErrorTelemetry({
      edata: {
        err: 'LOAD',
        errtype: 'content',
        stacktrace: (error && error.toString()) || ''
      }
    });
  }

  public getEventOptions() {
    return ({
      object: this.telemetryObject,
      context: {
        channel: this.context.channel,
        pdata: this.context.pdata,
        env: 'ContentPlayer',
        sid: this.context.sid,
        uid: this.context.uid,
        cdata: [{ id: this.contentSessionId, type: 'ContentSession' },
        { id: this.playSessionId, type: 'PlaySession' }],
        rollup: this.context.contextRollup || {}
      }
    });
  }

}

