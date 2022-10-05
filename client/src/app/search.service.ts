import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private subject = new BehaviorSubject<any>([]);

  constructor() {
  }

  setSearch = (word: string, list: any[]) => { 
    let search_list:any[] = [];
    list.forEach(d => { if (d.name.toLowerCase().includes(word.toLowerCase())) { search_list.push(d) }});
  
    this.subject.next(search_list) 
  }

  getSearch = () => { return this.subject.asObservable() || []; }
}
