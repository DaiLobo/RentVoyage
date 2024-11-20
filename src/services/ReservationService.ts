import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
      reservationCode: shortUid.generate().substring(5, 0),
      accommodationName: propertyName,
      checkInDate: formatDateToBR(reservation.startDate),
      checkOutDate: formatDateToBR(reservation.endDate),
      totalPrice: reservation.totalPrice.toFixed(2).toString(),
      reservationLink: `https://rent-voyage.vercel.app/my-bookings/view/${reservationDoc.id}`,
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

//Buscar as reservas do usuário incluindo as informações da propriedade da reserva
async function getReservationsByUser(userId: string): Promise<any[] | null> {
  const q = query(
    collection(db, "reservations"),
    where("userId", "==", userId),
    orderBy("startDate", "asc")
  );

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const reservationsWithPropertyData = await Promise.all(
      querySnapshot.docs.map(async (reservationDoc) => {
        const reservationData = {
          id: reservationDoc.id,
          ...reservationDoc.data(),
          startDate: `${convertFirebaseDateToJSDate(reservationDoc.data()?.startDate ?? "")}`,
          endDate: `${convertFirebaseDateToJSDate(reservationDoc.data()?.endDate ?? "")}`
        };

        // Busca as informações da propriedade
        // @ts-ignore
        const propertyId = reservationData.propertyId;
        const propertyDoc = await getDoc(doc(db, "property", propertyId));
        const propertyData = propertyDoc.exists() ? propertyDoc.data() : null;

        return {
          ...reservationData,
          property: propertyData ?? null
        };
      })
    );

    return reservationsWithPropertyData;

    // if (!querySnapshot.empty) {
    //   return querySnapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //     startDate: `${convertFirebaseDateToJSDate(doc.data()?.startDate ?? "")}`,
    //     endDate: `${convertFirebaseDateToJSDate(doc.data()?.endDate ?? "")}`
    //   }));
    // } else {
    //   return null;
    // }
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
      where("propertyId", "==", propertyId),
      orderBy("startDate", "asc")
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

async function getReservationByIdWithProperty(
  reservationId: string
): Promise<any | null> {
  try {
    const reservationRef = doc(db, "reservations", reservationId);
    const reservationDoc = await getDoc(reservationRef);

    if (!reservationDoc.exists()) {
      console.error("Reserva não encontrada");
      return null;
    }

    const reservationData = reservationDoc.data();
    const propertyId = reservationData?.propertyId;

    // Verifica se o propertyId está presente na reserva
    if (!propertyId) {
      console.error("ID da propriedade não encontrado na reserva");
      return null;
    }

    // Busca o documento da propriedade associada usando o ID
    const propertyRef = doc(db, "property", propertyId);
    const propertyDoc = await getDoc(propertyRef);

    if (!propertyDoc.exists()) {
      console.error("Propriedade associada não encontrada");
      return null;
    }

    // Combina os dados da reserva e da propriedade
    const propertyData = propertyDoc.data();
    return {
      reservationId: reservationDoc.id,
      ...reservationData,
      startDate: `${convertFirebaseDateToJSDate(reservationData?.startDate ?? "")}`,
      endDate: `${convertFirebaseDateToJSDate(reservationData.endDate ?? "")}`,
      property: {
        id: propertyDoc.id,
        ...propertyData
      }
    };
  } catch (error) {
    console.error("Erro ao buscar reserva e propriedade:", error);
    return null;
  }
}

export const ReservationService = {
  createReservation,
  getReservedDates,
  getReservationsByUser,
  getReservationsByPropertyId,
  getReservationByIdWithProperty
};
