import { CoreDataModule } from '@tv/core-data';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreStateModule } from '@tv/core-state';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowsComponent } from './shows/shows.component';
import { ShowsListComponent } from './shows/shows-list/shows-list.component';
import { ShowDetailsComponent } from './shows/show-details/show-details.component';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@tv/material';
import { UiLibraryModule } from '@tv/ui-library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    ShowsListComponent,
    ShowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiLibraryModule,
    CoreDataModule,
    CoreStateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
