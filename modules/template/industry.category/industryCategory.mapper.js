module.exports = function(obj, fromBody){
    console.log('from body', fromBody)
    if(fromBody.name)
       obj.name = fromBody.name
       
   return obj
}