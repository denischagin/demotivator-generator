import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DemotivatorService} from "../../services/demotivator.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

type DragStatuses = 'leave' | 'enter'

@Component({
  selector: 'app-demotivator',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: './demotivator.component.html',
  styleUrl: './demotivator.component.scss'
})
export class DemotivatorComponent implements OnInit {
  public dragStatus: DragStatuses = 'leave'
  public loadedFile: File | null = null

  public form = new FormGroup({
    text1: new FormControl(''),
    text2: new FormControl('')
  })

  constructor(public demotivatorService: DemotivatorService) {
  }

  private changeDragStatus(status: DragStatuses) {
    this.dragStatus = status
  }


  handleFileLoad(file: File) {
    this.loadedFile = file
  }

  handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('enter');
  };

  handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('leave')
  };

  handleDrop = (e: DragEvent) => {
    e.preventDefault();

    this.changeDragStatus('leave');
    if (!e.dataTransfer)
      return

    this.handleFileLoad(e.dataTransfer?.files[0]);
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('enter');
  };

  submit() {
    console.log(this.loadedFile)
    if (!this.loadedFile) return

    const newFormData = new FormData();
    newFormData.append('file', this.loadedFile);

    const {text1 = "", text2 = ""} = this.form.value

    this.demotivatorService
      .getDemotivator(
        newFormData,
        text1 ?? '',
        text2 ?? ''
      )
      .subscribe((data) => console.log(data))
  }

  ngOnInit() {
    document.addEventListener('dragenter', this.handleDragEnter.bind(this));
    document.addEventListener("dragleave", this.handleDragLeave.bind(this));
    document.addEventListener("drop", this.handleDrop.bind(this));
    document.addEventListener("dragover", this.handleDragOver.bind(this));
  }
}
