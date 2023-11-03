import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  SelectProps,
  Text,
} from '@chakra-ui/react'

export type SelectOption = {
  value: string
  label: string
}

export type SelectInputControlProps = {
  id: string
  label: string
  placeholder?: string
  selectProps: SelectProps
  options: SelectOption[]
  width?: number | string
  height?: number | string
  minW?: number | string
  error?: string
}

export const SelectInputControl = ({
  id,
  label,
  placeholder = '',
  selectProps,
  options,
  width = '230px',
  height = '30px',
  minW = '230px',
  error = '',
  ...rest
}: SelectInputControlProps) => {
  return (
    <FormControl mb={4} isInvalid={!!error}>
      <Box w='100%' display='flex' alignItems='center'>
        <Box w='30%' display='flex' alignItems='center' textAlign='end'>
          <FormLabel
            htmlFor={id}
            w='100%'
            textAlign='end'
            alignItems='center'
            pt={2}
            mr={2}
          >
            <Text fontWeight={700}>{label}</Text>
          </FormLabel>
        </Box>
        <Box w='70%' display='flex' alignItems='center'>
          <Box minW={minW}>
            <Select
              id={id}
              placeholder={placeholder}
              {...selectProps}
              isInvalid={!!error}
              width={width}
              height={height}
            >
              {options.map((option: SelectOption) => {
                const { value, label } = option
                return (
                  <option value={value} key={value}>
                    {label}
                  </option>
                )
              })}
            </Select>
          </Box>
        </Box>
      </Box>
      <Box w='100%' display='flex' alignItems='center'>
        <Box w='30%' display='flex' alignItems='center' textAlign='end'></Box>
        <Box w='70%' display='flex' alignItems='center'>
          <Box>
            <FormErrorMessage size={'sm'} mt={'2px'}>
              {error}
            </FormErrorMessage>
          </Box>
        </Box>
      </Box>
    </FormControl>
  )
}
