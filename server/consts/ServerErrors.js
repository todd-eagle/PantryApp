
class RouteErrors {
  
    static GENERIC = "A server error occured."
    static DUPE = {
        emailString: 'accounts_email_key',
        emailMsg: 'Account already exists.',
        userString: 'accounts_user_name_key',
        userMsg: 'Username is taken.'	
    }
    static SIGNIN = {
        authMsg: 'Email or passowrd is incorrect.',
        inputMsg: 'Please enter email and password.'
    }
}

module.exports = RouteErrors
