import { getAuth, updateProfile } from "firebase/auth";
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
      lastName: user.lastName,
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
      lastName: data.lastName ?? "",
      email: data.email,
      profileImage: urlImage,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address ?? "",
      gender: data.gender ?? ""
    });
  } catch (error) {
    console.error(error);
  }
}

const updateUserProviderGoogle = async (newDisplayName: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, {
        displayName: newDisplayName
      });
      console.log("Nome de exibição atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o nome de exibição: ", error);
    }
  } else {
    console.error("Usuário não autenticado.");
  }
};

export const SignUpEditService = {
  registerUser,
  editUser,
  updateUserProviderGoogle
};
