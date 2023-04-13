import pb from "../lib/pocketbase"
import { useState } from 'react'


export default function useLogout() {
    const [dummy, setDummy] = useState(false)

    function logout() {
        pb.authStore.clear()
        setDummy(!dummy)
    }
    return logout
}