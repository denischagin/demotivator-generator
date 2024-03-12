import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DemotivatorComponent} from "../components/demotivator/demotivator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DemotivatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demotivator';
}
