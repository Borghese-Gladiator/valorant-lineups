import { useRadioGroup, HStack, Radio } from "@chakra-ui/react"

const siteDict = {
  "ascent": ["A", "B", "MID"],
  "bind": ["A", "B"],
  "breeze": ["A", "B", "MID"],
  "fracture":["A", "B"],
  "haven": ["A", "B", "C"],
  "icebox": ["A", "B", "MID"],
  "split": ["A", "B", "MID"]
};

export default function SiteRadioCardList({ map }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "map",
    defaultValue: "A",
    onChange: (value) => console.log(value),
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