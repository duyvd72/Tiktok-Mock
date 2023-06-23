
import { useDispatch, useSelector } from 'react-redux'
import { signUpUserAPI } from '@/api/userAPIs'
import { ISignUpUser, ILoggingUser } from '@/interfaces/interfaces'
import { RootState } from '@/redux/store'
import useModal from '@/hooks/useModal'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import { loginUserAPI } from '@/api/userAPIs';
import jwt from 'jwt-decode'
import authenticationSlice from '@/pages/User/Authentication/redux/authenticationSlice'

function useLoginSignUpUser() {
    const { setModalIsOpen, setModalState, setCurrentUser } = useModal()
    const dispatch = useDispatch()

    const isLoading = useSelector((state: RootState) => state.authentication.isLoading)
    const userSignUp = (userSignUp: ISignUpUser) => {
        dispatch(signUpUserAPI(userSignUp) as any)
    }

    const userLogin = (values: ILoggingUser) => {
        dispatch(loginUserAPI(values) as any)
    }

    useEffect(() => {
        if (isLoading.state === 'success' && isLoading.data?.response?.message === 'invalid username' || isLoading.data?.response?.message === 'invalid password') {
            toast.error(isLoading.data?.response.message)
            dispatch(authenticationSlice.actions.resetLoading())
        } else if (isLoading.state === 'success' && isLoading.data?.response?.message !== 'invalid username' && isLoading.data?.response?.message !== 'invalid password' && isLoading.data?.type !== 'signup') {
            const user = jwt(isLoading.data?.response?.token!)
            setCurrentUser(user)
            setModalIsOpen(false)
            setModalState('login')
            dispatch(authenticationSlice.actions.resetLoading())
        }

        if (isLoading.state === 'success' && isLoading.data?.type !== 'login') {
            setModalIsOpen(false)
            setModalState('login')
            toast.success('Đăng ký thành công')
            dispatch(authenticationSlice.actions.resetLoading())
        }
    }, [isLoading.loading])

    return {
        userSignUp,
        userLogin,
        isLoading
    }
}

export default useLoginSignUpUser