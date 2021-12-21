/* ************************************************************************
 * Execution        : 1. default node       cmd> npm test
 * 
 * @description     : Note api testing               
 * 
 * @file            : test.note.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-dec-2021
 * 
 **************************************************************************/

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const note = require('./note.json')

chai.should()
chai.use(chaiHttp)

process.env.NODE_ENV = 'test'

describe("Note API", () => {
    let token = "";
    let data = note.loginDetails
    let noteId = ""
    beforeEach((done) => {
        chai.request(server)
        .post('/users/login')
        .send(data)
        .end((err,res) => {
            res.should.have.status(200),
            res.body.should.have.property('token'),
            token = res.body.token
            if(err) {
                return done(err)
            }
            done()
        })
    });

    /**
   * /notes get request
   * test to get all notes the notes from the database
   */
  describe("GET /notes", () => {
    it("Positive test case to get all the notes from the database", (done) => {
      chai
        .request(server)
        .get("/notes")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Notes").should.be.a("Object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for fetching all the notes", (done) => {
      chai
        .request(server)
        .get("/notes")
        .set("authorization", "")
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('Not authorized');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /notes post request test
   * test to add notes to the database
   */
   describe("POST /notes", () => {
    it("Positive test case to add a note to the database", (done) => {
      let data = note.ValidNoteData
      chai
        .request(server)
        .post("/notes")
        .set("authorization", token)
        .send(data)
        .end((err, res) => {
         noteId = res.body.createdNote.Note._id
          res.should.have.status(200);
          res.body.should.have.property("message").eql("created note successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to add a note", (done) => {
      let data = note.InvalidNoteData
      chai
        .request(server)
        .post("/notes")
        .set("token", token)
        .send(data)
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql(
              "Note content cannot be empty"
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /notes get request
   * test to get a note from the database
   */
   describe("GET /notes", () => {
    it("Positive test case to get a note from the database", (done) => {
      chai
        .request(server)
        .get(`/notes/${noteId}`)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Note").should.be.a("Object");
          res.body.Note.should.be.a('array');
          res.body.Note.length.should.be.eql(1)
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for fetching all the notes", (done) => {
      chai
        .request(server)
        .get("/notes/61ae351e75de9b31b37101d6")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('no note found with id: 61ae351e75de9b31b37101d6');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
  //  * /notes put request
  //  * test to update a note in the database
  //  */
   describe("/PUT/:id notes", () => {
    it("Positive test case to update a note given the id", (done) => {
      chai
        .request(server)
        .put(`/notes/${noteId}`)
        .send(note.UpdatedNoteData)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to update a note given the id", (done) => {
      chai
        .request(server)
        .put(`/notes/${noteId}`)
        .send(note.UpdatedInvalidNoteData)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("message").eql('Note content cannot be empty');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /notes delete request
   * test to delete a note in the database
   */
   describe("/DELETE/:id notes", () => {
    it("Positive test case to delete a note given the id", (done) => {
      chai
        .request(server)
        .delete(`/notes/${noteId}`)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Note deleted successfully")
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to delete a note given the id", (done) => {
      chai
        .request(server)
        .delete("/notes/61ae351e75de9b31b37101d6")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('could not delete the note with id: 61ae351e75de9b31b37101d6');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  
})