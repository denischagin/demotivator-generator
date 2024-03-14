import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DemotivatorService} from "../../services/demotivator.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FileService} from "../../services/file.service";
import {LoaderComponent} from "../loader/loader.component";
import {LoaderService} from "../../services/loader.service";
import {DragService} from "../../services/drag.service";
import {ValidateFileService} from "../../services/validate-file.service";

@Component({
  selector: 'app-demotivator',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    LoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './demotivator.component.html',
  styleUrl: './demotivator.component.scss'
})
export class DemotivatorComponent implements OnInit {
  public form = new FormGroup({
    text1: new FormControl(''),
    text2: new FormControl('')
  })

  constructor(
    private demotivatorService: DemotivatorService,
    private loaderService: LoaderService,
    public fileService: FileService,
    public validateFileService: ValidateFileService,
    public dragService: DragService
  ) {
  }

  handleDragEnter(e: DragEvent) {
    e.preventDefault();
    this.dragService.changeDragStatus("enter")
  };

  handleDragLeave(e: DragEvent) {
    e.preventDefault();
    this.dragService.changeDragStatus('leave')
  };

  handleDrop(e: DragEvent) {
    e.preventDefault();

    this.dragService.changeDragStatus('leave');
    if (!e.dataTransfer)
      return

    this.fileService.handleFileLoad(e.dataTransfer?.files[0]);
  };

  handleDragOver(e: DragEvent) {
    e.preventDefault();
    this.dragService.changeDragStatus('enter');
  };

  handleSubmit() {
    const loadedFile = this.fileService.loadedFile$.getValue();
    if (!loadedFile) return alert('No file selected')

    const fileFormData = new FormData();
    fileFormData.append('file', loadedFile);

    this.loaderService.changeLoaderStage("Create demotivator...")
    this.demotivatorService
      .getDemotivator({fileFormData, ...this.form.value})
      .subscribe(async (data) => {
        this.loaderService.changeLoaderStage("Converting to png and saving...")
        await this.fileService.download(data)
        this.loaderService.changeLoaderStage(null)
      })
  }

  handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.fileService.handleFileLoad(input.files?.[0])
  }

  handlePaste(e: ClipboardEvent) {
    e.preventDefault();

    const file = e.clipboardData?.files[0];
    if (!file) return;

    this.fileService.handleFileLoad(file);
  }

  ngOnInit() {
    document.addEventListener('dragenter', this.handleDragEnter.bind(this));
    document.addEventListener("dragleave", this.handleDragLeave.bind(this));
    document.addEventListener("drop", this.handleDrop.bind(this));
    document.addEventListener("dragover", this.handleDragOver.bind(this));
    document.addEventListener("paste", this.handlePaste.bind(this));
  }
}
