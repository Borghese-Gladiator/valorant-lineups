import { useContext } from "react";
import { Grid, GridItem, Heading, Radio, RadioGroup, Stack, Box } from "@chakra-ui/react"
// Custom components
import AgentRadioCardList from './AgentRadioCardList';
import MapRadioCardList from './MapRadioCardList';
import SiteRadioCardList from "./SiteRadioCardList";
import GameDataContext from "../../context/GameDataContext";
import SiteDataContext from "../../context/SiteDataContext";

function AttackDefenseRadioBtns({ setAttackDefense, attackDefense }) {
  return (
    <RadioGroup onChange={setAttackDefense} value={attackDefense}>
      <Stack direction="row">
        <Radio value="attack">Attack</Radio>
        <Radio value="defend">Defend</Radio>
      </Stack>
    </RadioGroup>
  )
}

export default function GameForm() {
  const { gameData, setGameData } = useContext(GameDataContext);
  const { siteData, setSiteData } = useContext(SiteDataContext);
  const setAttackDefense = (newAttackDefense) => setGameData({ ...gameData, attackDefense: newAttackDefense });
  const setMap = (newMap) => setGameData({ ...gameData, map: newMap })
  const setAgent = (newAgent) => setGameData({ ...gameData, agent: newAgent })
  const setSite = (newSite) => setSiteData(newSite);
  return (
    <Grid
      h="200px"
      templateRows="repeat(3, 10fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      <GridItem colSpan={2}>
        <Heading as="h4" size="md">
          Map
        </Heading>
        <Box p={1}>
          <MapRadioCardList map={gameData.map} setMap={setMap} setSite={setSiteData} />
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Heading as="h4" size="md">
          Position
        </Heading>
        <Box p={1}>
          <AttackDefenseRadioBtns attackDefense={gameData.attackDefense} setAttackDefense={setAttackDefense} />
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Heading as="h4" size="md">
          Site
        </Heading>
        <Box p={1}>
          <SiteRadioCardList attackDefense={gameData.attackDefense} site={siteData} map={gameData.map} setSite={setSite} />
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Heading as="h4" size="md">
          Agents
        </Heading>
        <Box p={1}>
          <AgentRadioCardList agent={gameData.agent} setAgent={setAgent} />
        </Box>
      </GridItem>
    </Grid>
  )
}