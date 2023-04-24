// @ts-nocheck
import { useRoute } from "wouter"
import pb, { getChatMessages, updateTotalMessages } from "./lib/pocketbase"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { createMessage } from "./lib/pocketbase"
import AdminChats from "./AdminChats"
export default function ChatId() {
  const [match, params] = useRoute("/chats/:id")

  const { data, refetch } = useQuery({
    queryKey: ["userChats"],
    queryFn: useCallback(() => getChatMessages(params?.id), [params?.id]),
  })

  async function onSubmit({ message }: any) {
    reset()
    createMessage({
      text: message,
      chatId: params?.id,
      admin: true,
    })
    params?.id && updateTotalMessages(params.id)
  }

  const { register, handleSubmit, watch, reset } = useForm()

  useEffect(() => {
    params?.id &&
      pb.collection("chats").subscribe(params?.id, function (e) {
        refetch()
      })
    return () => {
      pb.collection("chats").unsubscribe(params?.id)
    }
  }, [])

  return (
    <div>
      <AdminChats data={data} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Text the user"
          {...register("message")}
        />
        <button type="submit" disabled={!watch("message")}>
          Submit
        </button>
      </form>
    </div>
  )
}
