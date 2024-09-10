import { ArrowLeftCircle } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Router from "next/router";
import { parseCookies } from "nookies";

import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from "@/components/ui/carousel";
import { PropertyType } from "@/interfaces/PropertyType";
import { PropertyService } from "@/services/PropertyService";
import { PropertyTypeEnum } from "@/utils/list";

interface MyPropertiesProps extends Omit<PropertyType, "images"> {
  images: string[] | null;
}

export function PropertyView({ name, description, address, images, propertyType, capacity, price }: MyPropertiesProps) {
  const { t } = useTranslation("property");

  return (
    <div className="grid pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <div className="flex flex-row gap-8 justify-items-start items-baseline w-1/2">
        <ArrowLeftCircle size={28} className="cursor-pointer" onClick={() => Router.push("/my-properties")} />

        <div>
          <p className="flex-1 justify-start justify-self-start text-4xl text-slate-700 pb-2 grow">{name}</p>
          <p className="flex-1 justify-start justify-self-start text-xl text-slate-500 pb-8 grow">
            {t("details-property")}
          </p>
        </div>
      </div>

      {
        images && images?.length > 0 ?
          <Carousel className="w-1/4">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image src={image} alt="" width={650} height={650} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-bgcolor" />
            <CarouselNext className="bg-bgcolor" />
          </Carousel>
          : null
      }

      <div className="grid grid-row-4 w-1/2 mt-12 ml-32 gap-2">
        <div className="flex flex-row gap-1 text-lg">
          <p className="font-semibold">{t("address.name")}:</p> {address}
        </div>
        <div className="flex flex-row gap-1 text-lg">
          {/* @ts-ignore */}
          <p className="font-semibold">{t("description.name")}:</p> {description} - {PropertyTypeEnum[propertyType]}
        </div>
        {price ? <div className="flex flex-row gap-1 text-lg">
          <p className="font-semibold">{t("price.name")}:</p> R${price?.toFixed(2)}
        </div> : null}
        {capacity && <div className="flex flex-row gap-1 text-lg">
          <p className="font-semibold">{t("capacity.name")}:</p> {capacity} {t("person")}
        </div>}
      </div>
    </div>
  )

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const cookies = parseCookies(context);
  const uid = cookies.uid;
  const { slug } = context.params!;

  const property = await PropertyService.getProperty(slug as string);

  if (!uid) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...property,
      ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
    }
  };
};

export default PropertyView;