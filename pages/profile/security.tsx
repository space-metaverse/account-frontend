import { useState, type ReactElement } from 'react'

import { Button, TextInput } from '@space-metaverse-ag/space-ui'
import validate from 'helpers/validate'
import Layout from 'layouts/profile'
import Head from 'next/head'
import styled from 'styled-components'
import { ref, string } from 'yup'

import type { NextPageWithLayout } from '../../types'

const Form = styled.div`
  gap: 1rem;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 4rem;
  flex-direction: column;

  .is-grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Actions = styled.div`
  gap: 0.75rem;
  padding: 1.25rem 0;
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 37.5rem;
  flex-direction: column;
`

const Label = styled.label`
  color: #111114;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.04em;
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
      <Container>
        <Label>Change Password</Label>

        <Form>
          <div className='is-grid'>
            <TextInput
              type='password'
              label='Current Password'
              value={fields.password}
              isError={!!errors.password}
              onChange={({ target }) => setFields((prev) => ({ ...prev, password: target.value }))}
              placeholder='Enter your current password'
            />
          </div>

          <div className='is-grid'>
            <TextInput
              type='password'
              label='New Password'
              value={fields.newPassword}
              isError={!!errors.newPassword}
              onChange={({ target }) => setFields((prev) => ({ ...prev, newPassword: target.value }))}
              placeholder='Enter new password'
            />

            <TextInput
              type='password'
              label='Confirm New Password'
              value={fields.confirmNewPassword}
              isError={!!errors.confirmNewPassword}
              onChange={({ target }) => setFields((prev) => ({ ...prev, confirmNewPassword: target.value }))}
              placeholder='Re-enter new password'
            />
          </div>
        </Form>

        <Actions>
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
        </Actions>
      </Container>
    </>
  )
}

Security.getLayout = (page: ReactElement) => (
  <Layout title='Security Settings'>
    <Head>
      <title>Security Settings | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Layout>
)

export default Security
