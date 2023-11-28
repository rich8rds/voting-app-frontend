import jwt_decode from "jwt-decode";
 
type decoded = {
    iss: string,
    exp: number,
    iat: number,
    sub: string,
    _id: string,
    email: string
}

const sampleDecode: decoded = {
    iss: '',
    exp: 0,
    iat: 0,
    sub: '',
    _id: '',
    email: ''
}

export const decodeJwt = (token: string): decoded => {
    const decoded: decoded = jwt_decode(token);
    
    /* prints:
    * { iss: "self",
    *   exp: 1393286893,
    *   iat: 1393268893  
    *   roles: "USER"
    *   sub: email
    * }
    */
    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
    //const decodedHeader: string = jwt_decode(token, { header: true });
    console.log(decoded)

    return decoded

/* prints:
 * { typ: "JWT",
 *   alg: "HS256" }
 */
}

export const isTokenValid = (token: string | null): boolean => {
    if(token === null || token === '') return false
    const decoded: decoded = jwt_decode(token);

    if(Date.now() >= decoded.exp * 1000) {
        console.log("Token expired!")
        return false
    }
    return true

}

export const redirectToUserPage = (location: { state: { from: { pathname: string; }; }; }, navigate: (arg0: any, arg1: { replace: boolean; }) => void, roles: string) => {
    let from = location.state?.from?.pathname
    
    if(isTokenValid(localStorage.getItem("signature"))){
        if(roles === "ADMIN" || roles === "SUPERADMIN")
            from = location.state?.from?.pathname || "/admin"
        else if(roles === "CUSTOMER")
            from = location.state?.from?.pathname || "/shop"
    }else {
        from = location.state?.from?.pathname || "/login"
    }

    navigate(from, { replace: true })
}

export const GetEmailFromToken = (): decoded => { 
    const token: string | null = localStorage.getItem("token")
    if(token) return decodeJwt(token)
    return sampleDecode
}