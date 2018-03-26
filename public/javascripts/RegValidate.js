$(document).ready(function($){
    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var username = $("#username");
    var password = $("#password");
    var passwordConf = $("#passwordConf");
    var email = $("#email");
    var emailConf = $("#emailConf");
    var submitBtn = $("#submitBtn");

    firstName.keyup(function(event){
        checkFirstName();
    });

    lastName.keyup(function(event){
        checkLastName();
    });

    username.keyup(function(event){
        checkUsername();
    });
    password.keyup(function(event){
        checkPassword();
    });
    passwordConf.keyup(function(event){
        checkPasswordConf();
    });
    email.keyup(function(event){
        checkEmail();
    });
    emailConf.keyup(function(event){
        checkEmailConf();
    });
    submitBtn.submit(function(event){
        event.preventDefault();
        var valid = validateForm();

        if(valid){
            $("#register").submit();
        }else{
            return false;
        }
    });
});

function checkFirstName(){
    var validation = true;
    var firstName = $("#firstName").val();
    $("#firstNameWarning").empty();

    if(firstName == ""){
        $("#firstNameWarning").append("*First name cannot be blank")
        validation = false;
    }

    return validation;
}

function checkLastName(){
    var validation = true;
    var lastName = $("#lastName").val();
    $("#lastNameWarning").empty();

    if(lastName == ""){
        $("#lastNameWarning").append("*Last name cannot be blank")
        validation = false;
    }

    return validation;
}

function checkUsername(){
    var validation = true;
    var username = $("#username").val();
    $("#usernameWarning").empty();

    if(username == ''){
        $("#usernameWarning").append('*Username is a required field');
        validation = false;
    }else if(!username.match(/^[\w]{5,12}$/)){
        $("#usernameWarning").append('*Username must be between 5-12 characters');
        validation = false;
    }else{
        $("#usernameWarning").empty();
    }

    return validation;
}

function checkPassword(){
    var validation = true;
    var password = $("#password").val();
    $("#passwordWarning").empty();

    if(password == ''){
        $("#passwordWarning").append('*Password is a required field');
        validation = false;
    }else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_\-\$\^\*\+\(\)\?\.])[a-zA-Z0-9!@#%&_\-\$\^\*\+\(\)\?\.]{5,12}$/)){
        $("#passwordWarning").append('*Password must contain 1 capital, 1 lowercase, 1 special character, 1 number, 5-12 characters long');
        validation = false;
    }else{
        $("#passwordWarning").empty();
    }

    return validation;
}

function checkPasswordConf(){
    var validation = true;
    var password = $("#password").val();
    var passwordConf = $("#passwordConf").val();
    $("#passwordConfWarning").empty();

    if(passwordConf == ''){
        $("#passwordConfWarning").append('*Password must be confirmed');
        validation = false;
    }else if(password != passwordConf){
        $("#passwordConfWarning").append('*Passwords must match');
        validation = false;
    }else{
        $("#passwordConfWarning").empty();
    }

    return validation;
}

function checkEmail(){
    var validation = true;
    var email = $("#email").val();
    $("#emailWarning").empty();

    if(email == ''){
        $("#emailWarning").append('*Email is a required field');
        validation = false;
    }else if(!email.match(/^([A-Za-z0-9\-\.+_]+)@([A-Za-z0-9\-\.+]+)\.com|net|gov|edu|ca|uk$/)){
        $("#emailWarning").append('*Invalid email (Must Contain Only Alphanumerics or .-+_ and end in .com, .net, .gov, .edu, .ca, or .uk)');
        validation = false;
    }else{
        $("#emailWarning").empty();
    }

    return validation;
}

function checkEmailConf(){
    var validation = true;
    var email = $("#email").val();
    var emailConf = $("#emailConf").val();
    $("#emailConfWarning").empty();

    if(emailConf == ''){
        $("#emailConfWarning").append('*Email must be confirmed');
        validation = false;
    }else if(email != emailConf){
        $("#emailConfWarning").append('*Emails must match');
        validation = false;
    }else{
        $("#emailConfWarning").empty();
    }

    return validation;
}

function validateForm(){
    var valid = false;

    if(!checkFirstName()){
        valid = false;
    }else if(!checkLastName()){
        valid = false;
    }else if(!checkUsername()){
        valid = false;
    }else if(!checkPassword()){
        valid = false;
    }else if(!checkPasswordConf()){
        valid = false;
    }else if(!checkEmail()){
        valid = false;
    }else if(!checkEmailConf()){
        valid = false;
    }

    return valid;
}





/*
module.exports.checkUsername = checkUsername;
module.exports.checkPassword = checkPassword;
module.exports.checkPasswordConf = checkPasswordConf;
module.exports.checkEmail = checkEmail;
module.exports.checkEmailConf = checkEmailConf;
module.exports.validateForm = validateForm;*/