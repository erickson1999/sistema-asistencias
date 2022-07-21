import React from "react";
import Head from "next/head";
import { NavbarAdmin } from "../components/Navbar/NavbarAdmin";
import { FooterGuest } from "../components/Footer/FooterGuest";
import { Box } from "@chakra-ui/react";
export const LayoutAdmin = ({ children }) => {
  return (
    <>
      <Head>
        <title>Admin || Dashboard</title>
      </Head>
      <NavbarAdmin height="10%" width="100%"></NavbarAdmin>
      <Box height="auto" width="100%">
        {children}
      </Box>
      <FooterGuest height={"40px"} width="100%"></FooterGuest>
    </>
  );
};
