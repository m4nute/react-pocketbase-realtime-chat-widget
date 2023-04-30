import { useQuery } from "@tanstack/react-query"
import pb from "./lib/pocketbase"
import { Link } from "wouter"
import { useEffect } from "react"

export default function Chats() {
  const getUserChats = async () => {
    return await pb.collection("chats").getFullList({
      sort: "created",
    })
  }

  useEffect(() => {
      pb.collection("chats").subscribe('*', function () {
        refetch()
      })
    return () => {
      pb.collection("chats").unsubscribe('*')
    }
  }, [])

  const { data, refetch } = useQuery({
    queryKey: ["userChats"],
    queryFn: getUserChats,
  })

  return (
    <div>
      Chats:
      {data?.map((chat, index) => {
        return (
          <Link to={`/chats/${chat.id}`} key={index}>
            <br />
            {chat.id}
          </Link>
        )
      })}
    </div>
  )
}
