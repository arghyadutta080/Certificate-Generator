import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";
import AllCertificates from "../components/home/AllCertificates";
import Navbar from "../components/common/Navbar";
import { VStack } from "@chakra-ui/react";
import RequestedCertificates from "../components/home/RequestedCertificates";
import ApprovedCertificates from "../components/home/ApprovedCertificates";
import AdminPanel from "../components/home/admin/AdminPanel";
import EditCertificatePage from "../components/home/admin/EditCertificatePage";

export interface Certificate {
  _id: string;
  title: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface requestedCertificate {
  _id: string;
  certificate: Certificate;
  requested_by: string;
  state: string;
  google_drive_url: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HomePage: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [requestedCertificates, setRequestedCertificates] = useState<
    requestedCertificate[]
  >([]);
  const [approvedCertificates, setApprovedCertificates] = useState<
    requestedCertificate[]
  >([]);

  const getAllCertificates = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/manage-certificate/get-all",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setCertificates(data.certificates);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestedCertificates = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/manage-certificate/user/my-certificates",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      const requests: requestedCertificate[] = data.requests.filter(
        (request: requestedCertificate) => {
          return request.state === "pending";
        }
      );
      setRequestedCertificates(requests);
      const approved: requestedCertificate[] = data.requests.filter(
        (request: requestedCertificate) => {
          return request.state === "approved";
        }
      );
      setApprovedCertificates(approved);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCertificates();
  }, []);

  useEffect(() => {
    getRequestedCertificates();
  }, []);

  return (
    <VStack
      w={"100%"}
      background={
        "linear-gradient(90deg, rgba(233,29,166,1) 0%, rgba(32,118,196,1) 100%)"
      }
      py={{ base: 5, lg: 0 }}
    >
      <Navbar />

      <Routes>
        <Route
          path=""
          element={<AllCertificates certificates={certificates} />}
        />
        <Route
          path="requests"
          element={<RequestedCertificates requests={requestedCertificates} />}
        />
        <Route
          path="approved"
          element={<ApprovedCertificates approves={approvedCertificates} />}
        />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="admin/:id" element={<EditCertificatePage />} />
      </Routes>
    </VStack>
  );
};

export default HomePage;
