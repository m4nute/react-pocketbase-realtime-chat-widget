import { useQuery } from "@tanstack/react-query"
import pb, {
  createMessage,
  createNewChat,
  getChatMessages,
  updateTotalMessages,
} from "./lib/pocketbase"
import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import AdminChats from "./AdminChats"

export default function App() {
  let fp: string = localStorage.getItem('fingerprint')!

  useEffect(() => {
    if (!fp) localStorage.setItem("fingerprint", crypto.randomUUID().replace(/-/g, '').slice(0, 15))

    pb.collection("chats").subscribe(fp, function () {
        refetch()
    })
    return () => {
      pb.collection("chats").unsubscribe(fp)
    }
  }, [])

  const { data, refetch } = useQuery({
    queryKey: ["fpChats"],
    queryFn: useCallback(() => getChatMessages(fp), [fp]),
  })

  async function onSubmit({ message }: any) {
    if (!fp) return
    try {
      await pb
        .collection("chats")
        .getFirstListItem(`id="${fp}"`)

      createMessage({ text: message, chatId: fp })
      updateTotalMessages(fp)
    } catch (error) {
        await createNewChat(fp)
        createMessage({ text: message, chatId: fp, admin: false })
        setTimeout(() => {
        refetch()
        }, 100);

    }
    reset()
  }

  const { register, handleSubmit, watch, reset } = useForm()

  return (
    <div id="flex">
      <AdminChats data={data} />
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
    </div>
  )
}
