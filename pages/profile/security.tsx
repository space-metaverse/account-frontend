import { useState, type ReactElement } from 'react'

import { Button, TextInput } from '@space-metaverse-ag/space-ui'
import validate from 'helpers/validate'
import Layout from 'layouts/layout'
import Head from 'next/head'
import styled from 'styled-components'
import { ref, string } from 'yup'

import type { NextPageWithLayout } from '../../types'
import { usePostChangePasswordMutation } from 'api/auth'

const Label = styled.label`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['800']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: 2rem;
`

const shape = {
  password: string().required('Enter your password'),
  newPassword: string()
    .min(6, 'Password must be at least 6 characters')
    .required('Please enter the new password.'),
  confirmNewPassword: string()
    .oneOf([ref('newPassword'), null], 'Passwords must match.')
    .required('Enter the password for the password.')
}

const initialFields = {
  password: '',
  newPassword: '',
  confirmNewPassword: ''
}

const Security: NextPageWithLayout = () => {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(initialFields)

  const [
    postChangePassword,
    {
      isLoading: isPostChangePasswordLoading,
      isSuccess: isPostChangePasswordSuccess,
      error: isPostChangePasswordError,
      data: postChangePasswordData
    }
  ] = usePostChangePasswordMutation()

  const submit = async (): Promise<void> => {
    await validate.request(fields, shape)
      .then(() => {
        setErrors(initialFields)

        postChangePassword({
          oldPassword: fields.password,
          newPassword: fields.newPassword
        })
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

  return (
    <>
      <Layout.SharedStyles.Container>
        <Label>Change Password</Label>

        <Layout.SharedStyles.Form>
          <div className='is-grid'>
            <TextInput
              type='password'
              label='Current Password'
              value={fields.password}
              isError={errors.password}
              onChange={({ target }) => setFields((prev) => ({ ...prev, password: target.value }))}
              placeholder='Enter your current password'
            />
          </div>

          <div className='is-grid'>
            <TextInput
              type='password'
              label='New Password'
              value={fields.newPassword}
              isError={errors.newPassword}
              onChange={({ target }) => setFields((prev) => ({ ...prev, newPassword: target.value }))}
              placeholder='Enter new password'
            />

            <TextInput
              type='password'
              label='Confirm New Password'
              value={fields.confirmNewPassword}
              isError={errors.confirmNewPassword}
              onChange={({ target }) => setFields((prev) => ({ ...prev, confirmNewPassword: target.value }))}
              placeholder='Re-enter new password'
            />
          </div>
        </Layout.SharedStyles.Form>
      </Layout.SharedStyles.Container>

      <Layout.SharedStyles.Actions>
        <Button
          size="medium"
          color="blue"
          label="Update password"
          onClick={submit}
        />

        <Button
          size="medium"
          color="white-red"
          label="Discard"
          onClick={discard}
        />
      </Layout.SharedStyles.Actions>
    </>
  )
}

Security.getLayout = (page: ReactElement) => (
  <Layout.Layout title='Security Settings'>
    <Head>
      <title>Security Settings | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Layout.Layout>
)

export default Security
