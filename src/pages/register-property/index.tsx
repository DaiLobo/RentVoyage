import { Loader2 } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PropertyForm } from "@/components/PropertyForm";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { PropertyService } from "@/services/PropertyService";
import { useRegisterProperty } from "@/validations/registerProperty";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterProperty() {
  const { t } = useTranslation("property");
  const { userAuth, userData, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);

  // const [files, setFiles] = useState<File[]>();
  const property = useRegisterProperty();

  const form = useForm<z.infer<typeof property>>({
    resolver: zodResolver(property),
    defaultValues: {
      name: "",
      address: "",
      propertyType: "",
      description: "",
      price: "",
      capacity: ""
    }
  });

  const handleRegisterProperty = async (values: z.infer<typeof property>) => {
    try {
      const result = await PropertyService.registerProperty(values)

      if (result) {
        showToast("success", "Propriedade cadastrada com sucesso!");
        form.reset();
      } else {
        showToast("error", "Erro ao realizar o cadastro");
      }

      setLoading(false);
    } catch (error) {
      showToast("error", "Erro ao realizar o cadastro");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userAuth) {
      Router.push("/");
    }

  }, [userAuth])

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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["property", "common"]))
  }
});

export default RegisterProperty;

