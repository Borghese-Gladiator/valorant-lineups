import { useRef, useState, useEffect } from "react";
import { Container, Box, Center, Image, Wrap, WrapItem, Heading, useDisclosure } from '@chakra-ui/react';
// Custom Components
import RootLayout from "../components/RootLayout";
import { capitalizeFirstLetter } from '../utils/utils';

export default function HomePage() {
  // Sidebar data
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // Filter Game Form data
  const [attackDefense, setAttackDefense] = useState("attack");
  const [map, setMap] = useState("ascent");
  const [agent, setAgent] = useState("viper");

  // Main Display
  const [imgList, setImgList] = useState([
    "/img/lineups/viper/ascent/attack/a-smoke-end.png",
    "/img/lineups/viper/ascent/attack/a-smoke-start.png",
    "/img/lineups/viper/ascent/attack/a-wall.png",
    "/img/lineups/viper/ascent/attack/b-smoke.png",
    "/img/lineups/viper/ascent/attack/b-wall.png",
    "/img/lineups/viper/ascent/attack/catwalk-wall.png",
    "/img/lineups/viper/ascent/attack/mid-wall.png"
  ]);

  const clickFilter = () => {
    const url = "/api/pathfinder";
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
        <main>
          <Center>
            <Heading as="h4" size="md">
              {capitalizeFirstLetter(map)}
            </Heading>
            <Wrap justify="center" align="center">
              {imgList.map((imgPath, idx) => {
                return (
                  <WrapItem key={`lineup-img-${idx}`} style={{ maxWidth: "600px" }}>
                    <Image src={imgPath} alt="" />
                  </WrapItem>
                )
              })}
            </Wrap>
          </Center>
        </main>
      </Box>
    </RootLayout>
  )
}