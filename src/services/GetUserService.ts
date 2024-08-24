import {
  collection,
  DocumentReference,
  getDocs,
  query,
  where
} from "firebase/firestore";

import { UserType } from "@/interfaces/UserType";

import { auth, db } from "./firebaseConfig";

export interface GetUserData extends UserType {
  idDoc: DocumentReference;
}

async function getUser(): Promise<DocumentReference | null> {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    const q = query(collection(db, "users"), where("uid", "==", uid));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        // const userData = userDoc.data() as GetUserData;

        return userDoc.ref;
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

export const GetUserService = {
  getUser
};
