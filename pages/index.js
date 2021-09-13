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
  
  const clickFilter = () => {
    const url = "/api/pathfinder";
    const map = "bind";
    fetch(`${url}?map=${map}&agent=${agent}&attackDefense=${attackDefense}`)
      .then(response => response.json())
      .then(data => {
        setImgList(data);
      });
  }

  return (
    <RootLayout
      btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose}
      clickFilter={clickFilter}
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
            {imgList.map((imgPath, idx) => {
              return (
                <Image src={imgPath} alt="" key={`lineup-img-${idx}`}/>
              )
            })}
          </main>
        </Container>
      </Box>
    </RootLayout>
  )
}