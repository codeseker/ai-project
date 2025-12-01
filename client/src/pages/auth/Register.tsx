import { SignupForm, type RegisterSchema } from '@/components/signup-form'
import React from 'react'

function Register() {
    const handleRegister = async (data: RegisterSchema) => {
        console.log('Data: ', data);
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-6">
                <SignupForm onSubmit={handleRegister} />
            </div>
        </div>
    )
}

export default Register