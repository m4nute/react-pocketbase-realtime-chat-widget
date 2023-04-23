import pb from './lib/pocketbase'
import { useQuery } from '@tanstack/react-query'

export default function App() {

  const userEmail = pb.authStore.model?.email

  const getUserChats = async () => {
    return await pb.collection('chats').getFullList({
      sort: 'created',
      expand: 'users',
      filter: `users ~ '${pb.authStore.model?.id}'`
    })
  }

  const { data, isLoading } = useQuery({ queryKey: ['userChats'], queryFn: getUserChats })

  // useEffect(() => {
  //   pb.collection('chats').subscribe('', () => {

  //   })
  // }, [third])



  return (
    <>
      <h1>Your email is {userEmail}</h1>
      <div>
        <h2>Chats:</h2>
        {isLoading && 'loading'}
        {data?.map((chat: any, index) => {
          return <div key={index}>
            {chat.expand.users[0].id === pb.authStore.model?.id ? chat.expand.users[1].username : chat.expand.users[0].username}
          </div>
        })}
      </div>
    </>
  )
}



