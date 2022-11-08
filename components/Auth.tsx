import { useEffect, useState } from 'react'

import { useAppDispatch } from 'redux/hooks'
import { setAccountUsername } from 'redux/slices/account'

import { useGetVerifyCodeQuery, useGetVerifyTokenQuery } from '../api/auth'

function getAuthURL(): string {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'https://auth.dev.tryspace.com'
    case 'dev':
      return 'https://auth.dev.tryspace.com'
    case 'prod':
      return 'https://auth.tryspace.com'
    default:
      console.log('No ENV set')
      return 'https://auth.dev.tryspace.com'
  }
}

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loginCode, setLoginCode] = useState('')
  const [immerToken, setImmerToken] = useState('')

  const {
    isSuccess: isGetVerifyCodeSuccess,
    data: getVerifyCodeData
  } = useGetVerifyCodeQuery({ loginCode },
    {
      skip: !loginCode
    })

  const {
    isSuccess: isGetVerifyTokenSuccess,
    isError: isGetVerifyTokenError,
    data: getVerifyTokenData
  } = useGetVerifyTokenQuery({ immerToken },
    {
      skip: !immerToken
    })

  useEffect(() => {
    const localImmerToken = localStorage.getItem('immerToken')
    if (!localImmerToken) {
      const urlSearchParams = new URLSearchParams(window.location.search)
      const loginCode = urlSearchParams.get('loginCode')
      if (loginCode) {
        setLoginCode(loginCode)
      } else {
        window.location.href = `${getAuthURL()}/?redirect=${window.location.href}`
      }
    } else {
      setImmerToken(localImmerToken)
    }
  }, [])

  useEffect(() => {
    if (isGetVerifyCodeSuccess && getVerifyCodeData?.immerToken) {
      localStorage.setItem('immerToken', getVerifyCodeData?.immerToken)
      window.location.search = ''
    }
  }, [isGetVerifyCodeSuccess, getVerifyCodeData])

  useEffect(() => {
    if (isGetVerifyTokenSuccess && getVerifyTokenData?.username) {
      dispatch(setAccountUsername({ username: getVerifyTokenData?.username }))
    }
  }, [isGetVerifyTokenSuccess, getVerifyTokenData, dispatch])

  useEffect(() => {
    if (isGetVerifyTokenError) {
      window.localStorage.removeItem('immerToken')
    }
  }, [isGetVerifyTokenError])

  return <></>
}

export default Auth
