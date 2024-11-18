const HandlingJsonSyntaxError = (err,req,res,next) => {
    if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
        return res.status(400).json({
            status : 400,
            successful : false,
            error : err.name,
            message : err.message,
            body : err.body

        })
    }
    return next
}


module.exports = {
    HandlingJsonSyntaxError
}