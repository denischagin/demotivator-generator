import {Injectable} from '@angular/core';
import {Validator} from "../types/validator";

@Injectable({
  providedIn: 'root'
})
export class ValidateFileService implements Validator {

  constructor() {
  }

  private fileTypes = ['image/jpeg', 'image/png', 'image/jpg']

  validate(file: File | Blob) {
    const errors: string[] = []
    if (!file) {
      errors.push('File is required')
      return errors
    }

    if (this.fileTypes?.length && !this.fileTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not supported.`);
      return errors
    }

    return errors
  }
}
