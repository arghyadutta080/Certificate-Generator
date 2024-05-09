import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Config.ts";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const app = initializeApp(firebaseConfig);

const createDocURL = (fileId: string, file: Blob | Uint8Array | ArrayBuffer) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = getStorage(app);
            const fileRef = ref(storage, fileId);

            await uploadBytes(fileRef, file);       // uploading img in firebase storage from the blob or file containing the img

            getDownloadURL(fileRef).then((url: any) => {        // getting that image url, uploaded in cloud
                resolve(url)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export { createDocURL }