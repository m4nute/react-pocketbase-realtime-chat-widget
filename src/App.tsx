import pb from './lib/pocketbase'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
    fp = localStorage.getItem('fingerprint');
    if (!fp) localStorage.setItem('fingerprint', JSON.stringify(crypto.randomUUID()))
  }, []);

  async function onSubmit({message}: any) {
    fp = localStorage.getItem('fingerprint')
    const chatExists = await pb.collection('chats').getFirstListItem(`userFP='${fp}'`);

    if (chatExists) {
      pb.collection('messages').create({text: message, chatId: chatExists.id})
      pb.collection('chats').update(chatExists.id, {totalMessages: chatExists.totalMessages + 1, userFP: fp})
    } 
    
    reset()

  }

  const {register, handleSubmit, watch, reset} = useForm()

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder='Chat with the admin...' {...register('message')}/>
    <button type='submit' disabled={!watch('message')}>Submit</button>
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



