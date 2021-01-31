create database notesDB;
use notesDB;

create user 'notesuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
grant all on notesDB.* to 'notesuser'@'localhost';

create table notes (
  id INT NOT NULL AUTO_INCREMENT,
  version INT NOT NULL DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  datecreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  datemodified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

create table notesArchive (
  id INT NOT NULL,
  version INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  datecreated TIMESTAMP,
  datemodified TIMESTAMP,
  CONSTRAINT PK_NOTES_ARCHIVE PRIMARY KEY (id,version)
);


CREATE TRIGGER notes_versioning
BEFORE UPDATE
ON notes
FOR EACH ROW
   INSERT INTO notesArchive
   SELECT id, version, title, content, datecreated, datemodified
   FROM notes
   WHERE id = OLD.id
;

CREATE TRIGGER notes_delete
BEFORE DELETE
ON notes
FOR EACH ROW
   INSERT INTO notesArchive
   SELECT id, version, title, content, datecreated, datemodified
   FROM notes
   WHERE id = OLD.id
 ;