const express = require('express');

function createRouter(db) {
  const router = express.Router();
  var id;

  // REST API routes are defined here 
  
  // Insert new note
	router.post('/note', (req, res, next) => {
	  db.query(
		'INSERT INTO notes (title, content) VALUES (?,?)',
		[req.body.title, req.body.content],
		(error) => {
		  if (error) {
			console.error(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json({status: 'ok'});
		  }
		}
	  );
	});
	
	
	
  // Get all content of note by id
	router.get('/note/:id', function (req, res, next) {
	  db.query(
		'SELECT * FROM notes WHERE id=?',
		[req.params.id],
		(error, results) => {
		  if (error) {
			console.log(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json(results);
		  }
		}
	  );
	});
	
  // Get all notes ordered by date created(without deleted or older versions)
	router.get('/notes/datecreated', function (req, res, next) {
	  db.query(
		'SELECT id, version, title, content, datecreated, datemodified FROM notes ORDER BY datecreated DESC',
		(error, results) => {
		  if (error) {
			console.log(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json(results);
		  }
		}
	  );
	});
	
  // Get all notes ordered by date modified (without deleted or older versions)	
	router.get('/notes/datemodified', function (req, res, next) {
	  db.query(
		'SELECT id, version, title, content, datecreated, datemodified FROM notes ORDER BY datemodified DESC',
		(error, results) => {
		  if (error) {
			console.log(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json(results);
		  }
		}
	  );
	});

  // Get all notes ordered by title (without deleted or older versions)	
	router.get('/notes/title', function (req, res, next) {
	  db.query(
		'SELECT id, version, title, content, datecreated, datemodified FROM notes ORDER BY title ASC',
		(error, results) => {
		  if (error) {
			console.log(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json(results);
		  }
		}
	  );
	});

  //get all older versions of note
	router.get('/notesarchive/:id', function (req, res, next) {
	  db.query(
		'SELECT * FROM notesArchive WHERE id=? ORDER BY version DESC',
		[req.params.id],
		(error, results) => {
		  if (error) {
			console.log(error);
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json(results);
		  }
		}
	  );
	});
	
  //Update notes	
	router.put('/note/:id', function (req, res, next) {
	  db.query(
		'UPDATE notes SET version=version+1, title=?, content=? WHERE id=?',
		[req.body.title, req.body.content, req.params.id],
		(error) => {
		  if (error) {
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json({status: 'ok'});
		  }
		}
	  );
	});


  //delete note
	router.delete('/note/:id', function (req, res, next) {
	  db.query(
		'DELETE FROM notes WHERE id=?',
		[req.params.id],
		(error) => {
		  if (error) {
			res.status(500).json({status: 'error'});
		  } else {
			res.status(200).json({status: 'ok'});
		  }
		}
	  );
	});


  return router;
}

module.exports = createRouter;
