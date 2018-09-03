const nodemailer = require('nodemailer')

module.exports = {
  send: async function(mailOptions) {
    let transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });
  }
}