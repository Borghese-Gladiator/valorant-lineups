// REQUIRED to use prop "value" as opposed to any other key like "name"

import { useRadio, useRadioGroup, Box, Image, Wrap, WrapItem, Heading } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <WrapItem>
      <Box as="label">
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
export default function Example({ setMap }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (value) => {
      setMap(value);
      console.log(value)
    },
  })

  const group = getRootProps()

  return (
    <Wrap {...group}>
      {[
        { value: "ascent", imgPath: "/img/maps/ascent.jpg" },
        { value: "bind", imgPath: "/img/maps/bind.jpg" },
        { value: "breeze", imgPath: "/img/maps/breeze.jpg" },
        { value: "fracture", imgPath: "/img/maps/fracture.jpg" },
        { value: "haven", imgPath: "/img/maps/haven.jpg" },
        { value: "icebox", imgPath: "/img/maps/icebox.jpg" },
        { value: "split", imgPath: "/img/maps/split.jpg" }
      ].map(({ value, imgPath }) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
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