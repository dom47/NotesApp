import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
	form: FormGroup;
	modalRef: BsModalRef;

	rows: any[] = []; //this is where table data is stored
	archiveRows: any[] = []; //this is where archive table data rows are stored

	ordertype: any={type: 'datemodified',id: '1'};
	currentNote: any = {id: null, version: null, title: '', content: '', datecreated: '', datemodified: ''}; // this stores a selected table row data
	modalCallback: () => void;

	
  constructor(
		private modalService: BsModalService,
		private fb: FormBuilder,
		private server: ServerService) { }

  ngOnInit() {
	  this.getNotes();
	  this.form = this.fb.group({
		  title: [this.currentNote.title, Validators.required],
		  content: this.currentNote.content,
	  });
  }

  
    private getNotes() { // gets notes from the database
		this.server.getNotes(this.ordertype.type).then((response: any) => {
		  console.log('Response', response);
		  this.rows = response;
		});
	}
	
	private getArchiveNotes() { //gets archived notes from the database
		this.server.getArchiveNotes(this.currentNote.id).then((response: any) => {
		  console.log('Response', response);
		  this.archiveRows = response;
		});
	}
		
	private editNote(template) { // handler
		this.modalRef.hide();
		this.updateForm();
		this.modalCallback = this.updateNote.bind(this);
		this.modalRef = this.modalService.show(template);
	}
	
	private updateNote() { // updates note to the database
		const noteData = {
		  id: this.currentNote.id,
		  title: this.form.get('title').value,
		  content: this.form.get('content').value,
		};
		this.modalRef.hide();
		this.server.updateNote(noteData).then(() => {
		  this.getNotes();
		});
	}
	
	private deleteNote(note) { // deletes specified note from database table
		this.server.deleteNote(note).then(() => {
		  this.getNotes();
		});
	}
	
	
	private updateForm() {
		this.form.setValue({
		  title: this.currentNote.title,
		  content: this.currentNote.content,
		});
	}
	
	private onCancel(template) { // handler to switch templates
		this.modalRef.hide();
		this.modalRef = this.modalService.show(template);
	}
	
	private sortByDateCreated(){
		this.ordertype.type='datecreated';
		this.getNotes();
	}
	
	private sortByDateModified(){
		this.ordertype.type='datemodified';	
		this.getNotes();
	}
	
	private sortByTitle(){
		this.ordertype.type='title';	
		this.getNotes();
	}
	
	private readNote(index, template) { // event handler to select note from the table and display the first modal
		this.currentNote=index; // saves data from selected row into temporary memory
		this.updateForm();
		this.modalRef = this.modalService.show(template);
	}
	
	private showArchive(template){ // shows archive notes table
		this.modalRef.hide();
		this.getArchiveNotes();
		this.updateForm();
		this.modalCallback = this.updateNote.bind(this);
		this.modalRef = this.modalService.show(template);
	}
	
	private readArchiveNote(index, template) { //displays selected archived note in a modal template
		this.modalRef.hide();		
		this.currentNote=index;
		this.updateForm();
		this.modalRef = this.modalService.show(template);
	}
  
}
