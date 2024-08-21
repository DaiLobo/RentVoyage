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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/services/firebaseConfig";
import { useFormRegister } from "@/validations/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/DatePicker";

export function MyProfile() {
  const { t } = useTranslation("profile");
  const register = useFormRegister();

  const form = useForm();

  const handleSignUp = async (values) => {

  };

  return (
    <div className="pt-24 pb-54 grid grid-cols-1 justify-items-center pb-40 w-full">
      <Form {...form}>
        <form
          className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleSignUp)}
        >
          <p className="flex justify-start justify-self-start text-4xl text-slate-700 pb-8">
            Configurações da conta
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>{t("name.name")}</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("name.placeholder")}
                      className="mt-1"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>{t("last-name.name")}</FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder={t("last-name.placeholder")}
                      className="mt-1"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-500 text-xs left-0" />
                </FormItem>
              )}
            />
          </div>

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
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("phone.name")}</FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    type="phone"
                    placeholder={t("phone.placeholder")}
                    className="mt-1"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DatePicker name="dateBirth" label={t("date-birth.name")} placeholder={t("date-birth.placeholder")} />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("address.name")}</FormLabel>
                <FormControl>
                  <Input
                    id="address"
                    type="text"
                    placeholder={t("address.placeholder")}
                    className="mt-1"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("gender.name")}</FormLabel>
                <FormControl>
                  <Input
                    id="gender"
                    type="text"
                    placeholder={t("gender.placeholder")}
                    className="mt-1"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              className="mt-6 hover:bg-destructive/[0.8]"
              type="submit"
              disabled={false}
            >
              {false && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />
              )}
              {t("cancel")}
            </Button>

            <Button
              variant="default"
              className="mt-6"
              type="submit"
              disabled={false}
            >
              {false && (
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

export default MyProfile;
