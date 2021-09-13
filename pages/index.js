import { useRef, useState, useEffect } from "react";
import { Container, Box, Image, useDisclosure } from '@chakra-ui/react';
// Custom Components
import RootLayout from "../components/RootLayout";
// API
import useSwr from 'swr';

export default function HomePage() {
  // Sidebar data
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // Filter Game Form data
  const [attackDefense, setAttackDefense] = useState("attack");
  const [map, setMap] = useState("ascent");
  const [agent, setAgent] = useState("viper");

  // Main Display
  const [imgList, setImgList] = useState([]);

  // Fetch Data
  const fetcher = (url) => {
    fetch(`${url}?map=${map}&agent=${agent}&attackDefense=${attackDefense}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setImgList(data);
      });
  }
  const { data, error } = useSwr('/api/pathfinder', fetcher);

  if (error) return (
    <RootLayout
      btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose}
      attackDefense={attackDefense}
      setAttackDefense={setAttackDefense}
      map={map}
      setMap={setMap}
      agent={agent}
      setAgent={setAgent}
    >
      Failed to load images
    </RootLayout>
  )
  if (!data) return (
    <RootLayout
      btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose}
      attackDefense={attackDefense}
      setAttackDefense={setAttackDefense}
      map={map}
      setMap={setMap}
      agent={agent}
      setAgent={setAgent}
    >
      Loading...
    </RootLayout>
  )

  return (
    <RootLayout
      btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose}
      attackDefense={attackDefense}
      setAttackDefense={setAttackDefense}
      map={map}
      setMap={setMap}
      agent={agent}
      setAgent={setAgent}
    >
      <Box p={8}>
        <Container maxW="xl" centerContent>
          <main>
            {imgList.map((val, idx) => {
              <Image src={val} alt="" />
            })}
          </main>
        </Container>
      </Box>
    </RootLayout>
  )
}