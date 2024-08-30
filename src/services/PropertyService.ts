import {
  addDoc,
  collection,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import { PropertyType } from "@/interfaces/PropertyType";

import { auth, db } from "./firebaseConfig";

async function registerProperty(property: PropertyType) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // const urlImage = await authUploadService(user?.profileImage, user.uid);
    console.log("valor:", property);
    await addDoc(collection(db, "property"), {
      uidUser: user.uid,
      ...property,
      createdAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function editProperty(
  propertyDocRef: DocumentReference,
  data: PropertyType
) {
  try {
    // const urlImage = await authUploadService(data?.profileImage, data.uid);

    await updateDoc(propertyDocRef, {
      name: data.name,
      address: data.address,
      propertyType: data.propertyType,
      description: data.description
    });
  } catch (error) {
    console.error(error);
  }
}

async function getProperties(uid: string): Promise<any[] | null> {
  const q = query(collection(db, "property"), where("uidUser", "==", uid));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export const PropertyService = {
  registerProperty,
  editProperty,
  getProperties
};
