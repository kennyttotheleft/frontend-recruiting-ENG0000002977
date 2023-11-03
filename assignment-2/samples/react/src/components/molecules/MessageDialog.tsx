import { Alert, AlertIcon, Box } from '@chakra-ui/react'

export type MessageDialogProps = {
  succeedMessage: string
  errorMessage: string
  isError: boolean
  isShow: boolean
}

export const MessageDialog = ({
  succeedMessage,
  errorMessage,
  isError,
  isShow,
}: MessageDialogProps) => {
  let dialog
  if (isShow) {
    dialog = isError ? (
      <Alert status='error'>
        <AlertIcon />
        {errorMessage}
      </Alert>
    ) : (
      <Alert status='success'>
        <AlertIcon />
        {succeedMessage}
      </Alert>
    )
  }

  return <Box mt={4}>{dialog}</Box>
}
