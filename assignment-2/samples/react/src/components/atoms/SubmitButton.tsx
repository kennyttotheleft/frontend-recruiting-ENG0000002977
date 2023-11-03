import { forwardRef, Button, ButtonProps } from '@chakra-ui/react'

export const SubmitButton = forwardRef<ButtonProps, 'input'>((props, ref) => (
  <Button
    type={'submit'}
    width={'100px'}
    height={'40px'}
    colorScheme='green'
    style={{ fontSize: '12px' }}
    ref={ref}
    {...props}
  />
))
