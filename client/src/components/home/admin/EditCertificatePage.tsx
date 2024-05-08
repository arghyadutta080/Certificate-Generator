import { Button, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditComponent from "./EditComponent";
import { Resolution, Margin, usePDF } from "react-to-pdf";

const EditCertificatePage: React.FC = () => {
  const { id } = useParams();
  console.log(id);

  const [image, setimage] = useState<string>("");

  const [information, setInformation] = useState({
    name: "",
    course: "SAMPLE COURSE",
    date: "DD/MM/YYYY",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const getRequestDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/manage-certificate/admin/get-requests/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setimage(data.request.certificate.image_url);
      setInformation((prevState) => ({
        ...prevState,
        name: data.request.username,
      }));
    } catch (error) {
      console.log(error);
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

  const printHandler = () => {
    try {
      toPDF();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack
      minH={"90vh"}
      w={{ base: "95%", lg: "90%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      justifyContent="space-between"
    >
      <EditedCertificate />

      <VStack bgColor={"white"} px={5} py={5} spacing={5} borderRadius={10}>
        <Text fontSize={30} fontWeight={"bold"} color={"#1D3FFE"}>Certificate Details</Text>
        <Input
          placeholder="Name"
          size="md"
          borderColor={"blue"}
          bgColor={"white"}
          name="name"
          value={information.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Course name"
          size="md"
          borderColor={"blue"}
          bgColor={"white"}
          name="course"
          value={information.course}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Issue Date"
          size="md"
          borderColor={"blue"}
          bgColor={"white"}
          name="date"
          value={information.date}
          onChange={handleInputChange}
        />
        <Button colorScheme="teal" size="md" onClick={printHandler} my={2}>
          Save as PDF
        </Button>
      </VStack>
    </HStack>
  );
};

export default EditCertificatePage;
