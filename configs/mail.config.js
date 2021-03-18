var smtpConfig = {
    host : "mail.zoho.com",
    port : 587, 
    secure : true,  
    auth : {
        user : "noreply@dulwa.com", 
        pass : "Nepalese123*#"  
    }
}

module.exports = {
    smtpConfig,
    from : smtpConfig.auth.user
} 