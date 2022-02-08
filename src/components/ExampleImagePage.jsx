import React, { useState } from "react";
import { Stack, Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, } from '@chakra-ui/react'
import ImageExampleData from "./ImageExampleData";

export default function ExampleImagePage(props) {
  let speed = props.speedup
  const base_path = process.env.PUBLIC_URL + `/example_data_api/${speed}/`
  const [value, setValue] = useState(1)
  const handleChange = (value) => setValue(parseInt(value))
  
  return (
    <Stack>
      <Flex>
        <NumberInput maxW='100px' mr='2rem' value={value} onChange={handleChange} max={12} min={1} >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper/>
            <NumberDecrementStepper/>
          </NumberInputStepper>
        </NumberInput>
        <Slider
          flex='1'
          focusThumbOnChange={false}
          value={value}
          min={1}
          max={12}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize='sm' boxSize='32px' children={value} />
        </Slider>
      </Flex>
      {
        [...Array(value).keys()].map(
          index => {
            return (
                <ImageExampleData paths={[
                  base_path+`${index}.png`,
                  base_path+`${index}_compress.png`,
                  base_path+`${index}_fast.png`,
                  base_path+`${index}_slow.png`]} key={`${speed}-${index}`} id={index}
                />
            )}
          )
      }
    </Stack>
  )
}