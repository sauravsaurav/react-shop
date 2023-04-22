export const emailValidator = (value) => {
    return value.includes('@');
}

export const passwordValidator = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(value);
}


export const confirmPasswordValidator = (password, confirmPassword) => {
    return !(!confirmPassword || confirmPassword !== password);
}