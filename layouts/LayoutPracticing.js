import React from "react";
import Head from "next/head";
import { NavbarPracticing } from "../components/Navbar/NavbarPracticing";
import { FooterGuest } from "../components/Footer/FooterGuest";
import { Box } from "@chakra-ui/react";
export const LayoutPracticing = ({ children }) => {
  return (
    <>
      <Head>
        <title>Practicante || Dashboard</title>
      </Head>
      <NavbarPracticing height="10%" width="100%"></NavbarPracticing>
      <Box height="auto" width="100%">
        {children}
      </Box>
      <FooterGuest height="40px" width="100%"></FooterGuest>
    </>
  );
};
