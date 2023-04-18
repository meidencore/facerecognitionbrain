import React from "react";

const Navigation = ( { onRouteChange, signStatus, route }) => {
    return (
        <nav className="flex justify-end">
            {signStatus && route === 'home' ? 
                <p 
                className="f3 link dim black underline pa3 pointer"
                onClick={() => {onRouteChange('signin', false)}}
                >
                {'Sign Out'}
                </p>
            : route === 'signin' ?
                <p 
                className="f3 link dim black underline pa3 pointer"
                onClick={() => {onRouteChange('signup', false)}}
                >
                {'Sign Up'}
                </p>
            : route === 'signup' ?   
                <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => {onRouteChange('signin', false)}}
                >
                {'Sign in'}
                </p>
            : 
                <>
                    <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => {onRouteChange('signup', false)}}
                    >
                    {'Sign Up'}
                    </p>
                    <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => {onRouteChange('signin', false)}}
                    >
                    {'Sign in'}
                    </p>
                </>    
            }
        </nav>
    )
}

export default Navigation