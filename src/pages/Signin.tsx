import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../scss/signin.scss'

import {
  AiOutlineEye,
  AiOutlineEyeInvisible
} from 'react-icons/ai'
import useAuth from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import LoadingSpin from 'react-loading-spin'


function Signin(): JSX.Element {
  const { SignIn, isLoading } = useAuth()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [iconVisible, setIconVisible] = useState(false);
  const iconVisibilityToggle = iconVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible /> 

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SignIn({
      email: email,
      password: password,
    })
  }

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget!.value) 
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget!.value)
  const changeVisibility = () => setIconVisible(!iconVisible);
  

  return (
    <section className="login-section" >
      <form className="container" onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <p style={{ marginTop: "-20px" }}> Access your account.</p>

        <div className="input">
          <label htmlFor="email-input" className="mini-head">Email</label>
          <input id="email-input" value={email} className="form-input" type="email"
            onChange={handleEmail}
            placeholder="Email" />
        </div>

        <div className="input">
          <label htmlFor="password-login" className="mini-head">Password</label>
          <input id="password-login" className="form-input" value={password}
            type={iconVisible ? "text" : "password"}
            placeholder="Password"
            onChange={handlePassword}
          />
          <div id="icon-see1" onClick={changeVisibility}>
            {iconVisibilityToggle}
          </div>
        </div>

        {isLoading ?
          <LoadingSpin size="40px" numberOfRotationsInAnimation={3} /> :
          <button className="btn btn-large">Sign in</button>
        }

        <div className="login-link-div">
          <p style={{ textAlign: "center" }}>No account yet? <Link to="/register" className='link'>Sign up</Link></p>
        </div>

      </form>
      <ToastContainer />
    </section>
  )
}

export default Signin