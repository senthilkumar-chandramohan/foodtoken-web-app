import { useState } from 'react';
import GoogleButton from 'react-google-button';
import parse from 'html-react-parser';
import { doSignInWithGoogle } from '../firebase/auth';
import { errorMessages } from '../utils/constants';

import { useAuth } from '../contexts/AuthContext';
import SignupForm from './SignupForm';

const Login = () => {
    const [ isSigningIn, setIsSigningIn ] = useState(false);
    const { errorCode } = useAuth();

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
                        {
                            errorCode && <>
                                <p>{parse(errorMessages[errorCode])}</p>
                                <SignupForm />
                            </>
                        }
                        {
                            !errorCode &&
                            <GoogleButton style={{margin: '0 auto'}} onClick={handleGoogleSignIn} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;