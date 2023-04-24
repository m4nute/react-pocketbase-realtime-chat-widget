import { useRoute } from "wouter";

export default function ChatId() {

  const [match, params] = useRoute("/chats/:userFP");
  
  return <div>chatId</div>;
}
