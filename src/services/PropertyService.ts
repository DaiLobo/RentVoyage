import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
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

async function editProperty(propertyId: string, data: PropertyType) {
  try {
    // const urlImage = await authUploadService(data?.profileImage, data.uid);
    const propertyDocRef = await getDoc(doc(db, "property", propertyId));

    await updateDoc(propertyDocRef.ref, {
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

async function getProperty(id: string): Promise<any | null> {
  try {
    const docRef = doc(db, "property", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
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
  getProperties,
  getProperty
};
