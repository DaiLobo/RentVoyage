import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import ShortUniqueId from "short-uuid";

import { ReservationRegisterType } from "@/interfaces/ReservationType";
import { generateEmailHTML } from "@/templates/emailConfirmationTemplate";
import { convertFirebaseDateToJSDate, formatDateToBR } from "@/utils/format";
import { PropertyTypeEnum } from "@/utils/list";

import { auth, db } from "./firebaseConfig";

const shortUid = ShortUniqueId();

export const createReservation = async (
  reservation: ReservationRegisterType,
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
      reservationCode: shortUid.generate(),
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

async function getReservationsByPropertyId(
  propertyId: string
): Promise<any[] | null> {
  try {
    const reservationQuery = query(
      collection(db, "reservations"),
      where("propertyId", "==", propertyId)
    );

    const reservationSnapshot = await getDocs(reservationQuery);

    if (reservationSnapshot.empty) {
      return null;
    }

    const reservations = await Promise.all(
      reservationSnapshot.docs.map(async (booking) => {
        const reservationData = booking.data();
        let userName = "-";

        if (reservationData.userId) {
          const userRef = doc(db, "users", reservationData.userId);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            userName = userDoc.data().name || userName;
          }
        }

        return {
          id: booking.id,
          ...booking.data(),
          userName,
          startDate: `${convertFirebaseDateToJSDate(booking.data()?.startDate ?? "")}`,
          endDate: `${convertFirebaseDateToJSDate(booking.data()?.endDate ?? "")}`
        };
      })
    );

    return reservations;
  } catch (error) {
    console.error("Error fetching reservations for property:", error);
    return null;
  }
}

export const ReservationService = {
  createReservation,
  getReservedDates,
  getReservationsByUser,
  getReservationsByPropertyId
};
