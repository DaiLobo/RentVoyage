import { onValue, push, ref, set } from "firebase/database";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { PaperPlaneTilt } from "@phosphor-icons/react";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "./ui/drawer";
import { Input } from "./ui/input";
import { auth, realTimedatabase } from "@/services/firebaseConfig";

interface ChatComponentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  chatId: string;
  receiverId?: string;
}

interface Message {
  id: string
  userId: string;
  // roomId: string;
  // sender: string;
  // receiver: string;
  message: string;
  sendTime: string;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ isOpen, setIsOpen, chatId, receiverId }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      e.preventDefault(); // Evita a quebra de linha no input
      sendMessage();
    }
  };

  //Para atualizar o chat
  useEffect(() => {

    const messagesRef = ref(realTimedatabase, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      const loadedMessages = messagesData
        ? Object.values(messagesData)
        : [];
      setMessages(loadedMessages as Message[]);
    });

    return () => unsubscribe(); //remover o listener qndo termina para evitar vazamento de memória
  }, [chatId]);


  const sendMessage = async () => {
    if (auth.currentUser && newMessage.trim()) {
      const userId = auth.currentUser.uid;
      const sendTime = Date.now();

      // Cria uma referência com um ID único para a nova mensagem.
      const messageRef = push(ref(realTimedatabase, `chats/${chatId}/messages`));

      // Salva a mensagem no caminho `chats/{chatId}/messages/{uniqueMessageId}`.
      await set(messageRef, {
        userId,
        message: newMessage,
        sendTime
      });

      // Limpa o campo de entrada após a mensagem ser enviada.
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
      <DrawerOverlay className="bg-black bg-opacity-30" />
      <DrawerContent className="left-auto w-1/3 max-w-sm bg-white border border-gray-300 rounded-t-lg shadow-lg">
        <header className="p-4 border-b">
          <h2 className="text-lg font-bold text-slate-700">Chat com o proprietário</h2>
        </header>

        <div className="h-96 overflow-y-auto p-4 flex flex-1 flex-col custom-scroll">
          <p className="text-gray-600">Digite sua mensagem abaixo:</p>

          <div className="grid mt-4 space-y-2">
            {messages.map((message, index) => (
              <div key={index} className={`justify-self-${message.userId === auth.currentUser?.uid ? "end" : "start"} flex flex-col bg-secondary/25 p-2 rounded-lg text-gray-700 w-1/2`}>
                <p className="text-base font-semibold">{message.userId === auth.currentUser?.uid ? "Você" : "Proprietário"}</p>
                <p className="text-base">{message.message}</p>
                <p className="text-xs self-end">{new Date(message.sendTime).toLocaleTimeString()}</p>
              </div>
            ))
            }

            <div ref={endOfMessagesRef} />

          </div>

          <div className="flex flex-1 flex-col justify-end" >
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyDown={handleKeyDown}
              className="w-full mt-6 p-2 border border-gray-300 rounded"
            />
            <Button
              className="w-full mt-4 p-2 bg-terceary hover:bg-secondary/50 text-white hover:font-bold rounded gap-4"
              onClick={sendMessage}
            >
              Enviar <PaperPlaneTilt size={20} />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}