function getHtmlTemplateForRegistration(link){
    var body = 
    `
    <p> Please click the link to confirm your registration below : </p>
    <br/>
    <p><a href=" ${link}">${link}</a></p>
    `

    return body
}

function getHtmlTemplateForSuccessfulPasswordReset(username) {
    var body = 
    `
    <p>Dear ${username} ,</p>
    <br/> <p>your password has been succesfully reset</p>
    `

    return body
}

module.exports = {
    getHtmlTemplateForRegistration,
    getHtmlTemplateForSuccessfulPasswordReset
}

