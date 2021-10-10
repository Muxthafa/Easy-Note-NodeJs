module.exports = (req,res,next) => {  
    //check if content is present
    if(!req.body.content) {
        return res.status(400).send({
                message: "Note content can not be empty (handled by middleware)"
        });
    }

    //validate title name
    var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
    if (!pattern.test(req.body.title)) {
        return res.status(400).send({
            message: "Note a valid title name"
        })
    } else {
        next()
    }
}