import { useRadioGroup, HStack, Radio } from "@chakra-ui/react"
import { siteDict } from "../../utils/constants";

export default function SiteRadioCardList({ map, setSite }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "site",
    defaultValue: "A",
    onChange: (value) => {
      setSite(value);
      console.log(value);
    }
  })

  const group = getRootProps();
  return (
    <HStack {...group}>
      {siteDict[map].map((value) => {
        const radio = getRadioProps({ value })
        return (
          <Radio key={value} value={value} {...radio}>{value}</Radio>
        )
      })}
    </HStack>
  )
}