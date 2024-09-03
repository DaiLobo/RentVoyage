import { FileIcon, PencilIcon, Search } from "lucide-react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { parseCookies } from "nookies";

import { showToast } from "@/components/Toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PropertyType } from "@/interfaces/PropertyType";
import { PropertyService } from "@/services/PropertyService";
import { PropertyTypeEnum } from "@/utils/list";

interface MyPropertiesProps {
  properties: PropertyType[] | null
}

export function MyProperties({ properties }: MyPropertiesProps) {
  if (!properties) {
    return <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
      <FileIcon className="justify-self-end" /> Não existe propriedades cadastradas
    </div>
  }

  const handleEditClick = (propertyId?: string) => {
    if (propertyId) {
      Router.push(`/property/edit/${propertyId}`);
    } else {
      showToast("error", "Ocorreu um erro, tente novamente!");
    }
  };

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <div className="grid justify-items-center pb-40 w-1/2">

        <p className="flex-1 justify-start justify-self-start text-4xl text-slate-700 pb-8 grow">
          Propriedades
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead className="text-right">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              properties?.map((property) =>
              (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  {/* @ts-ignore */}
                  <TableCell>{PropertyTypeEnum[property.propertyType]}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell className="text-right">R$250.00</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PencilIcon size={20} onClick={() => handleEditClick(property.id)} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Search size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        Ver mais detalhes
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>)
              )
            }
          </TableBody>
        </Table>
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
      ...(await serverSideTranslations(locale ?? "pt", ["profile", "common"]))
    }
  };
};

export default MyProperties;