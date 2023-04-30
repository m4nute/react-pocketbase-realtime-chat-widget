import pb, {
  createMessage,
  createNewChat,
  updateTotalMessages,
} from "./lib/pocketbase"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  let fp: string | null

  useEffect(() => {
    fp = localStorage.getItem("fingerprint")
    if (!fp) localStorage.setItem("fingerprint", crypto.randomUUID().replace(/-/g, '').slice(0, 15))
  }, [])

  async function onSubmit({ message }: any) {
    fp = localStorage.getItem("fingerprint")
    if (!fp) return
    reset()
    try {
      await pb
        .collection("chats")
        .getFirstListItem(`id="${fp}"`)

      createMessage({ text: message, chatId: fp })
      updateTotalMessages(fp)
    } catch (error) {
        await createNewChat(fp)
        createMessage({ text: message, chatId: fp, admin: false })
    }
  }

  const { register, handleSubmit, watch, reset } = useForm()

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Chat with the admin..."
          {...register("message")}
        />
        <button type="submit" disabled={!watch("message")}>
          Submit
        </button>
      </form>
    </>
  )
}
