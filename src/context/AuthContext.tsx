import {
    GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User, UserCredential
} from 'firebase/auth';
import Router from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'sonner';

import { auth } from '@/services/firebaseConfig';

interface AuthContextType {
    userAuth: User | null;
    loading: boolean;
    handleSignIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userAuth, setUserAuth] = useState<User | null>({} as User);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserAuth(user);

        });

        return () => unsubscribe();
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
                toast.error("Falha na autenticação", {
                    className: "bg-transparent text-red-500",
                })
            }

        } catch (error) {
            console.log(error);
            toast(`Houve um erro: ${error}`, {
                className: "bg-transparent text-red-500",
            })
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
        <AuthContext.Provider value={{ userAuth, loading, handleSignIn, signInWithGoogle, logOut }}>
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
