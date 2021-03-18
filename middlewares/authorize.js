module.exports = function(req, res, next){
    //check for authorization
    if(req.loggedInUser.role == 1 || req.loggedInUser.role == 2){
        next()
    }else {
        next({
            msg : "unauthorized access",
            status : 400
        })
    }
}