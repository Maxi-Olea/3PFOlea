import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() user!: User | null; //datos del usuario logueado

}
