module.exports = function(obj, fromBody){
    if(fromBody.name)
       obj.name = fromBody.name 
    if(fromBody.username)
       obj.username = fromBody.username 
    if(fromBody.password)
       obj.password = fromBody.password
    if(fromBody.email)
       obj.email = fromBody.email
    if(fromBody.phone)
       obj.phone = fromBody.phone
    if(fromBody.temporary_address || fromBody.permanent_address) {
       obj.address = {
          permanent_address : fromBody.permanent_address,
          temporary_address : fromBody.temporary_address
       }
    } 
       
    if(fromBody.dob)
       obj.dob = fromBody.dob
    if(fromBody.avatar)
       obj.avatar = fromBody.avatar
    if(fromBody.gender)
       obj.gender = fromBody.gender
    if(fromBody.role)
       obj.role = fromBody.role
    if(fromBody.status)
       obj.status = fromBody.status 
       
    if(fromBody.emailToken)
       obj.emailToken = fromBody.emailToken
    if(fromBody.emailTokenExpiryDate)
       obj.emailTokenExpiryDate = fromBody.emailTokenExpiryDate
    
    console.log('log from mapper class for email confirmed >> ', fromBody.emailConfirmed)
    if(fromBody.emailConfirmed)
       obj.emailConfirmed = fromBody.emailConfirmed 
    if(!fromBody.emailConfirmed)
       obj.emailConfirmed = false

   return obj
}