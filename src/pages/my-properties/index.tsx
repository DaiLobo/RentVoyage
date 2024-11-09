import { FileIcon, PencilIcon, Search } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
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
  const { t } = useTranslation("property");

  if (!properties) {
    return <div className="flex flex-row gap-1 pt-28 pb-40 px-2 justify-center pb-40 w-full">
      <FileIcon className="justify-self-end" /> {t("not-found")}
    </div>
  }

  const handleEditClick = (propertyId?: string) => {
    if (propertyId) {
      Router.push(`/my-properties/edit/${propertyId}`);
    } else {
      showToast("error", "Ocorreu um erro, tente novamente!");
    }
  };

  const handleViewClick = (propertyId?: string) => {
    if (propertyId) {
      Router.push(`/my-properties/view/${propertyId}`);
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
    <div className="bg-white lg:pt-12 pt-8 lg:pb-40 pb-0 lg:px-16 px-4 grid grid-cols-1 justify-items-center w-full">
      <div className="grid justify-items-center lg:pb-40 pb-16 w-full">

        <p className="flex-1 justify-start justify-self-start lg:text-4xl sm:text-3xl text-2xl text-slate-700 pb-8 grow">
          {t("properties")}
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name.name")}</TableHead>
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
                  <TableCell className="min-w-[180px]">{property.address}</TableCell>
                  <TableCell className="text-right">R${property?.price || 0}</TableCell>
                  <TableCell>
                    <div className="flex gap-8 justify-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <PencilIcon size={20} onClick={() => handleEditClick(property.id)} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("edit")}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Search size={20} onClick={() => handleViewClick(property.id)} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {t("details")}
                        </TooltipContent>
                      </Tooltip>
                    </div>
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
      ...(await serverSideTranslations(locale ?? "pt", ["property", "chat", "common"]))
    }
  };
};

export default MyProperties;