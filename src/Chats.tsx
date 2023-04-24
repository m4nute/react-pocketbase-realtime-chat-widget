import { useQuery } from "@tanstack/react-query"
import pb from "./lib/pocketbase"
import { Link } from 'wouter'
export default function Chats() {

    const getUserChats = async () => {
    return await pb.collection('chats').getFullList({
      sort: 'created',
    })
  }

  const { data, isLoading } = useQuery({ queryKey: ['userChats'], queryFn: getUserChats })

  return (
        <div>Chats: 
            {data?.map((chat, index) => {
               return <Link to={`/chats/${chat.userFP}`} key={index}><br />{chat.userFP}</Link>
            })}
        </div>
    )
}
