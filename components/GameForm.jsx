import { useState } from "react";
import { Grid, GridItem, Heading, Radio, RadioGroup, Stack, Box } from "@chakra-ui/react"
// Custom components
import AgentList from './AgentList';

export default function GameForm() {
  const [attackDefense, setAttackDefense] = useState("ATTACK");
  const [site, setSite] = useState("A");

  return (
    <div>
      <Grid
        h="200px"
        templateRows="repeat(2, 10fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Box p={1}>
            <Heading as="h4" size="md">
              Side
            </Heading>
            <RadioGroup onChange={setAttackDefense} value={attackDefense}>
              <Stack direction="row">
                <Radio value="ATTACK">Attack</Radio>
                <Radio value="DEFENSE">Defense</Radio>
                <Radio value="ALL">All</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="papayawhip" >
          <Box p={1}>
            <Heading as="h4" size="md">
              Site
            </Heading>
            <RadioGroup onChange={setSite} value={site}>
              <Stack direction="row">
                <Radio value="A">A</Radio>
                <Radio value="B">B</Radio>
                <Radio value="C">C</Radio>
                <Radio value="ALL">All</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </GridItem>
        <GridItem colSpan={4}>
          <Heading as="h4" size="md">
            Agents
          </Heading>
          <AgentList />
        </GridItem>
      </Grid>
    </div>
  )
}