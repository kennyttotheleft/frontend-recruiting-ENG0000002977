import { forwardRef, Input, InputProps } from '@chakra-ui/react'

export const TextInput = forwardRef<InputProps, 'input'>((props, ref) => (
  <Input ref={ref} {...props} />
))
