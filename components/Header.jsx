import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  useColorModeValue,
  Image,
  Heading
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../utils/utils';

const Links = [];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Header({ btnRef, onOpen, map, attackDefense, agent }) {
  
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <HStack>
            <Image src="/img/valorant_logo.png" alt="" style={{ height: "36px" }} />
            <Heading as="h3" size="lg">
              Valorant Lineups
            </Heading>
          </HStack>
          <Button
            variant={'solid'}
            colorScheme={'teal'}
            size={'sm'}
            mr={4}
            ref={btnRef}
            onClick={onOpen}
          >
            Select Lineup
          </Button>
        </HStack>
        <Flex alignItems={'center'}>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
            
        
          <Heading as="h4" size="md">
            {capitalizeFirstLetter(map)}
          </Heading>
          <Heading as="h4" size="md">
            {capitalizeFirstLetter(attackDefense)}
          </Heading>
          <Heading as="h4" size="md">
            {capitalizeFirstLetter(agent)}
          </Heading>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}