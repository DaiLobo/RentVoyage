import { Loader2 } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { FormTextArea } from "@/components/FormTextArea";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { PropertyService } from "@/services/PropertyService";
import { listTypeProperty } from "@/utils/list";
import { useRegisterProperty } from "@/validations/registerProperty";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterProperty() {
  const { t } = useTranslation("profile");
  const { userAuth, userData, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const property = useRegisterProperty();

  const form = useForm<z.infer<typeof property>>({
    resolver: zodResolver(property),
    defaultValues: {
      name: "",
      address: "",
      propertyType: "",
      description: "",
    }
  });

  const handleEditUser = async (values: z.infer<typeof property>) => {
    try {
      console.log(values)
      const result = await PropertyService.registerProperty(values)

      if (result) {
        showToast("success", "Propriedade cadastrada com sucesso!");
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
        Anuncie
      </p>
      <Form {...form}>
        <form
          className="grid grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleEditUser)}
        >
          <div className="grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-xl">
            <FormInput required type="text" control={form.control} name="name" label={t("name.name")} placeholder={t("name.placeholder")} />
            <FormInput required type="text" control={form.control} name="address" label={t("address.name")} placeholder={t("address.placeholder")} />
            <FormSelect control={form.control} listOptions={listTypeProperty} name="propertyType" label="Tipo da propriedade" placeholder="Tipo da propriedade" />
          </div>

          <FormTextArea control={form.control} name="description" label="Descrição" placeholder="Descrição" />

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
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
    ...(await serverSideTranslations(locale ?? "pt", ["profile", "common"]))
  }
});

export default RegisterProperty;

