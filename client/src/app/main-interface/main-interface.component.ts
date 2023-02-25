import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posting-form',
  templateUrl: './main-interface.component.html',
  styleUrls: ['./main-interface.component.scss']
})
export class MainInterfaceComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void { 
    /*
    let interfaceArr = document.querySelectorAll('.interface-option');
    
    interfaceArr.forEach(el => {
      let htmlElement = el.getElementsByClassName('interface-color')[0] as HTMLElement;

      el.addEventListener('mousemove', (event: any) => {
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top; 
        
        htmlElement.style.top = y.toString();
        htmlElement?.classList.add('expand')
      });
      el.addEventListener('mouseout', (event: any) => {
        htmlElement?.classList.remove('expand');
      });
    });
    */
  }
}
