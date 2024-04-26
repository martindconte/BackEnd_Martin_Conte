const checkLogged = (req,res,next)=>{

    if(req.session.user?.username){
        next();
    } else {
        res.redirect("/login");
    }
}

const userNotLogged = (req,res,next)=>{

    if(req.session.user?.username){
        res.redirect("/current");
    } else {
        next();
    }
}

export {
    checkLogged,
    userNotLogged
}