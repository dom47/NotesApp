import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

	constructor(private http: HttpClient) { }
  
    private async request(method: string, url: string, data?: any) {
      const result = this.http.request(method, url, {
        body: data,
        responseType: 'json',
        observe: 'body',
        headers: {}
      });
      return new Promise((resolve, reject) => {
        result.subscribe(resolve, reject);
      });
    }
	
	public getNotes(type) {
      if(type=="datemodified"){
		  return this.request('GET', `${environment.serverUrl}/notes/datemodified`);
	  }
      else if(type=="datecreated"){
		  return this.request('GET', `${environment.serverUrl}/notes/datecreated`);
	  }
      else if(type=="title"){
		  return this.request('GET', `${environment.serverUrl}/notes/title`);
	  }
      else {
		  return this.request('GET', `${environment.serverUrl}/note/${type}`);
	  }
    }
	
	public getArchiveNotes(id){
		return this.request('GET', `${environment.serverUrl}/notesarchive/${id}`);
	}

    createNote(note) {
      return this.request('POST', `${environment.serverUrl}/note`, note);
    }

    updateNote(note) {
      return this.request('PUT', `${environment.serverUrl}/note/${note.id}`, note);
    }

    deleteNote(note) {
      return this.request('DELETE', `${environment.serverUrl}/note/${note.id}`);
    }
	
}


