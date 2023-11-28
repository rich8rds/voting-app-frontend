export interface fieldTemplate {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    isEmailError: boolean,
    isFirstnameError: boolean,
    isLastnameError: boolean,
    passwordMatchError: boolean,
}

export interface actionTemplate {
    type: string,
    value: any
}

const field: fieldTemplate = {
    firstName: "",
    lastName: "",
    email: "",
    // gender: "MALE",
    password: "",
    confirmPassword: "",
    isEmailError: false,
    isFirstnameError: false,
    isLastnameError: false,
    passwordMatchError: false,
}

export const regex = new RegExp(
    "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*"
    + "|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]"
    + "|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")"
    + "@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    + "|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?"
    + "[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a"
    + "\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"
)

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "FIRSTNAME":
            if (action.value.length === 1) return { ...state, firstName: action.value, isFirstnameError: true }
            return { ...state, firstName: action.value, isFirstnameError: false }
        case 'LASTNAME':
            if (action.value.length === 1) return { ...state, lastName: action.value, isLastnameError: true }
            return { ...state, lastName: action.value, isLastnameError: true }

        case 'email':
            let email = action.value
            if (email.length === 0)
                return { ...state, email: email, isEmailError: false }
            else if (!regex.test(email))
                return { ...state, email: email, isEmailError: true }
            return { ...state, email: email, isEmailError: false }

        case 'password':
            let password = action.value
            if (state.confirmPassword.length <= 8 || state.confirmPassword !== password)
                return { ...state, passwordMatchError: true, password: password }
            return { ...state, password: password, passwordMatchError: false }

        case 'confirmPassword':
            let confirmPassword = action.value
            if (state.password !== confirmPassword)
                return { ...state, passwordMatchError: true, confirmPassword: confirmPassword }
            return { ...state, confirmPassword: confirmPassword, passwordMatchError: false }

        case 'reset':
            return {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                isEmailError: false,
                isFirstnameError: false,
                isLastnameError: false,
                passwordMatchError: false,
                isPhoneNumberError: false,
            }
        default: return state
    }
}

export { field, reducer }