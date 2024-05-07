const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const emailError = (email: string) => {
    if (email === "") {
        return "This field is required.";
    } else {
        if (!validateEmail(email)) {
            return "Provide a valid email!";
        }
    }
};

const passwordError = (password: string, confirmPassword: string) => {
    if (confirmPassword == "") {
        return "This field is required!";
    } else {
        if (password !== confirmPassword) {
            return "Password and Confirm Password should be same!";
        }
    }
};

export { emailError, passwordError };