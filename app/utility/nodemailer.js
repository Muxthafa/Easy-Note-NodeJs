/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : nodemailer to send mail to specified user                
 * 
 * @file            : nodemailer.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

var nodemailer = require('nodemailer')
require('dotenv').config()

/**
 * @description sends mail to the destined user
 * @param {String} email 
 * @param {String} token 
 * @returns error or data
 */
const sendMail = (email,token) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'musthafamohd17@gmail.com',
      pass: process.env.PASSWORD
    },
    
  });

  var mailOptions = {
    from: 'musthafamohd17@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    html: `<a href="http://localhost:3000/reset/${token}">click here</a>`
  };
  
  return transporter.sendMail(mailOptions)
  .then((data)=> {
      return data
  })
  .catch(err => {
    return err
  }) 
}

module.exports = {sendMail}
  