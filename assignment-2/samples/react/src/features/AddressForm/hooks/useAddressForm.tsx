import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { addressFormSchema, AddressFormSchemaType } from '../schema'
import { zodResolver } from '@hookform/resolvers/zod'

// TODO 環境変数から取得する
const API_URL = 'https://httpstat.us/201'

export const useAddressForm = () => {
  const [isRequestFinished, setIsRequestFinished] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitted,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<AddressFormSchemaType>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsRequestFinished(true)
    }
  }, [isSubmitSuccessful, isSubmitting, isSubmitted, setIsRequestFinished])

  const sendRequest = (data: AddressFormSchemaType): Promise<boolean> => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    return fetch(API_URL, requestOptions)
      .then((response) => {
        const { ok, status } = response
        if (!ok) {
          throw new Error('Network response was not ok')
        }
        if (status !== 201) {
          throw new Error('Invalid API response was given')
        }
        return true
      })
      .catch((error) => {
        console.error(error)
        setIsError(true)
        return false
      })
  }

  const onSubmit = async (data: AddressFormSchemaType) => {
    setIsRequestFinished(false)
    setIsError(false)
    await sendRequest(data)
  }

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    isValid,
    isSubmitting,
    isRequestFinished,
    isSubmitSuccessful,
    isSubmitted,
    isError,
    errors,
  }
}
