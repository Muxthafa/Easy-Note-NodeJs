/* ************************************************************************
 * Execution        : 1. default node       cmd> npm test
 * 
 * @description     : User api testing               
 * 
 * @file            : test.user.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-dec-2021
 * 
 **************************************************************************/

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const user = require('./user.json')

chai.should()
chai.use(chaiHttp)

process.env.NODE_ENV = 'test'

/**
 * /POST request test
 */

describe('POST user login', () => {
    it('positive case for login', (done) => {
        let data = user.UserValidLoginData
        chai.request(server)
        .post('/users/login')
        .send(data)
        .end((err,res) => {
            res.should.have.status(200),
            res.body.should.have.property('token'),
            res.body.should.be.a('Object')
            if(err) {
                return done(err)
            }
            done()
        })
    })
    it('negative case for login', (done) => {
        let data = user.UserInvalidLoginData
        chai.request(server)
        .post('/users/login')
        .send(data)
        .end((err,res) => {
            res.should.have.status(500),
            res.body.should.be.a('Object')
            if(err) {
                return done(err)
            }
            done()
        })
    })
})



describe('User registration', () => {
    it('positive case for registration', (done) => {
        let data = user.UserRegistrationValidData
        chai.request(server)
        .post('/users')
        .send(data)
        .end((err,res) => {
            res.should.have.status(200),
            res.body.should.have.property('message'),
            res.body.should.be.a('Object')
            if(err) {
                return done(err)
            }
            done()
        })
    })

    it('negative case for registration', (done) => {
        let data = user.UserRegistrationInvalidData
        chai.request(server)
        .post('/users')
        .send(data)
        .end((err,res) => {
            res.should.have.status(401),
            res.body.should.have.property('message'),
            res.body.should.be.a('Object')
            if(err) {
                return done(err)
            }
            done()
        })
    })
})

 describe("GET /users", () => {
    it("Positive test case to get all the notes from the database", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Users").should.be.a("Object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

   describe("GET /user", () => {
    it("Positive test case to get a user from the database", (done) => {
      chai
        .request(server)
        .get('/users/61af02b911979405e649771e')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("User").should.be.a("Object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for fetching a user", (done) => {
      chai
        .request(server)
        .get("/users/61af02b911979405e649771d")
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("message").eql('no data found');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe("PUT /user", () => {
    it("Positive test case to update a user", (done) => {
      chai
        .request(server)
        .put('/users/61af02b911979405e649771e')
        .send(user.UpdateData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("Message").eql("User updated successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for updating a user", (done) => {
      chai
        .request(server)
        .put("/users/61af02b911979405e649771d")
        .send(user.UpdateData)
        .end((err, res) => {
          res.should.have.status(500)
          res.body.should.have.property("message").eql('no data found');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe("Delete /user", () => {
    it("Positive test case to delete a user", (done) => {
      chai
        .request(server)
        .delete('/users/61af96fb47de0aa3fecd8a37')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("User deleted successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case for deleting a user", (done) => {
      chai
        .request(server)
        .delete("/users/61af02b911979405e649771fe")
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.have.property("message").eql('could not delete the user with id 61af02b911979405e649771fe');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
