import { useEffect, useRef, useState } from "react";
import { VStack, Box, Center, Image, Wrap, WrapItem, Heading, Spacer, useDisclosure } from '@chakra-ui/react';
// Custom Components
import RootLayout from "../components/RootLayout";
// Utilities
import { removeFileEnding } from '../utils/utils';

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

  useEffect(() => {
    setImgList(pathsObject[agent][map][attackDefense])
  }, [attackDefense, map, agent])

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
        <Wrap justify="center" align="center" spacing="30px">
          {imgList.map((imgPath, idx) => {
            const filename = imgPath.replace(/^.*[\\\/]/, '')
            return (
              <WrapItem key={`lineup-img-${idx}`} style={{ maxWidth: "600px" }}>
                <VStack>
                  <Image src={imgPath} alt="" />
                  <Heading as="h4" size="md" syle={{paddingTop: 0, marginTop: 0}}>{removeFileEnding(filename)}</Heading>
                </VStack>
              </WrapItem>
            )
          })}
        </Wrap>
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