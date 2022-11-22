import { useState, type ReactElement } from 'react'

import { Button, TextInput } from '@space-metaverse-ag/space-ui'
import validate from 'helpers/validate'
import Profile from 'layouts/profile'
import Head from 'next/head'
import styled from 'styled-components'
import { ref, string } from 'yup'

import type { NextPageWithLayout } from '../../types'

const Label = styled.label`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['800']};
  margin-top: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  letter-spacing: 1px;
  text-transform: uppercase;
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

  const submit = async (): Promise<void> => {
    await validate.request(fields, shape)
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

  return (
    <>
      <Profile.SharedStyles.Container>
        <Label>Change Password</Label>

        <Profile.SharedStyles.Form>
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
        </Profile.SharedStyles.Form>
      </Profile.SharedStyles.Container>

      <Profile.SharedStyles.Actions>
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
      </Profile.SharedStyles.Actions>
    </>
  )
}

Security.getLayout = (page: ReactElement) => (
  <Profile.Layout title='Security Settings'>
    <Head>
      <title>Security Settings | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Profile.Layout>
)

export default Security
