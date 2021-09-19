import { useRef, useState } from "react";
import { VStack, Box, Center, Image, Wrap, WrapItem, Heading, useDisclosure } from '@chakra-ui/react';
// Custom Components
import RootLayout from "../components/RootLayout";
import { capitalizeFirstLetter, getImagesConstant, removeFileEnding } from '../utils/utils';

export default function HomePage({ pathsObject }) {
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
    setImgList(pathsObject[agent][map][attackDefense])
    /*
    const url = "/api/pathfinder";
    fetch(`${url}?map=${map}&agent=${agent}&attackDefense=${attackDefense}`)
      .then(response => response.json())
      .then(data => {
        setImgList(data);
      });
    */
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
          </Center>
          <Wrap justify="center" align="center">
            {imgList.map((imgPath, idx) => {
              const filename = imgPath.replace(/^.*[\\\/]/, '')
              return (
                <WrapItem key={`lineup-img-${idx}`} style={{ maxWidth: "600px" }}>
                  <VStack>
                    <Image src={imgPath} alt="" />
                    <Heading as="h4" size="md">{removeFileEnding(filename)}</Heading>
                  </VStack>
                </WrapItem>
              )
            })}
          </Wrap>
        </main>
      </Box>
    </RootLayout>
  )
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const getDirectories = source => {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  }
  // recursively builds pathsObject
  const recBuildObject = (obj, fullPath) => {
    const dirList = getDirectories(fullPath).map((directory, idx) => {
      obj[directory] = recBuildObject({}, path.join(fullPath, directory))
    })
    if (dirList.length === 0) {
      // BASE CASE - no subdirectories left
      const imgList = fs.readdirSync(fullPath).map((filename, idx) => {
        const imgStaticPath = fullPath.split('public')[1] // Next.js loads from /img/llineups...
        return path.join(imgStaticPath, filename)
      })
      return imgList
    }
    return obj
  }
  const lineupsDir = path.join(process.cwd(), 'public', 'img', 'lineups')
  const pathsObject = recBuildObject({}, lineupsDir);

  return {
    props: {
      pathsObject,
    },
  }
}