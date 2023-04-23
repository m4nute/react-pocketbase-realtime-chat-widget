import pb from './lib/pocketbase'
import { useForm } from 'react-hook-form'
import useLogout from './hooks/useLogout'
import useLogin from './hooks/useLogin'

export default function Auth() {

    const loggedIn = pb.authStore.isValid
    const logout = useLogout()
    const { mutate, isLoading, isError } = useLogin()
    const { register, handleSubmit, reset } = useForm()


    async function onSubmit(data: any) {
        mutate({ email: data.email, password: data.password })
        reset()
    }

    if (loggedIn) return <>
        Logged In: {pb.authStore.model?.email}
        <br />
        <button onClick={logout}>Log Out</button>
    </>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading && 'Loading...'}
            {isError && 'Invalid Email or Password'}

            <input type="text" placeholder='email' {...register('email')} />
            <input type="password" placeholder='password' {...register('password')} />
            <button type='submit' disabled={isLoading}>{isLoading ? "Loading" : "Login"}</button>
        </form>
    )
}