function checkInfo(firstName, lastName, username, password, passwordConf, email, emailConf){
    var valid = '';

    if(firstName == ''){
        valid += '*First Name is Blank\n';
    }
    if(lastName == ''){
        valid += '*Last Name is Blank\n';
    }
    if(!username.match(/^[\w]{5,12}$/)){
        valid += '*Invalid Username\n';
    }
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_\-\$\^\*\+\(\)\?\.])[a-zA-Z0-9!@#%&_\-\$\^\*\+\(\)\?\.]{5,12}$/)){
        valid += '*Invalid Password\n';
    }
    if(passwordConf != password){
        valid += '*Passwords Do Not Match\n';
    }
    if(!email.match(/^([A-Za-z0-9\-\.+_]+)@([A-Za-z0-9\-\.+]+)\.com|net|gov|edu|ca|uk$/)){
        valid += '*Invalid Email\n';
    }
    if(emailConf != email){
        valid += '*Emails Do Not Match\n';
    }

    return valid;
}




module.exports.checkInfo = checkInfo;