import { useState, useEffect, type ReactElement, useCallback } from 'react'

import {
  Alert,
  Button,
  Spinner,
  TextInput,
  PhoneInput,
  type AlertProps
} from '@space-metaverse-ag/space-ui'
import { rgba } from '@space-metaverse-ag/space-ui/helpers'
import { useGetMeQuery, usePostMeMutation } from 'api/account'
import { useSendSMSCodeMutation, useVerifySMSCodeMutation } from 'api/auth'
import validate from 'helpers/validate'
import Layout from 'layouts/layout'
import Head from 'next/head'
import { useAppDispatch } from 'redux/hooks'
import { setAccountPhone } from 'redux/slices/account'
import styled from 'styled-components'
import { string } from 'yup'

import type { NextPageWithLayout } from '../../types'

const shape = {
  email: string()
    .email('Enter a valid email address')
    .required('Enter your email'),
  username: string().required('Enter your username'),
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
  alertStatus: AlertProps['type']
  isAlertShow: boolean
  isVerifyCode: boolean
  alertMessage: string
  phoneInputInvalid: boolean
  prevSendSMSLoading: boolean
}

const Loading = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 99;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.white, '.64')};
`

const Information: NextPageWithLayout = () => {
  const dispatch = useAppDispatch()

  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(initialFields)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loadingSMS, setLoadingSMS] = useState(false)
  const [phoneVerifyStatus, setPhoneVerifyStatus] = useState<PhoneVerifyStatusProps>({
    alertStatus: 'error',
    isAlertShow: false,
    isVerifyCode: false,
    alertMessage: '',
    phoneInputInvalid: false,
    prevSendSMSLoading: false
  })

  const {
    data,
    isSuccess,
  } = useGetMeQuery({})

  const [
    postMe
  ] = usePostMeMutation()

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
      .then(async () => {
        setErrors(initialFields)

        const {
          email,
          lastName,
          firstName,
        } = fields;

        setLoading(true)

        await postMe({
          email,
          lastName,
          firstName,
        })

        setLoading(false)

        setSuccess(true)

        setTimeout(() => setSuccess(false), 3000)
      })
      .catch((err: Error) => {
        const messages = validate.error(err)

        if (messages) setErrors(messages as typeof initialFields)
      })
  }

  const sendCode = async (): Promise<void> => {
    setLoadingSMS(true)

    await sendSMSCode({ phoneNumber: fields.phone ?? '' })

    setLoadingSMS(false)
  }

  const verifyCode = async (): Promise<void> => {
    setLoadingSMS(true)

    await verifySMSCode({ code: fields.code })

    setLoadingSMS(false)
  }

  const populateFields = useCallback(() => {
    if (data) {
      const {
        lastName,
        username,
        userEmail,
        firstName,
        phoneNumber,
        displayName
      } = data;

      setFields((prev) => ({
        ...prev,
        email: userEmail ?? '',
        phone: phoneNumber ?? '',
        username,
        lastName: lastName ?? '',
        firstName: firstName ?? '',
        displayName: displayName ?? '',
      }))
    }
  }, [data])

  const discard = (): void => {
    populateFields()

    setErrors(initialFields)
  }

  useEffect(() => {
    if (data && isSuccess) {
      populateFields()

      if (data.phoneNumber) {
        dispatch(setAccountPhone({ phone: data.phoneNumber }))
      }
    }
  }, [data, dispatch, isSuccess, populateFields])

  useEffect(() => {
    let alertMessage = ''
    if (isSendSMSCodeSuccess) {
      alertMessage = sendSMSCodeData?.message ?? 'Sent SMS code successfully'
      if (isVerifySMSCodeSuccess && !phoneVerifyStatus.prevSendSMSLoading) {
        alertMessage = verifySMSCodeData?.message ?? 'Verified SMS code successfully'
        setFields((prev) => ({ ...prev, code: '' }));
      } else if (isVerifySMSCodeError) {
        alertMessage = 'Issue with verifying SMS code'
      }
    } else if (isSendSMSCodeError) {
      alertMessage = 'Issue with sending SMS code'
    }
    setPhoneVerifyStatus((prev) => ({
      ...prev,
      isAlertShow: !isSendSMSCodeLoading && !isVerifySMSCodeLoading && (isSendSMSCodeSuccess || !!isSendSMSCodeError || isVerifySMSCodeSuccess || !!isVerifySMSCodeError),
      alertStatus: (!!isSendSMSCodeError || !!isVerifySMSCodeError) ? 'error' : 'success',
      isVerifyCode: isSendSMSCodeSuccess && !isVerifySMSCodeSuccess,
      alertMessage,
      phoneInputInvalid: !!isSendSMSCodeError,
      prevSendSMSLoading: isSendSMSCodeLoading,
    }))
  }, [isSendSMSCodeError, isSendSMSCodeSuccess, isSendSMSCodeLoading, sendSMSCodeData, isVerifySMSCodeSuccess, isVerifySMSCodeLoading, isVerifySMSCodeError, verifySMSCodeData, phoneVerifyStatus.prevSendSMSLoading])

  return (
    <>
      <Layout.SharedStyles.Container>
        {!isSuccess && (
          <Loading>
            <Spinner />
          </Loading>
        )}

        {success && (
          <Alert
            text="Your data has been successfully updated"
            type="success"
            withIcon
          />
        )}

        <Layout.SharedStyles.Form>
          <div className='is-grid'>
            <TextInput
              label='Username'
              value={fields.username}
              disabled
              onChange={({ target }) => setFields((prev) => ({ ...prev, username: target.value }))}
              placeholder='Your unique Username'
            />

            <TextInput
              label='Display Name'
              value={fields.displayName}
              isError={errors.displayName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, displayName: target.value }))}
              placeholder="Public name displayed across the platform"
            />
          </div>

          <div className='is-grid'>
            <TextInput
              label='First name'
              value={fields.firstName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, firstName: target.value }))}
              placeholder='Enter your first name'
            />

            <TextInput
              label='Last name'
              value={fields.lastName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, lastName: target.value }))}
              placeholder='Enter your last name'
            />
          </div>

          <div className='is-grid'>
            <TextInput
              label='Email'
              value={fields.email}
              isError={errors.email}
              disabled={!!data?.userEmail}
              onChange={({ target }) => setFields((prev) => ({ ...prev, email: target.value }))}
              placeholder="Enter your email"
            />
          </div>

          <div className='is-grid'>
            <div>
              {
                phoneVerifyStatus.isVerifyCode
                  ? <TextInput
                    label='Verify Code'
                    value={fields.code}
                    onChange={({ target }) => setFields((prev) => ({ ...prev, code: target.value }))}
                    placeholder='XXXXXX'
                  />
                  : <PhoneInput
                    label='Phone'
                    value={fields.phone}
                    isError={phoneVerifyStatus.phoneInputInvalid}
                    onChange={(value) => setFields((prev) => ({ ...prev, phone: value }))}
                    mainCountry='ca'
                  />
              }
              {
                phoneVerifyStatus.isAlertShow && <Layout.SharedStyles.Alert>
                  <Alert
                    text={phoneVerifyStatus?.alertMessage || ''}
                    type={phoneVerifyStatus?.alertStatus}
                    withIcon
                  />
                </Layout.SharedStyles.Alert>
              }
            </div>

            <Layout.SharedStyles.PhoneAction>
              {
                phoneVerifyStatus.isVerifyCode
                  ? <Button
                    color='blue'
                    label={loadingSMS ? <Spinner size="small" /> : 'Verify Code'}
                    size='small'
                    outline
                    onClick={verifyCode}
                  />
                  : <Button
                    color='blue'
                    label={loadingSMS ? <Spinner size="small" /> : 'Send Code'}
                    size='small'
                    outline
                    onClick={sendCode}
                  />
              }
            </Layout.SharedStyles.PhoneAction>
          </div>
        </Layout.SharedStyles.Form>
      </Layout.SharedStyles.Container>

      <Layout.SharedStyles.Actions>
        <Button
          size='medium'
          color='blue'
          label={loading ? <Spinner size="small" /> : 'Save changes'}
          onClick={submit}
          outline={loading}
        />

        <Button
          size='medium'
          color='white-red'
          label='Discard'
          onClick={discard}
        />
      </Layout.SharedStyles.Actions>
    </>
  )
}

Information.getLayout = (page: ReactElement) => (
  <Layout.Layout title='Profile Information'>
    <Head>
      <title>Profile Information | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Layout.Layout>
)

export default Information
