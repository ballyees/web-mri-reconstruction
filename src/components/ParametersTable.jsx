import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption, } from '@chakra-ui/react'

const defaultTable = {
  columns: ['Option Name', 'Default', 'Option'],
  rows: [
    {'Option Name': `Speed up`, 'Default': `3x`, 'Option': `3x, 5x, 8x`},
    {'Option Name': `Example number`, 'Default': `0`, 'Option': `range [0, 11]`},
    {'Option Name': `Method`, 'Default': `fast`, 'Option': `fast, slow`},
  ]
}

export default function ParametersTable(props) {
  let columns = props.columns || defaultTable.columns
  let rows = props.rows || defaultTable.rows
  return (
		<Table variant='simple' size="lg">
      <TableCaption>{props.caption}</TableCaption>
      <Thead>
        <Tr>
          {columns.map( col=><Th key={col}>{col}</Th> )}
          {/* <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th> */}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map(
          (r, idx)=>(
            <Tr key={`row-${idx}`}>
              {columns.map( (col, cidx)=><Td key={`row-${idx}-${cidx}`}>{r[col]}</Td> )}
            </Tr>
          )
        )}
      </Tbody>
    </Table>
  )
}