import { z } from 'zod'

const ZIP_CODE = new RegExp('^[0-9]{7}$')

export const addressFormSchema = z
  .object({
    name: z.string().min(1, { message: '氏名を入力してください' }),
    email: z.string().email({
      message: '正しいメールアドレスを入力してください',
    }),
    zip: z.string().regex(ZIP_CODE, {
      message: 'ハイフンを含めず半角数字で入力してください',
    }),
    prefecture: z.string().min(1, {
      message: '都道府県を選択してください',
    }),
    address1: z.string().min(1, {
      message: '市区町村・番地を入力してください',
    }),
    address2: z.string().nullable(),
  })
  .required()

export type AddressFormSchemaType = z.infer<typeof addressFormSchema>
