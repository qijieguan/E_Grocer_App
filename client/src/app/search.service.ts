import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private subject = new BehaviorSubject<any>([]);

  constructor() {
  }

  setSearch = (search_set: any[]) => { this.subject.next(search_set) }

  getSearch = () => { return this.subject.asObservable() || []; }
}
