import { useEffect, useRef, useState } from "react";
import { useDisclosure, VStack, Box, Center, Image, Wrap, WrapItem, Heading, StackDivider } from '@chakra-ui/react';
// Custom Components
import RootLayout from "../src/components/RootLayout";
// Utilities
import GameDataContext from "../src/context/GameDataContext";
import { splitImgListBySitePrefix, removeFileEnding } from '../src/utils/utils';

export default function HomePage({ pathsObject }) {
  // Sidebar data
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // Filter Game Form data
  const [gameData, setGameData] = useState({
    attackDefense: "attack",
    map: "ascent",
    agent: "viper"
  })

  // Main Display
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    const agent = gameData.agent
    const map = gameData.map
    const attackDefense = gameData.attackDefense
    setImgList(pathsObject[agent][map][attackDefense])
  }, [gameData])

  return (
    <GameDataContext.Provider value={{ gameData, setGameData }}>
      <RootLayout
        btnRef={btnRef} onOpen={onOpen} isOpen={isOpen} onClose={onClose}
      >
        <Box p={8} style={{
          backgroundColor: "#e5e5f7",
          backgroundImage: "radial-gradient(#444cf7 1px, #e5e5f7 1px)",
          backgroundSize: "20px 20px"
        }}>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {splitImgListBySitePrefix(imgList).map(({ siteName, siteImgList }, idx) => {
              return (
                <Box key={`site-${idx}`}>
                  <Center><Heading as="h2" size="xl">{siteName.toUpperCase()}</Heading></Center>
                  <Wrap justify="center" align="center" spacing="30px">
                    {
                      siteImgList.map((imgPath, idx) => {
                        const filename = imgPath.replace(/^.*[\\\/]/, '')
                        return (
                          <WrapItem key={`lineup-img-${idx}`} style={{ maxWidth: "600px" }}>
                            <VStack>
                              <Image src={imgPath} alt="" />
                              <Heading as="h4" size="md" syle={{ paddingTop: 0, marginTop: 0 }}>{removeFileEnding(filename)}</Heading>
                            </VStack>
                          </WrapItem>
                        )
                      })
                    }
                  </Wrap>
                </Box>
              )
            })}
          </VStack>
        </Box>
      </RootLayout>
    </GameDataContext.Provider>
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
  // recursively builds pathsObject ( eg: { "viper": { "ascent": { "attack": ["/viper/ascent/attack/a-site.png"] }}} )
  const recBuildObject = (obj, fullPath) => {
    const dirList = getDirectories(fullPath).map((directory, idx) => {
      obj[directory] = recBuildObject({}, path.join(fullPath, directory))
    })
    if (dirList.length === 0) {
      // BASE CASE - no subdirectories left
      const imgList = fs.readdirSync(fullPath).map((filename, idx) => {
        const imgStaticPath = fullPath.split('public')[1] // Next.js loads from /img/lineups...path etc.
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