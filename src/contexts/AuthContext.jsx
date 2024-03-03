import { useContext, createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase';
import { SERVER_URL } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [ errorCode, setErrorCode ] = useState('');
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const initializeUser = async (user) => {
        if (user) {
            const {
                accessToken,
            } = user;

            // Attempt login and get country code of user and attach to window.user
            fetch(`${SERVER_URL}/api/common/login`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }).then((data) => {
                const status = data.status;
                if (status === 200) {
                    data.json().then((data) => {
                        const {
                            country
                        } = data;

                        window.user = {
                            accessToken,
                            country,
                        }

                        console.log(user, country);
                        setCurrentUser({ ...user });
                        setUserLoggedIn(true);        
                    });
                } else if (status === 404) {
                    // User is not registered
                    console.log(user);
                    setCurrentUser({ ...user });
                    setUserLoggedIn(false);
                    setErrorCode('NOT_REGISTERED');
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
            setLoading(false);
        }
    }

    const value = {
        currentUser,
        userLoggedIn,
        setUserLoggedIn,
        loading,
        errorCode,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};