import { FileIcon, PencilIcon, Search } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";

import { ChatComponent } from "@/components/ChatComponent";
import { showToast } from "@/components/Toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PropertyType } from "@/interfaces/PropertyType";
import { PropertyService } from "@/services/PropertyService";
import { PropertyTypeEnum } from "@/utils/list";
import { ChatCircleText } from "@phosphor-icons/react";

interface MyPropertiesProps {
  properties: PropertyType[] | null
}

export function MyProperties({ properties }: MyPropertiesProps) {
  const { t } = useTranslation("property");
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState("");

  if (!properties) {
    return <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
      <FileIcon className="justify-self-end" /> {t("not-found")}
    </div>
  }

  const handleEditClick = (propertyId?: string) => {
    if (propertyId) {
      Router.push(`/property/edit/${propertyId}`);
    } else {
      showToast("error", "Ocorreu um erro, tente novamente!");
    }
  };

  const handleViewChat = (reservationId: string) => {
    setIsOpen(true);
    setChatId(reservationId ?? "");
  }

  const handleViewClick = (propertyId?: string) => {
    if (propertyId) {
      Router.push(`/property/view/${propertyId}`);
    } else {
      showToast("error", "Ocorreu um erro, tente novamente!");
    }
  };

  // useEffect(() => {
  //   if (!userAuth) {
  //     Router.push("/");
  //   }

  // }, [userAuth]);

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <div className="grid justify-items-center pb-40 w-3/4">

        <p className="flex-1 justify-start justify-self-start text-4xl text-slate-700 pb-8 grow">
          {t("properties")}
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">{t("name.name")}</TableHead>
              <TableHead>{t("type-property.name")}</TableHead>
              <TableHead>{t("address.name")}</TableHead>
              <TableHead className="text-right">{t("price.name")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              properties?.map((property) =>
              (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{PropertyTypeEnum[property.propertyType]}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell className="text-right">R${property?.price || 0}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PencilIcon size={20} onClick={() => handleEditClick(property.id)} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("edit")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="text-right cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ChatCircleText size={22} onClick={() => handleViewChat("yh3PBMqSm7WYBvgYWSDD")} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{"Ver chat"}</p> {/* TRADUÇÃO AQUI ------------------ */}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="text-right cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Search size={20} onClick={() => handleViewClick(property.id)} />
                      </TooltipTrigger>
                      <TooltipContent>
                        {t("details")}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>)
              )
            }
          </TableBody>
        </Table>
      </div>

      <div className="absolute bottom-0 right-0">
        <ChatComponent isOpen={isOpen} setIsOpen={setIsOpen} chatId={chatId} />
      </div>
    </div>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const cookies = parseCookies(context);
  const uid = cookies.uid;

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const properties = await PropertyService.getProperties(uid);

  return {
    props: {
      properties,
      ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
    }
  };
};

export default MyProperties;