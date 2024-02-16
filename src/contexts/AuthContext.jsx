import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ userLoggedIn, setUserLoggedIn ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    const initializeUser = async (user) => {
        if (user) {
            console.log(user);
            setCurrentUser({ ...user });
            setUserLoggedIn(true);

            // Store user's access token in window object, to be used by push notification code
            if (window) {
                const {
                    accessToken,
                } = user;

                window.user = { accessToken }
                console.log(window.user);
            }
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
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