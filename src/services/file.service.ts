import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ValidateFileService} from "./validate-file.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  loadedFile$ = new BehaviorSubject<File | null>(null)

  constructor(private validateFileService: ValidateFileService) {
  }

  public handleFileLoad(file?: File) {
    const errors = this.validateFileService.validate(file!)

    if (errors.length > 0)
      return alert(errors.join(','))

    this.loadedFile$.next(file!)
  }

  private svgToPng(svgBlob: Blob): Promise<Blob | null> {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      };

      img.src = URL.createObjectURL(svgBlob);
    });
  }

  public async download(blobFile: Blob) {
    let a = document.createElement("a");
    let file = new Blob([blobFile], {type: 'image/svg+xml'});

    const filePng = await this.svgToPng(file);
    if (!filePng) return alert('Can not convert svg to png');

    a.href = URL.createObjectURL(filePng);
    a.download = "demotivator.png";
    a.click();
  }
}
