import {
  Box,
  Button,
  CircularProgress,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditComponent from "./EditComponent";
import { Resolution, Margin, usePDF } from "react-to-pdf";
import { FaSave } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import { createDocURL } from "../../../../utils/firebase/createUploadLink";
import { makeToast } from "../../../../utils/makeToast";
import FormInputComponent from "./FormInputComponent";
import { defaultBlob } from "../../../../utils/constants/defaultBlob";

const EditCertificatePage: React.FC = () => {
  const { id } = useParams();

  const [image, setimage] = useState<string>("");
  const [information, setInformation] = useState({
    name: "",
    course: "SAMPLE COURSE",
    date: "DD/MM/YYYY",
  });

  const certificateNameLayout = {
    text: information.name,
    stageHeight: 80,
    stageWidth: 620,
    stageLeft: "20%",
    stageTop: "30%",
    textFontSize: 50,
    alignment: "center",
    textFontFamily: "Times New Roman",
    textColor: "#FCBD03",
  };

  const certificateDescLayout = {
    text: `For successfully completing the Tutedude ${information.course} \ncourse on ${information.date}.`,
    stageHeight: 120,
    stageWidth: 720,
    stageLeft: "15%",
    stageTop: "40%",
    textFontSize: 22,
    alignment: "center",
    textColor: "black",
    textLineheight: 1.5,
  };

  const toast = useToast();
  const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer | any>(
    defaultBlob
  );
  const [Uploading, setUploading] = useState<boolean>(false);

  const getPDFfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files;
    if (targetFiles && targetFiles[0].type == "application/pdf") {
      console.log(targetFiles[0]);
      setUploading(true);
      setFile(targetFiles[0]);
    }
  };

  const approveCertificate = async () => {
    try {
      const file_id: string | any = id?.toString();
      const file_url = await createDocURL(file_id, file);
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER_API
        }/api/manage-certificate/admin/approve-request/${id}`,
        {
          google_drive_url: file_url,
          state: "approved",
        },
        {
          withCredentials: true,
        }
      );
      makeToast(toast, "Certificate Approved", data.message, "success");
      setUploading(false);
    } catch (error) {
      makeToast(toast, "Try Again!", "Certificate approval failed", "error");
      setUploading(false);
    }
  };

  useEffect(() => {
    file != defaultBlob && approveCertificate();
  }, [file]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getRequestDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/api/manage-certificate/admin/get-requests/${id}`,
        {
          withCredentials: true,
        }
      );
      setimage(data.request.certificate.image_url);
      setInformation((prevState) => ({
        ...prevState,
        name: data.request.username,
      }));
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getRequestDetails();
  }, []);

  const { toPDF, targetRef } = usePDF({
    resolution: Resolution.HIGH,
    method: "save",
    filename: `${id}.pdf`,
    page: { margin: Margin.NONE, format: "letter", orientation: "landscape" },
  });

  const printHandler = () => {
    try {
      toPDF();
    } catch (error) {
      // console.log(error);
    }
  };

  const EditedCertificate = () => {
    return (
      <div ref={targetRef}>
        <VStack position={"relative"}>
          <Image src={image} height={815} objectFit="contain" />
          <EditComponent CertificateLayout={certificateDescLayout} />
          <EditComponent CertificateLayout={certificateNameLayout} />
        </VStack>
      </div>
    );
  };

  return (
    <HStack
      minH={"70vh"}
      w={{ base: "95%", lg: "90%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      justifyContent="space-between"
    >
      <EditedCertificate />

      <VStack bgColor={"white"} px={5} py={5} spacing={5} borderRadius={10}>
        <Text fontSize={30} fontWeight={"bold"} color={"#1D3FFE"}>
          Certificate Details
        </Text>
        <FormInputComponent
          place="Name"
          name="name"
          value={information.name}
          onChange={handleInputChange}
        />
        <FormInputComponent
          place="Course name"
          name="course"
          value={information.course}
          onChange={handleInputChange}
        />
        <FormInputComponent
          place="Issue Date"
          name="date"
          value={information.date}
          onChange={handleInputChange}
        />
        <VStack w={"full"}>
          <Button
            colorScheme="teal"
            size="md"
            onClick={printHandler}
            my={2}
            width={"full"}
          >
            <FaSave size={20} /> <Box ml={2}>Save for preview</Box>
          </Button>
          <VStack justifyContent={"space-between"} w={"full"}>
            <HStack w={"full"} justifyContent={"space-between"}>
              <input
                type="file"
                accept=".pdf"
                onChange={(event) => getPDFfile(event)}
                id="files"
                style={{ display: "none" }}
              />
              <label
                htmlFor="files"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#2A948A",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Uploading ? (
                  <>
                    <CircularProgress
                      isIndeterminate
                      color="blue.600"
                      size={6}
                    />
                    <Box ml={2}>Uploading...</Box>
                  </>
                ) : (
                  <>
                    <IoCloudUploadSharp size={20} />
                    <Box ml={2}>Upload</Box>
                  </>
                )}
              </label>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </HStack>
  );
};

export default EditCertificatePage;
