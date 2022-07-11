const jwt = require('jsonwebtoken');


const verifyToken= (req,res,next) =>{
    //headers con el token
    const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
    
        /* asignamos a req.user para aceder al usuario */
        req.user = decoded;
        next()      
    } catch (error) {
        /* si surge un error hacemos esto: */
        return res.status(400).json('ACCESS DENIED'); 
    }

}


exports.verifyToken = verifyToken;