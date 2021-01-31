import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-makenotes',
  templateUrl: './makenotes.component.html',
  styleUrls: ['./makenotes.component.css']
})
export class MakeNotesComponent implements OnInit {
	form: FormGroup;
	
  constructor(
		private fb: FormBuilder,
		private server: ServerService  
  ) { }

  ngOnInit() {
	this.form = new FormGroup({
		 title: new FormControl(),
		 content: new FormControl()
	});
  }

    private createNote() {
		const newNote = {
		  title: this.form.get('title').value,
		  content: this.form.get('content').value,
		};
		//console.log(newNote);
		this.server.createNote(newNote).then(() => {
			this.form.setValue({
			  title: null,
			  content: null,
			});// function to flush form inputs after submission is accepted by the server
		});
	}
  
  
}
