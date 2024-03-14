import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderStage$ = new BehaviorSubject<string | null>(null)

  constructor() {
  }

  changeLoaderStage(stage: string | null) {
    this.loaderStage$.next(stage)
  }
}
