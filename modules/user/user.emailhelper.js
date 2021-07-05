const Uuidv4 = require('uuid').v4
const EmailHelper = require('./../../helpers/mailer.helper')
const EmailTemplate = require('./user.emailTemplate')
const Config = require('./../../configs/index')

function getEmailRegistrationToken(){
    return  Uuidv4()
}

function getRegistrationBodyHtml(emailToken, id){
    let link = Config.IP + 'api/auth/verify?emailToken=' 
                + emailToken + '&' + 'id=' + id 

    var body = EmailTemplate.getHtmlTemplateForRegistration(link)

    console.log('email body >> ', body)
    return body
}

//set the token expiration
function getEmailTokenExpiryDate(){
    Date.prototype.addHours= function(){
        this.setHours(this.getHours()+ Config.userEmailConfirmationTokenExpiryHours);
        return this;
    }
    return new Date().addHours() 
}

function sendRegistrationLink(email, id, emailToken){
    EmailHelper
        .sendMail(null, email, "Email Registration Confirmation", 
                "Confirm your email", getRegistrationBodyHtml(emailToken, id))
        .then(result => {
            console.log("Registration mail status : ", result)
        })
        .catch(err => {
            console.log("Registration mail err : " , err)
        })
}

function sendMailAfterPasswordReset(username, email){
    var body = EmailTemplate.getHtmlTemplateForSuccessfulPasswordReset(username)
    EmailHelper
        .sendMail(null, email, 'password reset', 'password reset', body)
        .then(result => {
            console.log("Registration mail status : ", result)
        })
        .catch(err => {
            console.log("Registration mail err : " , err)
        })
}

module.exports = {
    getEmailRegistrationToken,
    getEmailTokenExpiryDate,
    sendRegistrationLink,
    sendMailAfterPasswordReset
}
     