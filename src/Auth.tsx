import { useState } from 'react'
import pb from './lib/pocketbase'
import { useForm } from 'react-hook-form'
import useLogout from './hooks/useLogout'

export default function Auth() {

    const logout = useLogout()

    const { register, handleSubmit } = useForm()

    const [loading, setLoading] = useState(false)

    const [dummy, setDummy] = useState(false)

    const loggedIn = pb.authStore.isValid

    async function login(data: any) {
        setLoading(true)
        try {
            await pb.collection('users').authWithPassword(data.email, data.password)
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)
        setDummy(!dummy)
    }

    if (loggedIn) return <>
        Logged In: {pb.authStore.model?.email}
        <br />
        <button onClick={logout}>Log Out</button>
    </>
    return (
        <form onSubmit={handleSubmit(login)}>
            {loading && 'Loading...'}
            <input type="text" placeholder='email' {...register('email')} />
            <input type="password" placeholder='password' {...register('password')} />
            <button type='submit' disabled={loading}>{loading ? "Loading" : "Login"}</button>
        </form>
    )
}