const NodeMailer = require('nodemailer')
const MailConfig = require('../configs/mail.config')

module.exports = function sendMail(from, to, subject, text, html){ 
    return new Promise((resolve, reject) => {
        var mailOptions = {
            from: (from ? from : MailConfig.from), // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
         };
        
        var mailer = NodeMailer.createTransport(MailConfig.smtpConfig);
        
        console.log('email host >> ', MailConfig.smtpConfig.host)
        mailer.sendMail(mailOptions, (error, response)=>{ 
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }   
         });
    })
}