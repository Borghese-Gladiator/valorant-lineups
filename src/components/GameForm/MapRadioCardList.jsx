import { useRadioGroup, Image, Wrap, Heading } from "@chakra-ui/react"
import RadioCard from './RadioCard';
import { maps } from "../../utils/constants";

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function MapRadioCardList({ setMap }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "map",
    defaultValue: "ascent",
    onChange: (value) => {
      setMap(value);
      console.log(`MAP SET TO: ${value}`);
    },
  })

  const group = getRootProps()
  return (
    <Wrap {...group}>
      {maps.map(({ value, imgPath }) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} isDisabled={false} {...radio}>
            <Image src={imgPath} alt="" style={{maxWidth: 100}} />
            <Heading as="h6" size="xs" style={{ textTransform: 'capitalize' }}>
              {value}
            </Heading>
          </RadioCard>
        )
      })}
    </Wrap>
  )
}