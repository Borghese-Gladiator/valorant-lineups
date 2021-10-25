import { HStack, Radio, RadioGroup, Text } from "@chakra-ui/react"
import { siteDict } from "../../utils/constants";

export default function SiteRadioCardList({ attackDefense, site, map, setSite }) {
  if (attackDefense === "defend") {
    return (
      <Text fontSize="md">No defense site selection</Text>
    )
  } else {
    return (
      <RadioGroup onChange={setSite} value={site}>
        <HStack>
          {siteDict[map].map((value) => {
            // const radio = getRadioProps({ value })
            return (
              <Radio key={value} value={value}>{value}</Radio>
            )
          })}
        </HStack>
      </RadioGroup>
    );
  }
}