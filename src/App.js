import React from "react";
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'
import UploadFile from "./components/UploadFile";
import ExampleImagePage from "./components/ExampleImagePage";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Container color='gray.500' pt={10} maxW='container.xl'>
      <Tabs variant='soft-rounded'>
        <TabList>
          <Tab>Example on 3x</Tab>
          <Tab>Example on 5x</Tab>
          <Tab>Example on 8x</Tab>
          <Tab>Test on example</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ExampleImagePage speedup="3x"/>
          </TabPanel>
          <TabPanel>
            <ExampleImagePage speedup="5x"/>
          </TabPanel>
          <TabPanel>
            <ExampleImagePage speedup="8x"/>
          </TabPanel>
          <TabPanel>
            <UploadFile/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box h={100}></Box>
      <Footer />
    </Container>
  )
}