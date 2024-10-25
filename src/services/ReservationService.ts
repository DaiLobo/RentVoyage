import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { ReservationType } from "@/interfaces/ReservationType";
import { generateEmailHTML } from "@/templates/emailConfirmationTemplate";
import { convertFirebaseDateToJSDate, formatDateToBR } from "@/utils/format";
import { PropertyTypeEnum } from "@/utils/list";

import { auth, db } from "./firebaseConfig";

export const createReservation = async (
  reservation: ReservationType,
  propertyName: string,
  propertyType: keyof typeof PropertyTypeEnum
) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }
    if (!reservation.propertyId) {
      throw new Error("Property not found");
    }

    //Buscar as reservas da propriedade para validar se está disponível

    const reservationDoc = await addDoc(collection(db, "reservations"), {
      ...reservation,
      userId: user.uid,
      createdAt: new Date().toISOString()
    });

    //Criação do documento para disparo de e-mail
    const emailHtml = generateEmailHTML({
      userName: user.displayName || "",
      reservationCode: reservationDoc.id,
      accommodationName: propertyName, // ajuste conforme necessário
      checkInDate: formatDateToBR(reservation.startDate),
      checkOutDate: formatDateToBR(reservation.endDate),
      totalPrice: reservation.totalPrice.toFixed(2).toString(),
      reservationLink: `https://rent-voyage/my-bookings/${reservationDoc.id}`,
      propertyType
    });

    await addDoc(collection(db, "mail"), {
      to: user.email,
      message: {
        subject: `RentVoyage | Confirmação de reserva em ${propertyName}`,
        html: emailHtml
      }
    });

    return reservationDoc.id;
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

async function getReservationsByUser(userId: string): Promise<any[] | null> {
  const q = query(
    collection(db, "reservations"),
    where("userId", "==", userId)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        startDate: `${convertFirebaseDateToJSDate(doc.data()?.startDate ?? "")}`,
        endDate: `${convertFirebaseDateToJSDate(doc.data()?.endDate ?? "")}`
      }));
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching reservations data:", error);
    return null;
  }
}

export const ReservationService = {
  createReservation,
  getReservedDates,
  getReservationsByUser
};
