import RadioCard from './RadioCard';
import { useRadioGroup, Image, Wrap } from "@chakra-ui/react"
import { agents } from "../../utils/constants";

export default function AgentRadioCardList({ agent, setAgent }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "agent",
    defaultValue: agent,
    onChange: (value) => {
      setAgent(value);
      console.log(`AGENT SET TO: ${value}`);
    },
  })

  const group = getRootProps()
  return (
    <Wrap {...group}>
      {agents.map(({ value, imgPath, disabled }) => {
        const radio = getRadioProps({ value })
        const imageStyles = disabled ? {
          filter: "grayscale(100%)"
        } : {};
        return (
          <RadioCard key={value} isDisabled={disabled} {...radio}>
            <Image src={imgPath} alt={value}
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