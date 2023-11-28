import { createContext, useState, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from "../util/axios";
import { notifyWarning, notifySuccess, notifyError } from '../notification/Toastify'
import { ToastContainer } from "react-toastify";


export interface Credentials {
    email: string,
    password: string,
}

export interface authTemplate {
    username: string,
    token: string
}

export interface signUpTemplate {
    firstname: string
    lastname: string
    email: string
    password: string
    imgURL: string
}

export type AuthContextType = {
    auth: authTemplate,
    setAuth: React.Dispatch<React.SetStateAction<authTemplate>>
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    SignUp: any,
    SignIn: any,
    SignOut: any,
    GetProfile: any,
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<authTemplate>({ username: '', token: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate();


    const SignUp = (data: signUpTemplate) => {
        setIsLoading(true)
        apiPost('auth/register', data)
            .then((res) => {
                console.log(res)
                setIsLoading(false)
                if (res.data?.keyPattern) {
                    if (res.data?.keyPattern?.email == 1) {
                        notifyWarning("Email already exists")
                    }
                }
                else {
                    navigate("/login", { state: res.data?.user });
                }
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                notifyError("An error occurred")
            })
    }


    const SignIn = async (data: Credentials) => {
        apiPost('auth/login', data)
            .then((res) => {
                console.log(res)
                setIsLoading(false)
                const token = res.data?.token
                localStorage.setItem("token", token)
                // const { _id, role } = decodeJwt(token)

                // localStorage.setItem("role", role)
                // localStorage.setItem("userId", _id);
                // localStorage.setItem("auth", data.email)

                notifySuccess("Login Successful")
                navigate("/", { state: data.email });
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                notifyError("An error occurred")
            })
    }

    const GetProfile = (id: string) => {
        apiGet(`auth/profile-token/${id}`)
            .then(res => {
                console.log(res.data)
                const{ token } = res.data

                localStorage.setItem("token", token)
                //const { role, email,  } = decodeJwt(token)

                // localStorage.setItem("role", role)
                // localStorage.setItem("userId", id);
                // localStorage.setItem("auth", email)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const SignOut = async () => {
        localStorage.removeItem("token")
        // localStorage.removeItem("role")
        // localStorage.removeItem("userId")
        // localStorage.removeItem("auth")
        navigate("/login", { replace: true })
    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            SignUp,
            SignIn,
            SignOut,
            GetProfile,
            isLoading,
            setIsLoading
        }}>
            {children}
            <ToastContainer />
        </AuthContext.Provider>
    )
}