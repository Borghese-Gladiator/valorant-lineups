import { useState } from "react";
import { Grid, GridItem, Heading, Radio, RadioGroup, Stack, Box } from "@chakra-ui/react"
// Custom components
import AgentRadioCardList from './AgentRadioCardList';
import MapRadioCardList from './MapRadioCardList';
import SiteRadioCardList from "./SiteRadioCardList";

export default function GameForm({ attackDefense, setAttackDefense, map, setMap, agent, setAgent }) {
  return (
    <div>
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
          <MapRadioCardList setMap={setMap} />
        </GridItem>
        <GridItem colSpan={1}>
          <Box p={1}>
            <Heading as="h4" size="md">
              Position
            </Heading>
            <RadioGroup onChange={setAttackDefense} value={attackDefense}>
              <Stack direction="row">
                <Radio value="attack">Attack</Radio>
                <Radio value="defend">Defend</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Heading as="h4" size="md">
            Site
          </Heading>
          <SiteRadioCardList map={map} />
        </GridItem>
        <GridItem colSpan={2}>
          <Heading as="h4" size="md">
            Agents
          </Heading>
          <AgentRadioCardList setAgent={setAgent} />
        </GridItem>
      </Grid>
    </div>
  )
}