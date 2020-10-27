import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: any[];
  sub: Subscription;
  
  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    this.messages = [];
    this.sub = this.getMessages().subscribe({
      next: data => {
        console.log(data);
        this.addMessage(data);
      },
      error: err => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  getMessages(): Observable<any> {
    return Observable.create(
      observer => {
        let source = new EventSource("http://localhost:8080/event/receive");
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }

        source.onerror = event => {
          this.zone.run(() => {
            observer.error(event)
          })
        }
      }
    )
  }

  addMessage(msg: any) {
    this.messages = [...this.messages, msg];
    //console.log("messages::" + this.messages);
  }

}