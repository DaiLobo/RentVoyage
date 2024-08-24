import {
  addDoc,
  collection,
  DocumentReference,
  updateDoc
} from "firebase/firestore";

import { UserType } from "@/interfaces/UserType";

import { db } from "./firebaseConfig";
import { authUploadService } from "./RegisterUploadService";

async function registerUser(user: UserType) {
  try {
    const urlImage = await authUploadService(user?.profileImage, user.uid);

    await addDoc(collection(db, "users"), {
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

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editUser(userDocRef: DocumentReference, data: UserType) {
  try {
    const urlImage = await authUploadService(data?.profileImage, data.uid);

    await updateDoc(userDocRef, {
      name: data.name,
      lasName: data.lastName,
      email: data.email,
      profileImage: urlImage,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address,
      gender: data.gender
    });
  } catch (error) {
    console.error(error);
  }
}

export const SignUpEditService = {
  registerUser,
  editUser
};
