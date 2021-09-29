import { useRadio, Box, WrapItem } from "@chakra-ui/react"

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

export default RadioCard