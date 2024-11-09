import {
  AuthError, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { showToast } from "@/components/Toast";
import { UserType } from "@/interfaces/UserType";
import { auth, db } from "@/services/firebaseConfig";
import { GetUserService } from "@/services/GetUserService";

interface AuthContextType {
  userAuth: User | null;
  userData: UserType | null;
  setUserData: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  error: AuthError | undefined;
  handleSignIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [userAuth, setUserAuth] = useState<User | null>({} as User);
  const [userData, setUserData] = useState<UserType | null>({} as UserType);
  const { t } = useTranslation("login");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //monitora mudanças no estado de autenticação do usuário
      setUserAuth(user);
    });

    return () => unsubscribe(); //parar de escutar mudanças no estado de autenticação. evitar memory leaks
  }, [userAuth]);

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Salvar dados do usuário no localStorage
  useEffect(() => {
    if (userData?.uid) {
      localStorage.setItem("userData", JSON.stringify(userData));
      setCookie(null, 'uid', userData.uid, { path: '/' });
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(email, password);

      setUserAuth(result?.user || null);

      if (result?.user) {
        const data = await GetUserService.getUser();
        setUserData(data?.data() as UserType);

        Router.push("/");
      } else {
        console.log(error?.message);
        showToast("error", `${t("message.error")}: ${error}`);
      }
    } catch (error) {
      console.log(error);
      showToast("error", `${t("message.error")}: ${error}`);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userData = {
          name: user.displayName || "",
          email: user.email || "",
          profileImage: user.photoURL || "",
          phone: user.phoneNumber || "",
          uid: user.uid,
          createdAt: new Date().toISOString()
        };

        const userRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userRef);

        if (!docSnapshot.exists()) {
          await setDoc(userRef, userData);
          console.log("Documento de usuário criado no Firestore.");
        } else {
          console.log("Documento de usuário já existe no Firestore.");
        }

        setUserData(user as unknown as UserType);
        Router.push("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login com o Google:", error);
    }

    /* signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUserData(result?.user as unknown as UserType);

        Router.push("/");
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  const logOut = async () => {
    await signOut(auth);

    setUserAuth(null);
    setUserData(null);
    destroyCookie(null, "uid");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        userData,
        setUserData,
        loading,
        error,
        handleSignIn,
        signInWithGoogle,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
