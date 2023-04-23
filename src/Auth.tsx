import { useState } from 'react'
import pb from './lib/pocketbase'
import { useForm } from 'react-hook-form'
import useLogout from './hooks/useLogout'
import useLogin from './hooks/useLogin'

export default function Auth() {

    const logout = useLogout()
    const { login, loading } = useLogin()
    const { register, handleSubmit, reset } = useForm()


    const [dummy, setDummy] = useState(false)

    const loggedIn = pb.authStore.isValid

    async function onSubmit(data: any) {
        login({ email: data.email, password: data.password })
        reset()
    }

    if (loggedIn) return <>
        Logged In: {pb.authStore.model?.email}
        <br />
        <button onClick={logout}>Log Out</button>
    </>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading && 'Loading...'}
            <input type="text" placeholder='email' {...register('email')} />
            <input type="password" placeholder='password' {...register('password')} />
            <button type='submit' disabled={loading}>{loading ? "Loading" : "Login"}</button>
        </form>
    )
}