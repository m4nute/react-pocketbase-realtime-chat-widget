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
    if (!fp) localStorage.setItem("fingerprint", crypto.randomUUID())
  }, [])

  async function onSubmit({ message }: any) {
    reset()
    try {
      fp = localStorage.getItem("fingerprint")
      const existentChat = await pb
        .collection("chats")
        .getFirstListItem(`userFP="${fp}"`)

      createMessage({ text: message, chatId: existentChat.id })
      updateTotalMessages(existentChat.id)
      return
    } catch (error) {
      if (fp) {
        const newChat = await createNewChat(fp)
        createMessage({ text: message, chatId: newChat.id })
      }
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
