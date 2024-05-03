export const getUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid
        List of required properties:
            * first_name: expected String, received ${user.first_name} 
            * last_name: expected String, received ${user.last_name} 
            * email: expected String, received ${user.email}
            * age: is less than minimum allowed value (18), received ${user.age}
            * password: expected String, received ${user.password}
        `
}

export const getUserEmailIsNotValid = ( email ) => {
    return `The email ${email} is already registered`
}

export const getUserErrorRole = ( role ) => {
    return `The user profile ${role} does not have permissions for this endpoint`
}

export const getProductErrorCode = ( code ) => {
    return `The code ${code} for the entered product is already registered`
}