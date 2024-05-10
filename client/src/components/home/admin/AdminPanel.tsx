import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { requestedCertificate } from "../../../pages/HomePage";
import PendingRequests from "./pendingRequest/PendingRequests";
import ApprovedRequests from "./ApprovedRequests";
import { FaRegClock, FaPlus } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import AddRequests from "./AddRequests";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPanel: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<
    requestedCertificate[]
  >([]);
  const [approvedRequests, setApprovedRequests] = useState<
    requestedCertificate[]
  >([]);

  const context = useContext(AuthContext);
  const { user } = context;

  const getIssuCertificateList = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/manage-certificate/admin/get-requests",
        {
          withCredentials: true,
        }
      );
      const requests: requestedCertificate[] = data.requests.filter(
        (request: requestedCertificate) => {
          return request.state === "pending";
        }
      );
      setPendingRequests(requests);
      const approved: requestedCertificate[] = data.requests.filter(
        (request: requestedCertificate) => {
          return request.state === "approved";
        }
      );
      setApprovedRequests(approved);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    user?.role !== "admin" && navigate("/");
  }, [])

  useEffect(() => {
    getIssuCertificateList();
  }, []);

  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "95%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
      zIndex={0}
    >
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        align="center"
        w={"full"}
      >
        <TabList>
          <Tab fontSize={20} color={"white"}>
            <FaRegClock />
            <Box ml={2}>Pending Requests</Box>
          </Tab>
          <Tab fontSize={20} color={"white"} alignItems={"center"}>
            <IoCheckmarkDoneSharp size={25} />
            <Box ml={1}>Approved Requests</Box>
          </Tab>
          <Tab fontSize={20} color={"white"}>
            <FaPlus />
            <Box ml={2}>Add Certificate</Box>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PendingRequests requests={pendingRequests} />
          </TabPanel>
          <TabPanel>
            <ApprovedRequests approvals={approvedRequests} />
          </TabPanel>
          <TabPanel>
            <AddRequests />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AdminPanel;
