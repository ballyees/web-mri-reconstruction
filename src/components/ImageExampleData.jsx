import React from "react";
import { Image, Grid, GridItem, Tooltip, Box } from '@chakra-ui/react'

export default function ImageExampleData(props) {
	let gt = props.paths[0]
	let compress = props.paths[1]
	let fast = props.paths[2]
	let slow = props.paths[3]
	let id = props.id
  return (
		<Box>
    <Grid templateColumns='repeat(4, 1fr)' gap={1} justifyItems="center">
      <Tooltip label={`Ground truth (id: ${id})`}>
        <GridItem>
					<Image src={gt}/>
        </GridItem>
      </Tooltip>
      <Tooltip label={`Compressed (id: ${id})`}>
        <GridItem>
				<Image src={compress}/>
        </GridItem>
      </Tooltip >
      <Tooltip label={`Prediction on fast method (id: ${id})`}>
        <GridItem>
				<Image src={fast}/>
        </GridItem>
      </Tooltip>
      <Tooltip label={`Prediction on slow method (id: ${id})`}>
        <GridItem>
				<Image src={slow}/>
        </GridItem>
      </Tooltip>
    </Grid>
		</Box>
  )
}