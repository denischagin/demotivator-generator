import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

type DragStatuses = 'leave' | 'enter'

@Component({
  selector: 'app-demotivator',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './demotivator.component.html',
  styleUrl: './demotivator.component.scss'
})
export class DemotivatorComponent implements OnInit {

  public dragStatus: DragStatuses = 'leave'

  private changeDragStatus(status: DragStatuses) {
    this.dragStatus = status
  }

  handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('enter');
    console.log('handleDragEnter');
  };

  handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('leave')
    console.log('handleDragLeave');
  };

  handleDrop = (e: DragEvent) => {
    e.preventDefault();

    this.changeDragStatus('leave');
    console.log('handleDrop');
    // handleFileLoad(e.dataTransfer.files[0]);
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    this.changeDragStatus('enter');
    console.log('handleDragOver');
  };

  ngOnInit() {
    document.addEventListener('dragenter', this.handleDragEnter.bind(this));
    document.addEventListener("dragleave", this.handleDragLeave.bind(this));
    document.addEventListener("drop", this.handleDrop.bind(this));
    document.addEventListener("dragover", this.handleDragOver.bind(this));
  }
}
