import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'

import AddressFormPage from './pages/AddressFormPage'

function App() {
  return (
    <div className='App'>
      <ChakraProvider theme={theme}>
        <AddressFormPage />
      </ChakraProvider>
    </div>
  )
}

export default App
