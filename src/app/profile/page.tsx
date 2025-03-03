import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

const AccountPage = () => {
  return (
    <Container maxW="container.sm" p={4}>
      {/* Profile Header */}
      <Stack spacing={4} mb={8}>
        <Avatar
          size="xl"
          name="Chanaka Prasanna"
          src="/profile-image.jpg"
          mb={4}
        />
        <Heading size="md">Chanaka Prasanna</Heading>
        <Text fontSize="sm" color="gray.500">
          @chanaka-prasanna
        </Text>

        <Flex gap={4} mb={4}>
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold">
              0
            </Text>{" "}
            following
          </Text>
          <Text fontSize="sm">
            <Text as="span" fontWeight="bold">
              0
            </Text>{" "}
            followers
          </Text>
        </Flex>

        <Button variant="outline" size="sm">
          Edit profile
        </Button>
      </Stack>

      {/* Profile Navigation */}
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab _selected={{ color: "blue.500", borderColor: "blue.500" }}>
            Trips 0
          </Tab>
          <Tab>Saved 0</Tab>
          <Tab>Guides 0</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Trip Planning Section */}
            <VStack spacing={6} py={8}>
              <Text fontSize="lg" fontWeight="bold">
                Plan a new trip
              </Text>

              <FormControl>
                <FormLabel>Travel Dates</FormLabel>
                <Flex gap={2}>
                  <Input type="date" placeholder="Start date" />
                  <Text>to</Text>
                  <Input type="date" placeholder="End date" />
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel>Travelers</FormLabel>
                <Select placeholder="Number of travelers">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "person" : "people"}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Budget Range</FormLabel>
                <Flex gap={2} align="center">
                  <Input placeholder="$ From" type="number" />
                  <Text>to</Text>
                  <Input placeholder="$ To" type="number" />
                </Flex>
              </FormControl>

              <Button colorScheme="blue" w="full">
                Plan a new trip
              </Button>

              <Text textAlign="center" color="gray.500" mt={4}>
                Ready to start your next travel adventure?
              </Text>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AccountPage;
