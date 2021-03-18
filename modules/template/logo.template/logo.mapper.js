module.exports = function(obj, fromBody){
    console.log('from body', fromBody)

    if(fromBody.name)
       obj.name = fromBody.name
    if(fromBody.svgFile)
       obj.svgFile = fromBody.svgFile
    if(fromBody.theme)
       obj.theme = fromBody.theme
    if(fromBody.industryCategory)
       obj.industryCategory = fromBody.industryCategory
    if(fromBody.designer)
       obj.designer = fromBody.designer
    if(fromBody.status)
       obj.status = fromBody.status
    if(fromBody.company)
       obj.company = fromBody.company
    if(fromBody.companySlogan)
       obj.companySlogan = fromBody.companySlogan
    if(fromBody.ratings)
       obj.ratings = fromBody.ratings
       
   return obj
}