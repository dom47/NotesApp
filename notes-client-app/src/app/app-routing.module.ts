import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeNotesComponent } from './makenotes/makenotes.component';
import { NotesComponent } from './notes/notes.component';


const routes: Routes = [
  {
    path: '',
    component: MakeNotesComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
