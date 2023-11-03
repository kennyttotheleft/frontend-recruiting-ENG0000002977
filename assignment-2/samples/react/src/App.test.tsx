import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  test('address form should be rendered', () => {
    render(<App />)

    const labels = [
      '氏名',
      'Eメール',
      '郵便番号',
      '都道府県',
      '市区町村・番地',
      '建物名・号室',
      '登録',
    ]
    labels.forEach((labelText) => {
      const element = screen.getByText(new RegExp(labelText, 'i'))
      expect(element).toBeInTheDocument()
    })
  })
})
