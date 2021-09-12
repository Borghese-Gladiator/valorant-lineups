import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input
} from "@chakra-ui/react";
// Custom Components
import GameForm from "./GameForm";

export default function DrawerExample({ isOpen, onClose, btnRef }) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent style={{background: "#93B5C6"}}>
          <DrawerCloseButton />
          <DrawerHeader>Select</DrawerHeader>

          <DrawerBody>
            <GameForm />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Apply</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}