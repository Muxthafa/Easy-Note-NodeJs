/* ************************************************************************
 * Execution        : 1. default node       cmd> npm test
 * 
 * @description     : Label api testing               
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
const label = require('./label.json')

chai.should()
chai.use(chaiHttp)

process.env.NODE_ENV = 'test'

describe("Note API", () => {
    let token = "";
    let data = label.loginDetails
    let labelId = ""
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
   * /labels get request
   * test to get all labels the labels from the database
   */
  describe("GET /labels", () => {
    it("Positive test case to get all the labels from the database", (done) => {
      chai
        .request(server)
        .get("/labels")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Labels").should.be.a("Object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for fetching all the labels", (done) => {
      chai
        .request(server)
        .get("/labels")
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
   * /labels post request test
   * test to add labels to the database
   */
   describe("POST /labels", () => {
    it("Positive test case to add a label to the database", (done) => {
      let data = label.ValidLabelData
      chai
        .request(server)
        .post("/labels")
        .set("authorization", token)
        .send(data)
        .end((err, res) => {
         labelId = res.body.createdLabel.Label._id
          res.should.have.status(200);
          res.body.should.have.property("message").eql("created label successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to add a label", (done) => {
      let data = label.InvalidLabelData
      chai
        .request(server)
        .post("/labels")
        .set("token", token)
        .send(data)
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql(
              "Label title cannot be empty"
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /labels get request
   * test to get a label from the database
   */
   describe("GET /labels", () => {
    it("Positive test case to get a label from the database", (done) => {
      chai
        .request(server)
        .get(`/labels/${labelId}`)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Label").should.be.a("Object");
          res.body.Label.should.be.a('array');
          res.body.Label.length.should.be.eql(1)
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for fetching all the labels", (done) => {
      chai
        .request(server)
        .get("/labels/61ae351e75de9b31b37101d6")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('no label found with id: 61ae351e75de9b31b37101d6');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
  //  * /labels put request
  //  * test to update a label in the database
  //  */
   describe("/PUT/:id labels", () => {
    it("Positive test case to update a label given the id", (done) => {
      chai
        .request(server)
        .put(`/labels/${labelId}`)
        .send(label.UpdatedLabelData)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to update a label given the id", (done) => {
      chai
        .request(server)
        .put(`/labels/${labelId}`)
        .send(label.UpdatedInvalidLabelData)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property("message").eql('Label title cannot be empty');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * /labels delete request
   * test to delete a label in the database
   */
   describe("/DELETE/:id labels", () => {
    it("Positive test case to delete a label given the id", (done) => {
      chai
        .request(server)
        .delete(`/labels/${labelId}`)
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Label deleted successfully")
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case to delete a label given the id", (done) => {
      chai
        .request(server)
        .delete("/labels/61ae351e75de9b31b37101d6")
        .set("authorization", token)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('could not delete the label with id: 61ae351e75de9b31b37101d6');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  
})