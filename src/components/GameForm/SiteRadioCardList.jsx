import { HStack, Radio, RadioGroup } from "@chakra-ui/react"
import { siteDict } from "../../utils/constants";

export default function SiteRadioCardList({ site, map, setSite }) {
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