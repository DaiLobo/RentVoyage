import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from "firebase/storage";

import { storage } from "./firebaseConfig";

export const authUploadService = async (image?: File | null, uid?: string) => {
  if (image) {
    const storageRef = ref(
      storage,
      `profileImages/${uid}/profileImage.${image.type}`
    ); //VER A EXTENSÃO
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

export const uploadImagesService = async (
  images?: File[] | null,
  id?: string
) => {
  if (images && id) {
    const uploadPromises = images.map(async (image) => {
      const storageRef = ref(storage, `properties/${id}/${image.name}`);
      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    });

    const imagesRef = await Promise.all(uploadPromises);

    return imagesRef;
  }

  return [];
};

export const StorageServices = {
  authUploadService,
  uploadImagesService
};
