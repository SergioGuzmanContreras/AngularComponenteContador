import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  OnChanges,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "app-countdown",
  templateUrl: "./countdown.component.html",
  styleUrls: ["./countdown.component.scss"]
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  ngOnInit(): void {
    this.startCountdown();
  }
  ngOnDestroy(): void {
    this.clearTimeOut();
  }
  ngOnChanges(changes): void {
    console.log("Init value update", changes.init.currentValue);
    this.startCountdown();
  }
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number = null;
  public counter: number = 0;
  private countdownTimerRef: any = null;
  constructor() {}

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeOut();
      this.counter = this.init;
      this.doCountdown();
    }
  }
  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }
  private clearTimeOut() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }
  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log("Count is ", this.counter);
    if (this.counter == 0) {
      console.log("--counter end--");
    } else {
      this.onComplete.emit();
      this.doCountdown();
    }
  }
}
