import { useMutation } from '@tanstack/react-query'
import pb from "../lib/pocketbase"

export default function useLogin() {
    async function login({ email, password }: any) {
        await pb.collection('users').authWithPassword(email, password)
    }

    return useMutation(login)
}