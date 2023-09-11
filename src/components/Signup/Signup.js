import React, { useState } from "react";

const Signup = ({ onRouteChange }) => {

    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onButtonSubmit = () => {
        fetch("http://localhost:3000/signup", {
            method: "post",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(onRouteChange('signin', false))   
    }


    ////////////////////////////////////////////////////////////////////////////////
    return (
        <article 
            className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw-6 center">
            <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address" 
                        id="email-address"
                        onChange={onEmailChange}
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
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password"> Repeat Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password" 
                        id="password"
                    />
                </div>
                </fieldset>
                <div className="">
                <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign Up"
                    onClick={onButtonSubmit}
                />
                </div>
            </div>
            </main>
        </article>
    )
}

export default Signup