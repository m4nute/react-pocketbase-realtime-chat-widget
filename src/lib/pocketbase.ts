import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

export default pb


export const createMessage = (data: any) => {
    pb.collection("messages").create(data)
}

export const updateTotalMessages = (id: string) => {
    pb.collection("chats").update(id, {
        "totalMessages+": 1,
      })
}

export const getChatMessages = async (chatId: string) => {
    return await pb
      .collection("messages")
      .getFullList({ filter: `chatId="${chatId}"` })
  }

export const createNewChat = async (fp: string) => {
    return await pb
    .collection("chats")
    .create({ totalMessages: 1, id: fp })
}
