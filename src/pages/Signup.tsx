import LoadingSpin from "react-loading-spin";
import { useReducer, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { reducer, field } from '../reducer/signupReducer'
import {
    AiOutlineEye,
    AiOutlineEyeInvisible
} from 'react-icons/ai'

import {
    BsArrowLeft
} from 'react-icons/bs'

import '../scss/signup.scss'
import useAuth from '../hooks/useAuth'


function Signup(): JSX.Element {
    const { SignUp, isLoading } = useAuth()

    let navigate = useNavigate()
    const handleGoBack = () => navigate(-1)

    const [iconVisible, setIconVisibility] = useState<boolean>(false)
    const [icon2Visible, setIconVisibility2] = useState<boolean>(false)
    const [state, dispatch] = useReducer(reducer, field)

    const changeVisibility = () => setIconVisibility(!iconVisible)
    const changeVisibility2 = () => setIconVisibility2(!icon2Visible)

    const getFirstName = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "FIRSTNAME", value: e.currentTarget.value })
    }

    const getLastName = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "LASTNAME", value: e.currentTarget.value })
    }

    const getPassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "password", value: e.currentTarget.value })
    }

    const getEmail = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "email", value: e.currentTarget.value })
    }

    const getConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch({ type: "confirmPassword", value: e.currentTarget.value })
    }

    const iconVisibilityToggle = iconVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
    const icon2VisibilityToggle = icon2Visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />

    const checkPasswordMatch = state.passwordMatchError ? "form-input input-error" : "form-input"
    const confirmPasswordInfoText = state.passwordMatchError ? 'Passwords do not match.' : ''
    const passwordInfoText = state.passwordMatchError
        ? "Password must be at least be 7 characters long" : ""

    const checkAllFields = (state.firstName !== ''
        && state.lastName !== ''
        && !state.isEmailError
        && state.email !== ''
        && state.confirmPassword === state.password && state.password !== '' && state.confirmPassword !== '')

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (checkAllFields) {
            SignUp({
                firstname: state.firstName,
                lastname: state.lastName,
                email: state.email,
                password: state.password,
                imgURL: 'https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/green_webpict17_1484337096-1.png',
            })
        }
        dispatch({ type: "reset" })
    }


    const handleSocialLogin = () => {

    }
  
    function navigateToUrl(url: string){
      window.location.href = url;
    }
    
    async function auth() {
      const response = await fetch('http://localhost:4000/api/request', {method:'post'});
      const data = await response.json();
      console.log(data);
      navigateToUrl(data.url);
    }



    return (
        <section className="sign-up">

            <form className="container" onSubmit={handleSignup}>

                <div className="icon" onClick={handleGoBack}> <BsArrowLeft /></div>
                <h2>Sign up</h2>
                    <button className="btn" onClick={auth}>Login With Google</button>
                <p style={{ marginTop: '-10px' }}>Login to vote for your favorite model.</p>

                <div className="input">
                    <div className="name">
                        <input className="form-input" type="text" placeholder="Firstname" required
                            value={state.firstName}
                            onChange={getFirstName}
                        />
                        <input className="form-input" type="text"
                            value={state.lastName} placeholder="Lastname" required
                            onChange={getLastName}
                        />
                    </div>
                </div>

                <div className="input">
                    <div className="name">
                        <div className="email-div">
                            <input className={state.isEmailError ? "form-input input-error" : "form-input"} type="email"
                                onChange={getEmail}
                                value={state.email} required
                                placeholder="Email" />
                            <p className='red-info'>{state.isEmailError ? "Enter a valid email." : ""}</p>
                        </div>
                    </div>
                </div>

                <div className="input">
                    <input className={checkPasswordMatch}
                        type={iconVisible ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={state.password}
                        onChange={getPassword}
                    />
                    <div id="icon-see1" onClick={changeVisibility}>
                        {iconVisibilityToggle}
                    </div>
                    <p className="red-info">{passwordInfoText}</p>
                </div>

                <div className="input">
                    <input className={checkPasswordMatch}
                        type={icon2Visible ? "text" : "password"}
                        value={state.confirmPassword}
                        required
                        placeholder="Confirm password" onChange={getConfirmPassword}
                    />
                    <div id="icon-see2" onClick={changeVisibility2}>
                        {icon2VisibilityToggle}
                    </div>
                    <p className='red-info'>{confirmPasswordInfoText}</p>
                </div>

                <button type="submit" className={ checkAllFields ? "opaque-btn btn-signup" : "opaque-btn btn-signup disable-btn"}>
                    {isLoading ? <LoadingSpin size="40px" numberOfRotationsInAnimation={3} /> : "Sign Up"}
                </button>

                <div className="login-link-div">
                    <p style={{ textAlign: "center" }}>Already have an account? <Link to="/login"
                        className="link">Sign in</Link></p>
                </div>

            </form>
        </section>
    )
}

export default Signup