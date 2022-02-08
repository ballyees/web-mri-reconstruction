import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Icon, IconButton, Link, Tooltip
  } from '@chakra-ui/react';
  import { FaGithub } from 'react-icons/fa';
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text></Text>
          <Stack direction={'row'} spacing={6}>
            <Link href='https://chakra-ui.com' isExternal>
                <Tooltip label="Github WEB">
                    <IconButton aria-label='github-web' icon={<Icon as={FaGithub}></Icon>} />
                </Tooltip>
            </Link>
            <Link href='https://github.com/ballyees/rest_api-mri-reconstruction' isExternal>
                <Tooltip label="Github API">
                    <IconButton aria-label='github-api' icon={<Icon as={FaGithub}></Icon>} />
                </Tooltip>
            </Link>
          </Stack>
        </Container>
      </Box>
    );
  }