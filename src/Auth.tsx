import { useState } from 'react'
import pb from './lib/pocketbase'
import { useForm } from 'react-hook-form'

export default function Auth() {

    const { register, handleSubmit } = useForm()

    const [loading, setLoading] = useState(false)

    async function login(data: any) {
        setLoading(true)
        const authData = await pb.collection('users').authWithPassword(data.email, data.password)
        setLoading(false)
    }

    return <>
        Logged in: {pb.authStore.isValid.toString()}
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder='email' {...register('email')} />
            <input type="password" placeholder='password' {...register('password')} />
            <button type='submit'>Login</button>
        </form>
    </>

}