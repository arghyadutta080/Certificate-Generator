import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { requestedCertificate } from "../../../pages/HomePage";
import PendingRequests from "./PendingRequests";
import ApprovedRequests from "./ApprovedRequests";


const AdminPanel: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<
    requestedCertificate[]
  >([]);
  const [approvedRequests, setApprovedRequests] = useState<
    requestedCertificate[]
  >([]);

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

  useEffect(() => {
    getIssuCertificateList();
  }, []);

  return (
    <Flex
      minH={"90vh"}
      w={{ base: "95%", lg: "85%" }}
      py={5}
      mt={{ base: 10, lg: 20 }}
    >
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        align="center"
        w={"full"}
      >
        <TabList>
          <Tab fontSize={20} color={"white"}>
            Pending Requests
          </Tab>
          <Tab fontSize={20} color={"white"}>
            Approved Requests
          </Tab>
          <Tab fontSize={20} color={"white"}>
            Add Certificate
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
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default AdminPanel;
