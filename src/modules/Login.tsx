import { useState } from 'react';
import GoogleButton from 'react-google-button';
import { doSignInWithGoogle } from '../firebase/auth';

const Login = () => {
    const [ isSigningIn, setIsSigningIn ] = useState(false);

    const handleGoogleSignIn = () => {
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(() => {
                setIsSigningIn(false);
            });
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <GoogleButton style={{margin: '0 auto'}} onClick={handleGoogleSignIn} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;