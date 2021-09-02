import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Show } from '@tv/api-interfaces';

@Component({
  selector: 'tv-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent {
  @Input() shows: Show[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
