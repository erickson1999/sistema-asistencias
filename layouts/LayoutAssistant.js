import React from "react";
import Head from "next/head";
import { NavbarAssistant } from "../components/Navbar/NavbarAssistant";
import { FooterGuest } from "../components/Footer/FooterGuest";
import { Box } from "@chakra-ui/react";
export const LayoutAssistant = ({ children }) => {
  return (
    <>
      <Head>
        <title>Asistente || Dashboard</title>
      </Head>
      <NavbarAssistant height="10%" width="100%"></NavbarAssistant>
      <Box height="auto" width="100%">{children}</Box>
      <FooterGuest height="40px" width="100%"></FooterGuest>
    </>
  );
};
