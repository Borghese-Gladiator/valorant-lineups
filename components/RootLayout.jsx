import Header from "./Header";
import GameForm from "./GameForm";
import { Container, Box } from '@chakra-ui/react';

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />
      <Box p={8}>
        <GameForm />
        <Container maxW="xl" centerContent>
          There are many benefits to a joint design and development system. Not only
          does it bring benefits to the design team.

          <main>
            {children}
          </main>
        </Container>
      </Box>
    </div>
  )
}