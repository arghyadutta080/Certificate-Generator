import axios from "axios";

export const getCertificateUploadURL = async (file: File) => {
    try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        const response = await axios.post(
            `${import.meta.env.VITE_CLOUDINARY_API}`,
            data
        );

        // console.log(response.data);
        return response.data.url;

    } catch (error) {
        // console.log(error);
    }
}