import { Routes, Route, Navigate } from 'react-router-dom'
import { LauchPage, LoginPage, RegisterPage } from '../auth'
import {RegisterCouse, HomePage, RegisterStudent } from '../teacher'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'
import { Spinner } from 'keep-react'

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <Spinner color="info" size="lg" />
        )
    }


    return (
        <Routes>

            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/*" element={<LauchPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </>
                    )
                    :
                    (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/create-course" element={<RegisterCouse />} />
                            <Route path="/register-student" element={<RegisterStudent />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
