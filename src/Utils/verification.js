function verifyEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
}

function verifyPass(password){
    //console.log((password.length > 8 ? true : false))
    return (password.length >= 8 ? true : false);
}

export{verifyEmail, verifyPass}