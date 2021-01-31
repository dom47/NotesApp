import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { MakeNotesComponent} from './makenotes/makenotes.component';

@NgModule({
  declarations: [
    AppComponent,
	NotesComponent,
	MakeNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
	ModalModule.forRoot(),
	NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
