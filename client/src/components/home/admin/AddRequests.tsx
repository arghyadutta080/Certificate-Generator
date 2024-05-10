import React, { useEffect, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { defaultBlob } from "../../../utils/constants/defaultBlob";
import axios from "axios";
import { createDocURL } from "../../../utils/firebase/createUploadLink";
import { FormControl, FormHelperText, Input, useToast } from "@chakra-ui/react";
import { makeToast } from "../../../utils/makeToast";

const AddRequests: React.FC = () => {
  const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | any>(
    defaultBlob
  );
  const [fileName, setFileName] = useState<string>("");
  const [Uploading, setUploading] = useState<boolean>(false);
  const toast = useToast();

  const getImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files;
    if (
      targetFiles &&
      (targetFiles[0].type == "image/jpeg" ||
        targetFiles[0].type == "image/png")
    ) {
      console.log(targetFiles[0]);
      setUploading(true);
      setFile(targetFiles[0]);
    }
  };

  const addNewCertificate = async () => {
    try {
      const file_url = await createDocURL(fileName, file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/manage-certificate/admin/add-new`,
        {
          title: fileName,
          image_url: file_url,
        },
        {
          withCredentials: true,
        }
      );
      makeToast(toast, "Certificate Added", data.message, "success");
      setUploading(false);
    } catch (error) {
      makeToast(toast, "Try Again!", "Certificate addition failed", "error");
      setUploading(false);
    }
  };

  useEffect(() => {
    file != defaultBlob && fileName !== "" && addNewCertificate();
  }, [file]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControl isRequired my={5} w={"80%"}>
        <Input
          placeholder="Certificate Title"
          size="md"
          textAlign={"center"}
          color={"black"}
          backgroundColor={"white"}
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
        <FormHelperText color="white" textAlign={"left"}>
          {fileName === "" && "*Title is required for Certificate Creation*"}
        </FormHelperText>
      </FormControl>
      <Label
        htmlFor="dropzone-file"
        style={{
          display: "flex",
          height: "50vh",
          width: "85%",
          cursor: "pointer",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.375rem",
          border: "2px dashed #CBD5E0",
          backgroundColor: "#F7FAFC",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "1.5rem",
            paddingTop: "1.25rem",
          }}
        >
          {Uploading ? (
            <p
              style={{
                fontSize: "2rem",
                color: "#9CA3AF",
                paddingBottom: "2vh",
              }}
            >
              Uploading...
            </p>
          ) : (
            <svg
              style={{
                marginBottom: "1rem",
                height: "2rem",
                width: "2rem",
                color: "#9CA3AF",
              }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
          )}
          <p
            style={{
              marginBottom: "0.5rem",
              fontSize: "0.875rem",
              color: "#9CA3AF",
            }}
          >
            <span style={{ fontWeight: "600" }}>Click to upload</span> or drag
            and drop
          </p>
          <p style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
            PNG, JPG, or JPEG
          </p>
        </div>
        <FileInput
          id="dropzone-file"
          style={{ display: "none" }}
          onChange={(event) => getImgFile(event)}
          accept="image/png, image/jpeg, image/jpg"
        />
      </Label>
    </div>
  );
};

export default AddRequests;
