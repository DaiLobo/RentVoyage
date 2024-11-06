import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where
} from "firebase/firestore";

import { UserType } from "@/interfaces/UserType";

import { auth, db } from "./firebaseConfig";

async function getUser(): Promise<QueryDocumentSnapshot | null> {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        return userDoc;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  } else {
    console.log("User is not authenticated");
    return null;
  }
}

const getUserById = async (userId: string): Promise<UserType | null> => {
  try {
    // Verifica se o usuário atual está autenticado
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("Usuário não autenticado.");
    }

    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
      return userDoc.data() as UserType;
    } else {
      console.log("Nenhuma informação do usuário foi encontrada.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error);
    return null;
  }
};

export const GetUserService = {
  getUser,
  getUserById
};
