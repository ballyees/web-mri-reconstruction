import React, { useState } from "react";
import { Select, Grid, GridItem, Image, Tooltip, VStack, StackDivider, useBoolean, Box, Button, Skeleton, useToast } from '@chakra-ui/react'
import Config from "../config";
import ParametersTable from "./ParametersTable";

const regx = new RegExp(/.*base64,/);
const base64_format = 'data:image/png;base64,';
const config = Config()

const load_example_base64 = (path, params, setLoadingData, setLoadingResponse, setData, setResponse, toast) => {
  let url = `${config.baseURL}/v1/${params.method}/${params.speed}`
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const data = text.replace(regx, '');
    setData(data);
    setLoadingData.off()
    fetch(url, {
      method: "post",
      body: JSON.stringify({
        file: data
      })
    }).then(response => {
      if (response.ok){ return response.json()}
      else{ throw new Error("can't connect to api server") }
    }).then(data=>{
      toast({
        title: 'Prediction successful.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setResponse(data['response'])
      setLoadingResponse.off();
      
    })
    .catch((error) => {
      toast({
        title: 'Prediction fail.',
        description: "can't connect to api server",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      // setLoadingResponse.off();
    });
    
  };
  // load example image
  fetch(path)
  .then(response=>response.blob())
    .then(response=>reader.readAsDataURL(response))
};

export default function UploadFile() {
  const [imageSourceBase64, setImageSourceBase64] = useState('');
  const [imageResponseBase64, setImageResponseBase64] = useState('');
  const [speed, setSpeed] = useState('3x');
  const [method, setMethod] = useState('fast');
  const [imageID, SetImageID] = useState('0_compress.png');
  const [loadingSource, setLoadingSource] = useBoolean()
  const [loadingResponse, setLoadingResponse] = useBoolean()
  const toast = useToast()
  let params = {method: method, speed: speed}
  // console.log(process.env.NODE_ENV)
  return (
      <VStack divider={<StackDivider borderColor='gray.200' />} spacing={3}>
        <Grid templateColumns='repeat(4, 1fr)' gap={1} justifyItems="center">
        {/* <Grid templateColumns='repeat(3, 1fr)' gap={1} alignItems="baseline"> */}
          <GridItem>
            <Tooltip label='Speed up' fontSize='md'>
              <Select onChange={e=>setSpeed(e.target.value)}>
                <option value='3x'>3x</option>
                <option value='5x'>5x</option>
                <option value='8x'>8x</option>
              </Select>
            </Tooltip>
          </GridItem>
          <GridItem>
            <Tooltip label='Example number' fontSize='md'>
              <Select onChange={e=>SetImageID(e.target.value)}>
                {[...Array(12).keys()].map(index => <option key={`select-${index}`} value={`${index}_compress.png`}>{index}</option>)}
              </Select>
            </Tooltip>
          </GridItem><GridItem>
            <Tooltip label='Method' fontSize='md'>
              <Select onChange={e=>setMethod(e.target.value)}>
                <option value='fast'>fast</option>
                <option value='slow'>slow</option>
              </Select>
            </Tooltip>
          </GridItem>
          <GridItem>
            <Button colorScheme='teal' variant='outline' onClick={
              (e) => {
                setLoadingSource.on();
                setLoadingResponse.on();
                e.preventDefault();
                load_example_base64(process.env.PUBLIC_URL + `/example_data_api/${speed}/${imageID}`, params, setLoadingSource, setLoadingResponse, setImageSourceBase64, setImageResponseBase64, toast)
              }
            }>
              Submit
            </Button>
          </GridItem>
        </Grid>
        <Box borderRadius='md' color='black.700' p={4} >
        {(imageSourceBase64==='')?
          <ParametersTable />
          :
          <Grid templateColumns='repeat(2, 1fr)' gap={1} justifyItems="center">
            <GridItem>
            <Tooltip label="Compressed">
              <Skeleton isLoaded={!loadingSource} maxHeight={640} maxWidth={320}>
                  <Image src={base64_format + imageSourceBase64} />
              </Skeleton>
            </Tooltip>
            </GridItem>
            <GridItem>
            <Tooltip label={`Prediction on ${method} method`}>
              <Skeleton isLoaded={!loadingResponse} maxHeight={640} maxWidth={320}>
                  <Image src={base64_format + imageResponseBase64} />
              </Skeleton>
            </Tooltip>
            </GridItem>
          </Grid>
          }
        </Box>
      </VStack>
  )
}