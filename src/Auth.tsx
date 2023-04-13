import pb from './lib/pocketbase'

export default function Auth() {
    return <>Logged in: {pb.authStore.isValid.toString()}</>
}