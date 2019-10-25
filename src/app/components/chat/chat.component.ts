import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  public count: number = 0;
  public message: string = '';
  public messages: Message[] = [];

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.build()
      .registerHandler<number>('Count', x => {
        this.count = x;
      })
      .registerHandler<Message>('ReceiveMessage', x => {
        this.messages.push(x);
      })
      .start();
  }

  send() {
    this.chatService.send('RelayMessage', {
        text: this.message
      }
    );
    this.message = '';
  }

  formatDate(date: Date) {
    return new Date(date).toISOString();
  }
}
