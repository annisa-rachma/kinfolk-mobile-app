const errHandler = (err, req, res, next) => {
    switch(err.name) {
        case "InvalidInput" :
            res.status(400).json({message : "Email or Password cannot empty"});
            break;
        case "InvalidEmail/Password" :
            res.status(401).json({message : "Invalid email or password"});
            break;
        default :
            console.log(err.name)
            res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {errHandler}