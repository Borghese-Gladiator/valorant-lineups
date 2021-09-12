import React from "react";
import { Container, Box, useDisclosure } from '@chakra-ui/react';
// Custom Components
import Header from "./Header";
import GameForm from "./GameForm";
import Sidebar from "./Sidebar";

export default function RootLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <Header btnRef={btnRef} onOpen={onOpen} />
      <Sidebar btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Box p={8}>
        <Container maxW="xl" centerContent>
          <main>
            {children}
          </main>
        </Container>
      </Box>
    </div>
  )
}