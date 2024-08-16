import {
    AuthError, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User
} from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { showToast } from '@/components/Toast';
import { auth } from '@/services/firebaseConfig';

interface AuthContextType {
    userAuth: User | null;
    loading: boolean;
    error: AuthError | undefined;
    handleSignIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userAuth, setUserAuth] = useState<User | null>({} as User);
    const { t } = useTranslation('login');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => { //monitora mudanças no estado de autenticação do usuário
            setUserAuth(user);
        });

        return () => unsubscribe(); //parar de escutar mudanças no estado de autenticação. evitar memory leaks
    }, [userAuth]);

    const handleSignIn = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(email, password);

            setUserAuth(result?.user || null);

            if (result?.user) {
                Router.push("/");
                console.log(userAuth);
            } else {
                console.log(error?.message)
                showToast("error", `${t("message.error")}: ${error}`)
            }

        } catch (error) {
            console.log(error);
            showToast("error", `${t("message.error")}: ${error}`)
        }

    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                Router.push("/");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const logOut = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ userAuth, loading, error, handleSignIn, signInWithGoogle, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};