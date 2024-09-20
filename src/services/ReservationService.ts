import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { ReservationType } from "@/interfaces/ReservationType";
import { convertFirebaseDateToJSDate } from "@/utils/format";

import { auth, db } from "./firebaseConfig";

export const createReservation = async (reservation: ReservationType) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    if (!reservation.propertyId) {
      throw new Error("Property not found");
    }

    //Buscar as reservas da propriedade para validar se está disponível
    const reservationRef = await addDoc(collection(db, "reservations"), {
      ...reservation,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });
    return reservationRef.id;
  } catch (error) {
    console.error("Error creating reservation: ", error);
    throw new Error("Failed to create reservation.");
  }
};

async function getReservedDates(
  propertyId: string
): Promise<{ startDate: string; endDate: string }[]> {
  const reservationsQuery = query(
    collection(db, "reservations"),
    where("propertyId", "==", propertyId)
  );

  const reservationSnapshot = await getDocs(reservationsQuery);

  const reservedDates = reservationSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      startDate: `${convertFirebaseDateToJSDate(data.startDate ?? "")}`, // Converter o timestamp do Firebase para Date
      endDate: `${convertFirebaseDateToJSDate(data.endDate ?? "")}` // Converter o timestamp do Firebase para Date
    };
  });

  return reservedDates;
}

export const ReservationService = {
  createReservation,
  getReservedDates
};
