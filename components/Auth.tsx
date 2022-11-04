import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { setAccountUsername } from "redux/slices/account";
import { useGetVerifyCodeMutation, useGetVerifyTokenMutation } from "../api/auth";

function getAuthURL() {
    switch (process.env.NEXT_PUBLIC_ENV) {
        case 'local':
            return 'https://auth.dev.tryspace.com';
        case 'dev':
            return 'https://auth.dev.tryspace.com';
        case 'prod':
            return 'https://auth.tryspace.com';
        default:
            console.log("No ENV set");
            return 'https://auth.dev.tryspace.com';
    }
}

function getAccountURL() {
    switch (process.env.NEXT_PUBLIC_ENV) {
        case 'local':
            return 'http://localhost:3000';
        case 'dev':
            return 'https://account.dev.tryspace.com';
        case 'prod':
            return 'https://account.tryspace.com';
        default:
            console.log("No ENV set");
            return 'https://account.dev.tryspace.com';
    }
}

const Auth = () => {
    const dispatch = useAppDispatch();

    const [getVerifyCode, {
        isLoading: isGetVerifyCodeLoading,
        isSuccess: isGetVerifyCodeSuccess,
        isError: isGetVerifyCodeError,
        data: getVerifyCodeData,
        error: getVerifyCodeError
    }] = useGetVerifyCodeMutation();

    const [getVerifyToken, {
        isLoading: isGetVerifyTokenLoading,
        isSuccess: isGetVerifyTokenSuccess,
        isError: isGetVerifyTokenError,
        data: getVerifyTokenData,
        error: getVerifyTokenError
    }] = useGetVerifyTokenMutation();

    useEffect(() => {
        const localImmerToken = localStorage.getItem('immerToken');
        if (!localImmerToken) {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const loginCode = urlSearchParams.get('loginCode');
            if (loginCode) {
                getVerifyCode({ loginCode });
            } else {
                window.location.href = `${getAuthURL()}/?redirect=${getAccountURL()}`;
            }
        } else {
            getVerifyToken({ immerToken: localImmerToken });
        }
    }, []);

    useEffect(() => {
        if (isGetVerifyCodeSuccess && getVerifyCodeData?.immerToken) {
            localStorage.setItem('immerToken', getVerifyCodeData?.immerToken);
            window.location.search = "";
        }
    }, [isGetVerifyCodeSuccess, getVerifyCodeData]);

    useEffect(() => {
        if (isGetVerifyTokenSuccess && getVerifyCodeData?.username) {
            dispatch(setAccountUsername({ username: getVerifyCodeData?.username }));
        }
    }, [isGetVerifyCodeSuccess, getVerifyCodeData]);

    useEffect(() => {
        if (isGetVerifyTokenError) {
            window.localStorage.removeItem("immerToken")
        }
    }, [isGetVerifyTokenError]);

    return <></>;
}

export default Auth;