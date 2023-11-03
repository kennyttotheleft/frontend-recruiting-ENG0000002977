import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputProps,
  Box,
  Text,
} from '@chakra-ui/react'

export type TextInputControlProps = {
  id: string
  type: 'text' | 'email'
  label: string
  placeholder?: string
  inputProps: InputProps
  width?: number | string
  height?: number | string
  minW?: number | string
  error?: string
}

export const TextInputControl = ({
  id,
  type,
  label,
  placeholder = '',
  inputProps,
  width = '230px',
  height = '30px',
  minW = '230px',
  error = '',
  ...rest
}: TextInputControlProps) => {
  return (
    <FormControl mb={2} isInvalid={!!error}>
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
          <Box height={height} minW={minW}>
            <Input
              type={type}
              id={id}
              placeholder={placeholder}
              {...inputProps}
              borderColor={error ? 'red.500' : 'gray.500'}
              borderWidth={1}
              width={width}
              height={height}
            />
          </Box>
        </Box>
      </Box>
      <Box w='100%' display='flex' alignItems='center'>
        <Box w='30%' display='flex' alignItems='center' textAlign='end'></Box>
        <Box w='70%' display='flex' alignItems='center'>
          <FormErrorMessage size={'sm'} mt={'2px'}>
            {error}
          </FormErrorMessage>
        </Box>
      </Box>
    </FormControl>
  )
}
