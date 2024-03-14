import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

type DragStatuses = 'leave' | 'enter'

@Injectable({
  providedIn: 'root'
})
export class DragService {

  dragStatus$ = new BehaviorSubject<DragStatuses>('leave');

  constructor() {
  }

  changeDragStatus(status: DragStatuses) {
    this.dragStatus$.next(status);
  }
}
