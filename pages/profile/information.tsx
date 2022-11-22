import { useState, useEffect, type ReactElement } from 'react'

import {
  Button,
  TextInput,
  ImageInput,
  PhoneInput,
  Alert
} from '@space-metaverse-ag/space-ui'
import type { AlertProps } from '@space-metaverse-ag/space-ui'
import validate from 'helpers/validate'
import Profile from 'layouts/profile'
import Head from 'next/head'
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { setAccountPhone } from 'redux/slices/account'
import { string } from 'yup'

import { useGetMeQuery } from '../../api/account'
import { useSendSMSCodeMutation, useVerifySMSCodeMutation } from '../../api/auth'
import type { NextPageWithLayout } from '../../types'

const shape = {
  email: string()
    .email('Enter a valid email address')
    .required('Enter your email'),
  displayName: string().required('Enter your public name')
}

const initialFields = {
  email: '',
  phone: '',
  code: '',
  username: '',
  lastName: '',
  firstName: '',
  displayName: ''
}

interface PhoneVerifyStatusProps {
  isSendCode: boolean
  phoneInputInvalid: boolean
  alertStatus: AlertProps['type']
  alertMessage: string
  isAlertShow: boolean
}

const Information: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()
  const { username, phone } = useAppSelector((state) => state.account)
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(initialFields)
  const [phoneVerifyStatus, setPhoneVerifyStatus] = useState<PhoneVerifyStatusProps>({
    isSendCode: true,
    phoneInputInvalid: false,
    alertStatus: 'error',
    alertMessage: '',
    isAlertShow: false
  })

  const {
    isSuccess: isGetMeSuccess,
    data: getMeData
  } = useGetMeQuery({ undefined })

  const [
    sendSMSCode, // This is the mutation trigger
    { isLoading: isSendSMSCodeLoading, error: isSendSMSCodeError, isSuccess: isSendSMSCodeSuccess, data: sendSMSCodeData } // This is the destructured mutation result
  ] = useSendSMSCodeMutation()

  const [
    verifySMSCode,
    { isLoading: isVerifySMSCodeLoading, isSuccess: isVerifySMSCodeSuccess, error: isVerifySMSCodeError, data: verifySMSCodeData }
  ] = useVerifySMSCodeMutation()

  const submit = async (): Promise<void> => {
    await validate
      .request(fields, shape)
      .then(() => {
        setErrors(initialFields)

        /**
         * Send request to backend.
         */
      })
      .catch((err: Error) => {
        const messages = validate.error(err)

        if (messages) setErrors(messages as typeof initialFields)
      })
  }

  const discard = (): void => {
    setErrors(initialFields)
    setFields(initialFields)
  }

  const sendCode = (): void => {
    sendSMSCode({ phoneNumber: fields.phone ?? '' })
  }

  const verifyCode = (): void => {
    verifySMSCode({ code: fields.code })
  }

  useEffect(() => {
    if (isGetMeSuccess && getMeData?.phoneNumber) {
      setFields({...fields, phone: getMeData?.phoneNumber})
      dispatch(setAccountPhone({ phone: getMeData?.phoneNumber }))
    }
  }, [isGetMeSuccess, getMeData, dispatch])

  useEffect(() => {
    if (username) {
      setFields((prev) => ({
        ...prev,
        username
      }))
    }
    if (phone) {
      setFields((prev) => ({
        ...prev,
        phone
      }))
    }
  }, [username, phone])

  useEffect(() => {
    let alertMessage = ''
    if (isSendSMSCodeSuccess) {
      alertMessage = sendSMSCodeData?.message ?? 'Sent SMS code successfully'
      if (isVerifySMSCodeSuccess) {
        alertMessage = verifySMSCodeData?.message ?? 'Verified SMS code successfully'
      } else if (isVerifySMSCodeError) {
        alertMessage = 'Issue with verifying SMS code'
      }
    } else if (isSendSMSCodeError) {
      alertMessage = 'Issue with sending SMS code'
    }
    setPhoneVerifyStatus((prev) => ({
      ...prev,
      isSendCode: !!isSendSMSCodeError || !isSendSMSCodeSuccess,
      phoneInputInvalid: !!isSendSMSCodeError,
      isAlertShow: !isSendSMSCodeLoading && !isVerifySMSCodeLoading && (isSendSMSCodeSuccess || !!isSendSMSCodeError || isVerifySMSCodeSuccess || !!isVerifySMSCodeError),
      alertStatus: (!!isSendSMSCodeError || !!isVerifySMSCodeError) ? 'error' : 'success',
      alertMessage
    }))
  }, [isSendSMSCodeError, isSendSMSCodeSuccess, sendSMSCodeData, isVerifySMSCodeSuccess, isVerifySMSCodeError, verifySMSCodeData])

  return (
    <>
      <Profile.SharedStyles.Container>
        <ImageInput
          file={file}
          header='Toni Papperoni'
          onFile={setFile}
          button={{
            size: 'small',
            label: 'Change Avatar',
            color: 'blue',
            outline: true
          }}
          showDummyAvatar
          changeLabelWhenFileSelected
        />

        <Profile.SharedStyles.Form>
          <div className='is-grid'>
            <TextInput
              label='Username'
              value={fields.username}
              disabled
              onChange={({ target }) =>
                setFields((prev) => ({ ...prev, username: target.value }))
              }
              placeholder='Your unique Username'
            />

            <TextInput
              label='Display Name'
              value={fields.displayName}
              isError={errors.displayName}
              onChange={({ target }) =>
                setFields((prev) => ({ ...prev, displayName: target.value }))
              }
              placeholder='Public name displayed across the platform'
            />
          </div>
          <div className='is-grid'>
            <TextInput
              label='First name'
              value={fields.firstName}
              onChange={({ target }) =>
                setFields((prev) => ({ ...prev, firstName: target.value }))
              }
              placeholder='Enter your first name'
            />

            <TextInput
              label='Last name'
              value={fields.lastName}
              onChange={({ target }) =>
                setFields((prev) => ({ ...prev, lastName: target.value }))
              }
              placeholder='Enter your last name'
            />
          </div>

          <div className='is-grid'>
            <TextInput
              label='Email'
              value={fields.email}
              isError={errors.email}
              disabled
              onChange={({ target }) =>
                setFields((prev) => ({ ...prev, email: target.value }))
              }
              placeholder='Enter your email'
            />
          </div>

          <div className='is-grid'>
            <div>
              {
                phoneVerifyStatus.isSendCode
                  ? <PhoneInput
                      label='Phone'
                      mainCountry='ca'
                      isError={phoneVerifyStatus.phoneInputInvalid}
                      onChange={(value) => {
                        setFields((prev) => ({...prev, phone: value}))
                      }}
                      value={fields.phone}
                    />
                  : <TextInput
                      label='Verify Code'
                      value={fields.code}
                      onChange={({ target }) => setFields((prev) => ({ ...prev, code: target.value }))}
                      placeholder='XXXXXX'
                    />
              }
              {
                phoneVerifyStatus.isAlertShow && <Profile.SharedStyles.Alert>
                  <Alert
                    text={phoneVerifyStatus?.alertMessage || ''}
                    type={phoneVerifyStatus?.alertStatus}
                    withIcon
                  />
                </Profile.SharedStyles.Alert>
              }
            </div>
            <Profile.SharedStyles.PhoneAction>
              {
                phoneVerifyStatus.isSendCode
                  ? <Button
                    color='blue'
                    label='Send Code'
                    size='small'
                    outline
                    onClick={sendCode}
                  />
                  : <Button
                      color='blue'
                      label='Verify Code'
                      size='small'
                      outline
                      onClick={verifyCode}
                    />
              }
            </Profile.SharedStyles.PhoneAction>
          </div>
        </Profile.SharedStyles.Form>
      </Profile.SharedStyles.Container>

      <Profile.SharedStyles.Actions>
        <Button
          size='medium'
          color='blue'
          label='Save changes'
          onClick={submit}
        />

        <Button
          size='medium'
          color='white-red'
          label='Discard'
          onClick={discard}
        />
      </Profile.SharedStyles.Actions>
    </>
  )
}

Information.getLayout = (page: ReactElement) => (
  <Profile.Layout title='Profile Information'>
    <Head>
      <title>Profile Information | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Profile.Layout>
)

export default Information
