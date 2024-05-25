import { Button, IconButton } from '@chakra-ui/button';
import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import { AiOutlineMenu } from 'react-icons/ai';

import useUserStore from 'stores/useUserStore';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';
import { ColorModeSwitcher } from 'ColorModeSwitcher';

import Link from './Link';

type NavbarProps = {
  onOpen: () => void;
};

function Navbar({ onOpen }: NavbarProps) {
  const { removeUser } = useUserStore();

  return (
    <Box borderBottom="1px solid " borderColor="gray.200" py={3}>
      <Container maxW="container.2xl">
        <Flex justify="space-between" align="center" width="100%">
          <Flex
            justify={['space-between', 'space-between', 'flex-start']}
            width={['100%', '100%', 'fit-content']}
          >
            <Flex alignItems="center">
              <IconButton
                aria-label="Main Drawer"
                onClick={onOpen}
                icon={<AiOutlineMenu />}
                display={['inherit', 'inherit', 'none', 'none']}
              />
              <Link to={paths.home}>
                <Heading ml={2} as="h6" fontSize="2xl">
                  Leave
                </Heading>
              </Link>
            </Flex>
            <Box>
              <Button
                ml="4"
                onClick={e => {
                  e.preventDefault();
                  removeUser();
                }}
              >
                Log Out
              </Button>
              <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
          </Flex>
          <Flex align="center" flexGrow="0">
            <Flex display={['none', 'none', 'block']}>
              <Link to={createRoute([paths.leave])} ml={4}>
                Leave
              </Link>
              <Link to={createRoute([paths.leave, paths.apply])} ml={4}>
                Apply Leave
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
