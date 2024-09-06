import { Loader2 } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DropzoneImages } from "@/components/DropzoneImages";
import { PropertyForm } from "@/components/PropertyForm";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { PropertyType } from "@/interfaces/PropertyType";
import { PropertyService } from "@/services/PropertyService";
import { useRegisterProperty } from "@/validations/registerProperty";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditPropertyProps {
  property: PropertyType | null;
  propertyId: string;
}

const EditProperty: React.FC<EditPropertyProps> = ({ property, propertyId }) => {
  const { t } = useTranslation("property");
  const { userAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const propertyEdit = useRegisterProperty();

  if (!property) {
    return <div>Property not found.</div>;
  }

  const form = useForm<z.infer<typeof propertyEdit>>({
    resolver: zodResolver(propertyEdit),
    defaultValues: {
      name: property.name,
      address: property.address,
      propertyType: property.propertyType,
      description: property.description,
      price: property.price,
      capacity: property.capacity
    }
  });

  const handleEditProperty = async (values: z.infer<typeof propertyEdit>) => {
    setLoading(true);

    try {
      const result = await PropertyService.editProperty(propertyId, { ...values, images: files, price: Number(values.price), capacity: Number(values.capacity) });

      if (result) {
        showToast("success", t("message.success.edit"));
        Router.push("/my-properties")
      } else {
        showToast("error", t("message.error.edit"));
      }

    } catch (error) {
      console.error(error);
      showToast("error", t("message.error.edit"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userAuth) {
      Router.push("/");
    }

  }, [userAuth]);

  return (
    <div className="pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <p className="flex-1 justify-center justify-self-center text-4xl text-slate-700 pb-8 grow">
        {t("advertise-edit")}
      </p>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleEditProperty)}
        >
          <PropertyForm />

          <DropzoneImages files={files} setFiles={setFiles} />

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              type="button"
              className="mt-6 hover:bg-destructive/[0.8]"
              disabled={loading}
              onClick={() => Router.back()}
            >
              {t("cancel")}
            </Button>

            <Button
              variant="default"
              className="mt-6"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />
              )}
              {t("save")}
            </Button>
          </div>
        </form>
      </Form>

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const { slug } = context.params!;

  const property = await PropertyService.getProperty(slug as string);

  if (!property) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      property,
      propertyId: slug,
      ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
    }
  };
}

export default EditProperty;
