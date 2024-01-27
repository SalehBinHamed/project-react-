import { createContext } from 'react';
import { GoogleAuthProvider,  getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   

    // Sign up with gmail
    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

  

    // Function to log out the current signed in user
    const logOut = () =>{
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    // Adding an effect to update user info after user signs up with his gmail
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    // Build auth info object and pass this to data to auth provider
    const authInfo = {
        user, 
        loading,
        
        logOut,
        signUpWithGmail
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;