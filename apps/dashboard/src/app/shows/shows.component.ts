import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyShow, Show } from '@tv/api-interfaces';
import { ShowsFacade } from '@tv/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tv-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
})
export class ShowsComponent implements OnInit {
  form: FormGroup;
  shows$: Observable<Show[]> = this.showsFacade.allShows$;
  selectedShow$: Observable<Show> = this.showsFacade.selectedShows$;
  constructor(
    private showsFacade: ShowsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.showsFacade.loadShows();
    this.reset();
  }

  selectShow(show: Show) {
    this.showsFacade.selectShow(show.id);
    this.form.patchValue(show);
  }

  reset() {
    this.selectShow(emptyShow);
    this.form.reset();
  }

  createShow(show: Show) {
    this.showsFacade.createShow(show);
    this.reset();
  }

  updateShow(show: Show) {
    this.showsFacade.updateShow(show);
    this.reset();
  }

  saveShow(show: Show) {
    show.id
      ? this.showsFacade.updateShow(show)
      : this.showsFacade.createShow(show);
    this.reset();
  }

  deleteShow(show: Show) {
    this.showsFacade.deleteShow(show);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      cast: ['', Validators.required],
      numberEpisodes: [''],
    });
  }
}
