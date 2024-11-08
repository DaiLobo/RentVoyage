import { doc, setDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import Router from "next/router";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/PasswordInput";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/services/firebaseConfig";
import { useFormRegister } from "@/validations/signUp";
import { zodResolver } from "@hookform/resolvers/zod";

export function Register() {
  const { t } = useTranslation("register");
  const register = useFormRegister();

  const form = useForm<z.infer<typeof register>>({
    resolver: zodResolver(register),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (values: z.infer<typeof register>) => {
    try {
      const result = await createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      if (result?.user) {
        const userData = {
          email: values.email,
          uid: result.user.uid
        };

        await setDoc(doc(db, "users", result.user.uid), userData);

        showToast("success", t("message.success"));
        Router.push("/");
      } else {
        showToast("error", `${t("message.error")} ${error?.message}`);
      }

      /* if (result) {
        showToast("success", t("message.success"));
        Router.push("/");
      } else {
        showToast("error", `${t("message.error")} ${error?.message}`);
      } */
    } catch (erro) {
      showToast("error", `Error: ${error}`);
    }
  };

  return (
    <div className="lg:pt-10 pt-6 pb-16 lg:px-16 px-4 flex flex-1 flex-col gap-8 lg:h-[60vh] items-center justify-items-center">
      <p className="flex justify-start lg:text-4xl text-3xl text-slate-700">
        {t("create-account")}
      </p>

      <Form {...form}>
        <form
          className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-md"
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("email.name")}</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("email.placeholder")}
                    className="mt-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("password.name")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder={t("password.placeholder")}
                    className="mt-1"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute text-red-500 text-xs left-0" />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            className="mt-6"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />
            )}
            {t("continue")}
          </Button>
        </form>
      </Form>

      <span className="pb-1">
        {t("already-have-account")}{" "}
        <Link href="/login" className="underline font-bold">
          {" "}
          {t("click-here")}
        </Link>
      </span>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["register", "common"]))
  }
});

export default Register;
