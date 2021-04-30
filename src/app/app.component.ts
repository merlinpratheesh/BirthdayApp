import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { allDates } from './service/userdata.service';
import * as  Firestore from '@angular/fire/firestore';
import '@firebase/firestore';
import { doc, docData } from 'rxfire/firestore';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { VideoRecordingService } from './video-recording.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class AppComponent implements OnDestroy {
  title = 'zerodha';
  events: string[] = [];

  public dateForm = new FormGroup({
    DOB: new FormControl(),
    Anniv: new FormControl(),
    DOD: new FormControl(),
  });

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileUrl: Observable<string | null>;

  //-------------
  @ViewChild('videoElement') videoElement;
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  
  audioRecordedTime;
  videoRecordedTime;
  audioBlobUrl;
  videoBlobUrl;
  audioBlob;
  videoBlob;
  audioName;
  videoName;
  audioStream;
  videoStream: MediaStream;
  audioConf = { audio: true}
  videoConf = { video: { facingMode:"user", width: 320 }, audio: true}
  //--------------

  Sections = of(undefined);
  getAlldatesSubscription: Subscription;
  getAlldatesBehaviourSub = new BehaviorSubject(undefined);

  getAlldates = (Dates: AngularFirestoreDocument<allDates>) => {
    if (this.getAlldatesSubscription !== undefined) {
      this.getAlldatesSubscription.unsubscribe();
    }
    this.getAlldatesSubscription = Dates.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getAlldatesBehaviourSub.next(undefined);
      } else {
        if (val.length === 0) {
          this.getAlldatesBehaviourSub.next(null);
        } else {
          if (val.length !== 0) {
            this.getAlldatesBehaviourSub.next(val.newItem);
          }
        }
      }
    });
    return this.getAlldatesBehaviourSub;
  };
  dateRef: BehaviorSubject<any>;
  allDates: Subscription;
  oldDOB: any;
  oldAnniv: any;
  oldDOD: any;
  DOB:any;
  Anniv: any;
  DOD: any;


  constructor(private storage: AngularFireStorage, 
    private db: AngularFirestore, 
    private changeDetectorRef: ChangeDetectorRef,
    private ref: ChangeDetectorRef,
    private videoRecordingService: VideoRecordingService,
    private sanitizer: DomSanitizer) 
    {
    const ref1 = this.storage.ref('/users');
    this.profileUrl = ref1.getDownloadURL();




    this.allDates = docData(this.db.firestore.doc('testme/one-id')).subscribe((read: any) => {

      if (read !== null && read !== undefined) {
      const allDatesRef=read.newItem;
      this.oldDOB=allDatesRef.DOB;
      this.oldAnniv=allDatesRef.Anniv;
      this.oldDOD=allDatesRef.DOD;



      console.log('280',allDatesRef);
      console.log('280',this.oldDOB);
      }
    });

    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      this.ref.detectChanges();
    });

  }


  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'users';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe()
  }



  update() {

    
      this.DOB= this.dateForm.get('DOB').value,
      this.Anniv=this.dateForm.get('Anniv').value,
      this.DOD= this.dateForm.get('DOD').value

    //const res = this.db.collection('testme').doc('one-id').set({newItem}, {merge:true});
if(this.DOB===null){
  this.DOB=this.oldDOB
}
if(this.Anniv===null){
  this.Anniv=this.oldAnniv
}
if(this.DOD===null){
  this.DOD=this.oldDOD
}
        
    const newItem = {
      DOB: this.DOB,
      Anniv: this.Anniv,
      DOD: this.DOD,
    }

    console.log(newItem);
    const res = this.db.collection('testme').doc('one-id').set({ newItem }, { merge: true });
  }
  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
  }
  startVideoRecording() {
    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.videoRecordingService
        .startRecording(this.videoConf)
        .then(stream => {
          console.log('98',stream);
          // this.video.src = window.URL.createObjectURL(stream);
          this.video.srcObject = stream;
          console.log('101',this.video.srcObject);
          this.video.play();
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
    }
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  
  ngOnDestroy(): void {
    this.abortVideoRecording();
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  
}

