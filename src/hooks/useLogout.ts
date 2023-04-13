export default function useLogout() {
    pb.authStore.clear()
    setDummy(!dummy)
}