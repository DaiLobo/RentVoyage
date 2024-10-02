import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";

import { PropertyType } from "@/interfaces/PropertyType";
import { convertFirebaseDateToJSDate } from "@/utils/format";

import { auth, db } from "./firebaseConfig";
import { StorageServices } from "./RegisterUploadService";

async function registerProperty(property: PropertyType) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // const urlImage = await StorageServices.uploadImagesService(
    //   property.images,
    //   property.id
    // );

    await addDoc(collection(db, "property"), {
      uidUser: user.uid,
      ...property,
      // images: urlImage,
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
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User is not authenticated");
    }
    const uid = user.uid;

    const propertyDocRef = await getDoc(doc(db, "property", propertyId));

    if (!propertyDocRef.exists()) {
      throw new Error("Property does not exist");
    }

    const propertyData = propertyDocRef.data();

    if (propertyData.uidUser !== uid) {
      return false;
    }

    const urlImages = await StorageServices.uploadImagesService(
      data.images,
      propertyId
    );

    await updateDoc(propertyDocRef.ref, {
      name: data.name,
      address: data.address,
      propertyType: data.propertyType,
      description: data.description,
      images: arrayUnion(...urlImages),
      price: data.price,
      capacity: data.capacity
    });

    return true;
  } catch (error) {
    console.error(error);
  }
}

async function getAllPropertiesFiltered(searchParams: {
  location?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  guests?: number | null;
}): Promise<any[] | null> {
  const { location, startDate, endDate, guests } = searchParams;

  //Primeira consulta de propriedades
  const propertyQuery = query(collection(db, "property"));

  try {
    const propertySnapshot = await getDocs(propertyQuery);

    if (propertySnapshot.empty) {
      return null;
    }

    const propertiesWithReservations: any[] | null = await Promise.all(
      propertySnapshot.docs.map(async (propertyDoc) => {
        const propertyId = propertyDoc.id;
        const propertyData = { id: propertyId, ...propertyDoc.data() };

        // @ts-ignore
        if (guests && propertyData.capacity < guests) {
          return null;
        }

        // Busca de reservas da propriedade
        const reservationQuery = query(
          collection(db, "reservations"),
          where("propertyId", "==", propertyId)
        );

        const reservationSnapShot = await getDocs(reservationQuery);
        if (reservationSnapShot.empty) {
          return propertyData;
        }

        const availableReservations = reservationSnapShot.docs
          .filter((doc) => {
            const reservation = doc.data();
            const reservationStart = reservation?.startDate.toDate();
            const reservationEnd = reservation?.endDate.toDate();

            if (startDate && endDate) {
              return reservationEnd < startDate || reservationStart > endDate; // Se a reserva não está dentro do intervalo
            }

            return true;
          })
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            startDate: `${convertFirebaseDateToJSDate(doc.data()?.startDate ?? "")}`,
            endDate: `${convertFirebaseDateToJSDate(doc.data()?.endDate ?? "")}`
          }));

        return {
          ...propertyData,
          reservations: availableReservations
        };
      })
    );

    return propertiesWithReservations
      .filter((property) => property !== null)
      .filter((property) =>
        property.address.toLowerCase().trim().includes(location)
      );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

async function filterAvailableProperties(
  hits: any[],
  from: Date | null,
  to: Date | null
): Promise<PropertyType[]> {
  const availableHits: any[] = [];

  for (const hit of hits) {
    const reservationQuery = query(
      collection(db, "reservations"),
      where("propertyId", "==", hit.objectID)
    );

    const reservationSnapShot = await getDocs(reservationQuery);

    if (reservationSnapShot.empty) {
      availableHits.push(hit);
    } else {
      reservationSnapShot.docs.filter((doc) => {
        const reservation = doc.data();
        const reservationStart = reservation?.startDate.toDate();
        const reservationEnd = reservation?.endDate.toDate();

        if (from && to) {
          // Se a reserva não está dentro do intervalo
          if (reservationEnd < from || reservationStart > to) {
            availableHits.push(hit);
          }
        }
      });
    }
  }

  return availableHits;
}

async function getAllProperties(): Promise<any[] | null> {
  const propertyQuery = query(collection(db, "property"));

  try {
    const propertySnapshot = await getDocs(propertyQuery);

    if (propertySnapshot.empty) {
      return null;
    }

    const propertiesWithReservations = await Promise.all(
      propertySnapshot.docs.map(async (propertyDoc) => {
        const propertyId = propertyDoc.id;
        const propertyData = { id: propertyId, ...propertyDoc.data() };

        // Busca de reservas da propriedade
        const reservationQuery = query(
          collection(db, "reservations"),
          where("propertyId", "==", propertyId)
        );

        const reservationSnapShot = await getDocs(reservationQuery);
        if (reservationSnapShot.empty) {
          return propertyData;
        }

        const reservations = reservationSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          startDate: `${convertFirebaseDateToJSDate(doc.data()?.startDate ?? "")}`,
          endDate: `${convertFirebaseDateToJSDate(doc.data()?.endDate ?? "")}`
        }));

        return {
          ...propertyData,
          reservations
        };
      })
    );

    return propertiesWithReservations;

    // if (!propertySnapshot.empty) {
    //   return propertySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data()
    //   }));
    // } else {
    //   return null;
    // }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
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
  getAllPropertiesFiltered,
  filterAvailableProperties,
  getAllProperties,
  getProperties,
  getProperty
};
