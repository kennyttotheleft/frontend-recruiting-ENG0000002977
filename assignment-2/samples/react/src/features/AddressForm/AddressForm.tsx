import { TextInputControl } from '../../components/molecules/TextInputControl'
import { SelectInputControl } from '../../components/molecules/SelectInputControl'
import { MessageDialog } from '../../components/molecules/MessageDialog'
import { SubmitButton } from '../../components/atoms/SubmitButton'
import { Const } from '../../const'
import { useAddressForm } from './hooks'

const AddressForm = () => {
  const {
    register,
    onSubmit,
    isValid,
    isSubmitting,
    isRequestFinished,
    isError,
    errors,
  } = useAddressForm()
  return (
    <form onSubmit={onSubmit}>
      <TextInputControl
        id={'name'}
        type={'text'}
        label={'氏名'}
        placeholder={'(例)トレタ太郎'}
        inputProps={{ ...register('name') }}
        error={errors.name?.message}
      />
      <TextInputControl
        id={'email'}
        type={'email'}
        label={'Eメール'}
        placeholder={'(例)yoyaku@toreta.in'}
        inputProps={{ ...register('email') }}
        error={errors.email?.message}
      />
      <TextInputControl
        id={'zip'}
        type={'text'}
        label={'郵便番号'}
        placeholder={'(例)0000000'}
        inputProps={{ ...register('zip') }}
        width={'101px'}
        height={'29px'}
        minW={'100px'}
        error={errors.zip?.message}
      />
      <SelectInputControl
        id={'prefecture'}
        label={'都道府県'}
        options={Const.PREF_OPTIONS}
        placeholder={'選択してください'}
        selectProps={{ ...register('prefecture') }}
        error={errors.prefecture?.message}
      />
      <TextInputControl
        id={'address1'}
        type={'text'}
        label={'市区町村・番地'}
        placeholder='(例)品川区西五反田７丁目２２−１７'
        inputProps={{ ...register('address1') }}
        error={errors.address1?.message}
      />
      <TextInputControl
        id={'address2'}
        type={'text'}
        label={'建物名・号室'}
        placeholder='(例)TOCビル 8階'
        inputProps={{ ...register('address2') }}
        error={errors.address2?.message}
      />
      <MessageDialog
        succeedMessage={'送信完了しました。'}
        errorMessage={'送信に失敗しました。時間をおいて再度お試しください。'}
        isError={isError}
        isShow={isRequestFinished}
      />

      <SubmitButton
        loadingText={'送信中'}
        isDisabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        mt={4}
      >
        登録
      </SubmitButton>
    </form>
  )
}

export default AddressForm
