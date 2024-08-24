import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import { UserType } from "@/interfaces/UserType";

import { db } from "./firebaseConfig";
import { authUploadService } from "./RegisterUploadService";

async function registerUser(user: UserType) {
  try {
    const urlImage = await authUploadService(user?.profileImage, user.uid);

    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.name,
      lasName: user.lastName,
      email: user.email,
      profileImage: urlImage,
      phone: user.phone,
      birthDate: user.birthDate,
      address: user.address,
      gender: user.gender,
      createdAt: new Date().toISOString()
    });
    console.log(docRef);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editUser(user: UserType) {
  try {
    const docRef = await updateDoc(doc(db, "users", user.email), {
      uid: user.uid,
      name: user.name,
      lasName: user.lastName,
      email: user.email,
      phone: user.phone,
      birthDate: user.birthDate,
      address: user.address,
      gender: user.gender,
      createdAt: new Date().toISOString()
    });
    console.log("DocRef:" + docRef);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const SignUpService = {
  registerUser
};
