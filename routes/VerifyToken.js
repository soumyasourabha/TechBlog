const Jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    const token  = req.header('user-token');
    if(!token)
        return res.status(401).send('Access Denied!')
    
    try{
            const verified = Jwt.verify(token,process.env.TOKEN_SECRET)
            req.user = verified;
            next();
    }
    catch(error){
        res.status(400).send('Invalid Token')
    }
}

