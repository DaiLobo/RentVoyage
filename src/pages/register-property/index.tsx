import { Loader2 } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PropertyForm } from "@/components/PropertyForm";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PropertyService } from "@/services/PropertyService";
import { useRegisterProperty } from "@/validations/registerProperty";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterProperty() {
  const { t } = useTranslation("property");
  const [loading, setLoading] = useState(false);

  // const [files, setFiles] = useState<File[]>();
  const property = useRegisterProperty();

  const form = useForm<z.infer<typeof property>>({
    resolver: zodResolver(property),
    defaultValues: {
      name: "",
      address: "",
      propertyType: undefined,
      description: "",
      price: 0,
      capacity: 0
    }
  });

  const handleRegisterProperty = async (values: z.infer<typeof property>) => {
    try {
      const result = await PropertyService.registerProperty({ ...values, price: Number(values.price), capacity: Number(values.capacity) })

      if (result) {
        showToast("success", t("message.success.create"));
        form.reset();
      } else {
        showToast("error", t("message.error.create"));
      }

      setLoading(false);
    } catch (error) {
      showToast("error", t("message.error.create"));
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <p className="flex-1 justify-center justify-self-center text-4xl text-slate-700 pb-8 grow">
        {t("advertise")}
      </p>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleRegisterProperty)}
        >

          <PropertyForm />

          {/* <DropzoneImages files={files} setFiles={setFiles} /> */}

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

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
    }
  };
};

export default RegisterProperty;

