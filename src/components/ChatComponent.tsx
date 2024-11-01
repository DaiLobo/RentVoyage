import React, { Dispatch, SetStateAction } from "react";

import { PaperPlaneTilt } from "@phosphor-icons/react";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "./ui/drawer";
import { Input } from "./ui/input";

interface ChatComponentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ isOpen, setIsOpen }) => {
  return <Drawer open={isOpen} onOpenChange={setIsOpen} direction="bottom">
    <DrawerOverlay className="bg-black bg-opacity-30" />
    <DrawerContent className="left-auto w-1/3 max-w-sm bg-white border border-gray-300 rounded-t-lg shadow-lg">
      <header className="p-4 border-b">
        <h2 className="text-lg font-bold text-slate-700">Chat com o proprietário</h2>
      </header>

      <div className="p-4 flex flex-1 flex-col">
        <p className="text-gray-600">Digite sua mensagem abaixo:</p>

        <div className="mt-4 space-y-2">
          <div className="bg-secondary/25 p-2 rounded-lg text-gray-700 w-1/2">
            <span className="text-sm font-semibold">Proprietário</span> <br />
            Olá! Como posso te ajudar?
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end" >
          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            className="w-full mt-6 p-2 border border-gray-300 rounded"
          />
          <Button className="w-full mt-4 p-2 bg-terceary hover:bg-secondary/50 text-white hover:font-bold rounded gap-4">Enviar <PaperPlaneTilt size={20} /> </Button>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
}