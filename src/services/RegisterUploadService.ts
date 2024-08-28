import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "./firebaseConfig";

export const authUploadService = async (image?: File | null, uid?: string) => {
  if (image) {
    const storageRef = ref(storage, `profileImages/${uid}/profileImage`); //VER A EXTENSÃO
    const uploadTask = uploadBytesResumable(storageRef, image);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => resolve()
      );
    });

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  }

  return "";
};
