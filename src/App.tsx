import pb from "./lib/pocketbase"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  let fp: string | null
  const userEmail = pb.authStore.model?.email

  // const getUserChats = async () => {
  //   return await pb.collection('chats').getFullList({
  //     sort: 'created',
  //     expand: 'users',
  //     filter: `users ~ '${pb.authStore.model?.id}'`
  //   })
  // }

  // const { data, isLoading } = useQuery({ queryKey: ['userChats'], queryFn: getUserChats })

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

      pb.collection("messages").create({
        text: message,
        chatId: existentChat.id,
      })
      pb.collection("chats").update(existentChat.id, {
        totalMessages: existentChat.totalMessages + 1,
        userFP: fp,
      })
      return
    } catch (error) {
      const newChat = await pb
        .collection("chats")
        .create({ totalMessages: 1, userFP: fp })
      pb.collection("messages").create({ text: message, chatId: newChat.id })
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
      {/* <div>
        {isLoading && 'loading'}
        {data?.map((chat: any, index) => {
          return <Link key={index} to={`/chats/$chatId`} params={{ chatId: chat.id }}>
            {chat.expand.users[0].id === pb.authStore.model?.id ? chat.expand.users[1].username : chat.expand.users[0].username}
          </Link>
        })}
      </div> */}
    </>
  )
}
