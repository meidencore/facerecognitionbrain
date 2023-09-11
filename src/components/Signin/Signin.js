import React, { useState } from "react";

const Signin = ({ loadUser, onRouteChange }) => {

    const [signInEmail, setSignInEmail ] = useState('')
    const [signInPassword, setSignInPassword ] = useState('')

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
    setSignInPassword(event.target.value)
    }  

    const onButtonSubmit = () => {
        fetch("http://localhost:3000/signin", {
            method: "post",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                loadUser(data)
                onRouteChange('home', true)
            }
        })   
    }
    

    ////////////////////////////////////////////////////////////////////////////////
    return (
        <>
        <article 
            className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw-6 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address" 
                        id="email-address"
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password" 
                        id="password"
                        onChange={onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="mv3">
                <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"
                    onClick={onButtonSubmit}
                />
                </div>
            </div>
            </main>
        </article>
        <div className="ma4">
        <input 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Enter as a Guest"
            onClick={() => {onRouteChange('home', false)}}
        />
        </div>
        </>
    )
}

export default Signin