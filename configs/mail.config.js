var smtpConfig = {
    host : "mail.zoho.com",
    port : 587, 
    secure : true,  
    auth : {
        user : "bishobhashaschool@gmail.com", 
        pass : "2019welcome"  
    }
}

module.exports = {
    smtpConfig,
    from : smtpConfig.auth.user
} 