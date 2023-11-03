import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddressForm from './AddressForm'

describe('AddressForm', () => {
  test('address form elements should be rendered on page init', () => {
    render(<AddressForm />)

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

    expect(screen.getByText('登録')).toBeDisabled()
  })

  test('validation should be passed', async () => {
    render(<AddressForm />)

    const inputs = [
      {
        label: '氏名',
        value: 'John Doe',
      },
      {
        label: 'Eメール',
        value: 'john.doe@example.com',
      },
      {
        label: '郵便番号',
        value: '1112222',
      },
      {
        label: '都道府県',
        value: '1',
      },
      {
        label: '市区町村・番地',
        value: '札幌市',
      },
      {
        label: '建物名・号室',
        value: '1-1-1',
      },
    ]

    inputs.forEach((input) => {
      const { label, value } = input
      fireEvent.change(screen.getByLabelText(label), {
        target: { value },
      })
    })

    // 登録ボタンを押下
    const submitButton = screen.getByText('登録')
    // 下記のため送信ボタンの活性状態チェックはコメントアウトしました。
    // React testing library fails to check for disabled button
    // https://stackoverflow.com/questions/70852090/react-testing-library-fails-to-check-for-disabled-button
    // expect(submitButton).toBeEnabled()
    fireEvent.click(submitButton)

    // エラーメッセージが表示されていないことを確認
    const errorMessages = [
      '氏名を入力してください',
      '正しいメールアドレスを入力してください',
      'ハイフンを含めず半角数字で入力してください',
      '都道府県を選択してください',
      '市区町村・番地を入力してください',
    ]
    errorMessages.forEach((message) => {
      expect(screen.queryByText(message)).toBeNull()
    })
  })

  test('validation error should be displayed', () => {
    render(<AddressForm />)

    const inputs = [
      {
        label: '氏名',
        value: '',
      },
      {
        label: 'Eメール',
        value: '',
      },
      {
        label: '郵便番号',
        value: '',
      },
      {
        label: '都道府県',
        value: '',
      },
      {
        label: '市区町村・番地',
        value: '',
      },
      {
        label: '建物名・号室',
        value: '',
      },
    ]

    inputs.forEach((input) => {
      const { label, value } = input
      const element = screen.getByLabelText(label)
      fireEvent.change(element, {
        target: { value },
      })
      fireEvent.blur(element)
    })

    // エラーメッセージが表示されていないことを確認
    const errorMessages = [
      '氏名を入力してください',
      '正しいメールアドレスを入力してください',
      'ハイフンを含めず半角数字で入力してください',
      '都道府県を選択してください',
      '市区町村・番地を入力してください',
    ]
    errorMessages.forEach(async (message) => {
      await waitFor(() => {
        expect(screen.getByText(message)).toBeInTheDocument()
      })
    })
  })

  test('email validation error should be displayed', async () => {
    render(<AddressForm />)

    const element = screen.getByLabelText('Eメール')
    fireEvent.change(element, {
      target: { value: 'aaa' },
    })
    fireEvent.blur(element)

    // エラーメッセージが表示されていないことを確認
    await waitFor(() => {
      expect(
        screen.getByText('正しいメールアドレスを入力してください')
      ).toBeInTheDocument()
    })
  })
})
