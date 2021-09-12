// REQUIRED to use prop "value" as opposed to any other key like "name"

import { useRadio, useRadioGroup, Box, Image, Wrap, WrapItem } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <WrapItem>
      <Box as="label" style={{background: "#C9CCD5"}}>
        <input {...input} />
        <Box
          {...checkbox}
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    </WrapItem>
  )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function Example() {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "viper",
    onChange: (value) => console.log(value),
  })

  const group = getRootProps()

  return (
    <Wrap {...group}>
      {[
        { value: "astra", imgPath: "/img/agents/icons/Astra_icon.png" },
        { value: "breach", imgPath: "/img/agents/icons/Breach_icon.png" },
        { value: "brimstone", imgPath: "/img/agents/icons/Brimstone_icon.png" },
        { value: "cypher", imgPath: "/img/agents/icons/Cypher_icon.png" },
        { value: "jett", imgPath: "/img/agents/icons/Jett_icon.png" },
        { value: "kayo", imgPath: "/img/agents/icons/Kayo_icon.png" },
        { value: "killjoy", imgPath: "/img/agents/icons/Killjoy_icon.png" },
        { value: "omen", imgPath: "/img/agents/icons/Omen_icon.png" },
        { value: "phoenix", imgPath: "/img/agents/icons/Phoenix_icon.png" },
        { value: "raze", imgPath: "/img/agents/icons/Raze_icon.png" },
        { value: "reyna", imgPath: "/img/agents/icons/Reyna_icon.png" },
        { value: "sage", imgPath: "/img/agents/icons/Sage_icon.png" },
        { value: "skye", imgPath: "/img/agents/icons/Skye_icon.png" },
        { value: "sova", imgPath: "/img/agents/icons/Sova_icon.png" },
        { value: "viper", imgPath: "/img/agents/icons/Viper_icon.png" },
        { value: "yoru", imgPath: "/img/agents/icons/Yoru_icon.png" }
      ].map(({ value, imgPath }) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            <Image src={imgPath} alt="" />
          </RadioCard>
        )
      })}
    </Wrap>
  )
}