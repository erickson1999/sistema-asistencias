import React from "react";
import Head from "next/head";
import { NavbarGuest } from "../components/Navbar/NavbarGuest";
import { FooterGuest } from "../components/Footer/FooterGuest";
import { Box } from "@chakra-ui/react";
export const LayoutGuest = ({ children }) => {
  return (
    <>
      <Head>
        <title>Asistencias App</title>
      </Head>
      <NavbarGuest width="100%" height="10%"></NavbarGuest>
      <Box height="auto" width="100%">
        {children}
      </Box>
      <FooterGuest height={"40px"}></FooterGuest>
    </>
  );
};
