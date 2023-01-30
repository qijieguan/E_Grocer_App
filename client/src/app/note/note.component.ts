import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  unfoldComplete: boolean = false;
  unfoldFeedback: boolean = false;
  feedbackInp: string = "";
  feedbackArr: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleClick = (name: string) => {
    if (name === 'complete') { 
      if (!this.unfoldComplete) {
        document.querySelector(".complete-list")?.classList.add('active');
      }
      else {
        document.querySelector(".complete-list")?.classList.remove('active');
      }
      this.unfoldComplete = !this.unfoldComplete; 
    }
    if (name === 'feedback') { this.unfoldFeedback = !this.unfoldFeedback; }
  }

  handleChange = (event: any) => {
    this.feedbackInp = event.target.value;
  }

  handleSubmit = () => {
    if (!this.feedbackInp) { return; }
    this.feedbackArr.push({id: uuidv4(), feedback: this.feedbackInp});
    
    this.feedbackInp = "";
    let area = document.getElementsByName('feedback-area')[0] as HTMLInputElement;
    area.value = "";
  }

  clearFeedback = (id: string) => {
    this.feedbackArr = this.feedbackArr.filter(feedback => feedback.id != id);
  }

}
