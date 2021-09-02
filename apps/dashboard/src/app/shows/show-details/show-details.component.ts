import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Show } from '@tv/api-interfaces';

@Component({
  selector: 'tv-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent {
  currentShow: Show;
  originalName: string;

  @Input() set show(value: Show | null) {
    if (value) this.originalName = value.name;
    this.currentShow = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(show: Show) {
    this.saved.emit(show);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
