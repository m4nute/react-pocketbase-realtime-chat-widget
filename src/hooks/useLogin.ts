import { useState } from "react"
import pb from "../lib/pocketbase"

export default function useLogin() {
    const [loading, setLoading] = useState(false)


    async function login({ email, password }: any) {
        setLoading(true)
        try {
            await pb.collection('users').authWithPassword(email, password)
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    return { login, loading }
}