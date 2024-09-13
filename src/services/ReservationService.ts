import { addDoc, collection } from "firebase/firestore";

import { ReservationType } from "@/interfaces/ReservationType";

import { auth, db } from "./firebaseConfig";

export const createReservation = async (reservation: ReservationType) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

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

export const ReservationService = {
  createReservation
};
