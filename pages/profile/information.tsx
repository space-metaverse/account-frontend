import { useState, useEffect, type ReactElement } from 'react'

import { Button, TextInput, ImageInput } from '@space-metaverse-ag/space-ui'
import validate from 'helpers/validate'
import Profile from 'layouts/profile'
import Head from 'next/head'
import { useAppSelector } from 'redux/hooks'
import { string } from 'yup'

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
  username: '',
  lastName: '',
  firstName: '',
  displayName: ''
}

const Information: NextPageWithLayout = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState(initialFields)

  const { username } = useAppSelector(state => state.account)

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

  useEffect(() => {
    if (username) {
      console.log(username)

      setFields((prev) => ({
        ...prev,
        username
      }))
    }
  }, [])

  return (
    <>
      <Profile.SharedStyles.Container>
        <ImageInput
          file={file}
          header="Toni Papperoni"
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
          <div className="is-grid">
            <TextInput
              label="Username"
              value={fields.username}
              disabled
              onChange={({ target }) => setFields((prev) => ({ ...prev, username: target.value }))}
              placeholder="Your unique Username"
            />

            <TextInput
              label="Display Name"
              value={fields.displayName}
              isError={!!errors.displayName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, displayName: target.value }))}
              placeholder="Public name displayed across the platform"
            />
          </div>
          <div className="is-grid">
            <TextInput
              label="First name"
              value={fields.firstName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, firstName: target.value }))}
              placeholder="Enter your first name"
            />

            <TextInput
              label="Last name"
              value={fields.lastName}
              onChange={({ target }) => setFields((prev) => ({ ...prev, lastName: target.value }))}
              placeholder="Enter your last name"
            />
          </div>

          <div className="is-grid">
            <TextInput
              label="Email"
              value={fields.email}
              isError={!!errors.email}
              disabled
              onChange={({ target }) => setFields((prev) => ({ ...prev, email: target.value }))}
              placeholder="Enter your email"
            />
          </div>

          <div className="is-grid">
            <TextInput
              label="Phone number"
              value={fields.phone}
              onChange={({ target }) => setFields((prev) => ({ ...prev, phone: target.value }))}
              placeholder="(XX) XXXX-XXXX"
            />
          </div>
        </Profile.SharedStyles.Form>
      </Profile.SharedStyles.Container>

      <Profile.SharedStyles.Actions>
        <Button
          size="medium"
          color="blue"
          label="Save changes"
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

Information.getLayout = (page: ReactElement) => (
  <Profile.Layout title="Profile Information">
    <Head>
      <title>Profile Information | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Profile.Layout>
)

export default Information
