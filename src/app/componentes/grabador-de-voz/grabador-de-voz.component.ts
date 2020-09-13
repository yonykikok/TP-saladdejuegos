import { Component, OnInit } from '@angular/core';

declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-grabador-de-voz',
  templateUrl: './grabador-de-voz.component.html',
  styleUrls: ['./grabador-de-voz.component.css']
})
export class GrabadorDeVozComponent implements OnInit {

  public isRecording: boolean = false;
  private chunks: any = [];
  private mediaRecorder: any;
  private ultimoAudio:any;

  constructor() {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        this.chunks.length = 0;
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();
        this.ultimoAudio=audio.src;
      };
      
      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);

    navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
  }
  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }
  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }
  ngOnInit() {
  }

}
