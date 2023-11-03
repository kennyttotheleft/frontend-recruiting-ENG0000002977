import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  fontSizes: {
    xs: '8px',
    sm: '10px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  colors: {
    green: {
      500: '#5DD669',
    },
    gray: {
      500: '#E2E2E2',
    },
    red: {
      500: '#FF0000',
    },
  },
})

export default theme
