// REQUIRED to use prop "value" as opposed to any other key like "name"

import { useRadio, useRadioGroup, Box, Image, Wrap, WrapItem } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { isDisabled } = props
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <WrapItem>
      <Box as="label"
        style={isDisabled ? {
          background: "#6c757d",
          borderColor: "#6c757d"
        } : {
          background: "#C9CCD5",
          borderColor: "#C9CCD5"
        }}
      >
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
export default function AgentRadioCardList({ setAgent }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "viper",
    onChange: (value) => {
      setAgent(value);
      console.log(`AGENT SET TO: ${value}`);
    },
  })

  const group = getRootProps()

  return (
    <Wrap {...group}>
      {[
        { value: "astra", imgPath: "/img/agents/icons/Astra_icon.png", disabled: false },
        { value: "breach", imgPath: "/img/agents/icons/Breach_icon.png", disabled: true },
        { value: "brimstone", imgPath: "/img/agents/icons/Brimstone_icon.png", disabled: false },
        { value: "cypher", imgPath: "/img/agents/icons/Cypher_icon.png", disabled: true },
        { value: "jett", imgPath: "/img/agents/icons/Jett_icon.png", disabled: true },
        { value: "kayo", imgPath: "/img/agents/icons/KAYO_icon.png", disabled: true },
        { value: "killjoy", imgPath: "/img/agents/icons/Killjoy_icon.png", disabled: true },
        { value: "omen", imgPath: "/img/agents/icons/Omen_icon.png", disabled: true },
        { value: "phoenix", imgPath: "/img/agents/icons/Phoenix_icon.png", disabled: true },
        { value: "raze", imgPath: "/img/agents/icons/Raze_icon.png", disabled: true },
        { value: "reyna", imgPath: "/img/agents/icons/Reyna_icon.png", disabled: true },
        { value: "sage", imgPath: "/img/agents/icons/Sage_icon.png", disabled: true },
        { value: "skye", imgPath: "/img/agents/icons/Skye_icon.png", disabled: true },
        { value: "sova", imgPath: "/img/agents/icons/Sova_icon.png", disabled: true },
        { value: "viper", imgPath: "/img/agents/icons/Viper_icon.png", disabled: false },
        { value: "yoru", imgPath: "/img/agents/icons/Yoru_icon.png", disabled: true }
      ].map(({ value, imgPath, disabled }) => {
        const radio = getRadioProps({ value })
        const imageStyles = disabled ? {
          filter: "grayscale(100%)"
        } : {};
        return (
          <RadioCard key={value} isDisabled={disabled} {...radio}>
            <Image src={imgPath}yalt={value}
              style={{
                ...imageStyles,
                width: "20px",
                height: "20px",
              }}
            />
          </RadioCard>
        )
      })}
    </Wrap>
  )
}