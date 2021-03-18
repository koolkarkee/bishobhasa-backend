const NodemailHelper = require('./nodemail.helper')

function sendMail(from, to, subject, text, html){
    return new Promise((resolve, reject) => {
        NodemailHelper(from, to, subject, text, html)
            .then(result => {
                //console.log('mail sent', result)
                resolve(result)
            })
            .catch(err => {
                //console.log('mail not sent', err)
                reject(err)
            })
    }) 
}

module.exports = {
    sendMail
}