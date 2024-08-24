import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where
} from "firebase/firestore";

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

export const GetUserService = {
  getUser
};
