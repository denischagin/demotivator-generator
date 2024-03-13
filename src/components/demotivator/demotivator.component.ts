import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DemotivatorService} from "../../services/demotivator.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FileService} from "../../services/file.service";
import {ValidateFileService} from "../../services/validate-file.service";
import {LoaderComponent} from "../loader/loader.component";

type DragStatuses = 'leave' | 'enter'

@Component({
  selector: 'app-demotivator',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  templateUrl: './demotivator.component.html',
  styleUrl: './demotivator.component.scss'
})
export class DemotivatorComponent implements OnInit {
  public dragStatus: DragStatuses = 'leave'
  public loadedFile: File | null = null
  public loadingStage: string | null = null

  public form = new FormGroup({
    text1: new FormControl(''),
    text2: new FormControl('')
  })

  constructor(
    public demotivatorService: DemotivatorService,
    public fileService: FileService,
    public validateFileService: ValidateFileService
  ) {
  }

  private changeDragStatus(status: DragStatuses) {
    this.dragStatus = status
  }

  handleFileLoad(file: File) {
    const errors = this.validateFileService.validate(file)

    if (errors.length > 0)
      return alert(errors.join(','))

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
    if (!this.loadedFile) return alert('No file selected')

    const newFormData = new FormData();
    newFormData.append('file', this.loadedFile);

    const {text1 = "", text2 = ""} = this.form.value

    this.loadingStage = 'Create demotivator...'

    this.demotivatorService
      .getDemotivator(
        newFormData,
        text1 ?? '',
        text2 ?? ''
      )
      .subscribe(async (data) => {
        this.loadingStage = 'Converting to png and saving...'
        await this.fileService.download(data)
        this.loadingStage = null
      })
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement

    const file = input.files?.[0]
    if (!file) return alert('No file selected')

    this.handleFileLoad(file)
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const file = event.clipboardData?.files[0];

    if (!file) return;

    this.handleFileLoad(file);
  }


  ngOnInit() {
    document.addEventListener('dragenter', this.handleDragEnter.bind(this));
    document.addEventListener("dragleave", this.handleDragLeave.bind(this));
    document.addEventListener("drop", this.handleDrop.bind(this));
    document.addEventListener("dragover", this.handleDragOver.bind(this));
    document.addEventListener("paste", this.onPaste.bind(this));
  }
}
