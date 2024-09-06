import { Camera, Loader2 } from "lucide-react";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "@/components/DatePicker";
import { FormInput } from "@/components/FormInput";
import { showToast } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { UserType } from "@/interfaces/UserType";
import { GetUserService } from "@/services/GetUserService";
import { SignUpEditService } from "@/services/SignUpEditService";
import { convertFirebaseDateToJSDate } from "@/utils/format";
import { useFormEdit } from "@/validations/editUser";
import { zodResolver } from "@hookform/resolvers/zod";

export function MyProfile() {
  const { t } = useTranslation("profile");
  const { userAuth, userData, setUserData } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(userData?.profileImage as unknown as string);
  const [loading, setLoading] = useState(false);
  const edit = useFormEdit();

  const form = useForm<z.infer<typeof edit>>({
    resolver: zodResolver(edit),
    defaultValues: {
      name: userData?.name,
      lastName: userData?.lastName,
      email: userData?.email,
      phone: userData?.phone,
      birthDate: convertFirebaseDateToJSDate(userData?.birthDate as any),
      address: userData?.address,
      gender: userData?.gender
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profileImage", file);
    }
  };

  const handleEditUser = async (values: z.infer<typeof edit>) => {
    setLoading(true);
    try {
      const existUser = await GetUserService.getUser();

      if (existUser) {
        await SignUpEditService.editUser(existUser.ref, { ...values });
      } else {
        await SignUpEditService.registerUser({ uid: userAuth?.uid, ...values });
      }

      const updateUser = await GetUserService.getUser();
      if (updateUser) setUserData(updateUser.data() as UserType);

      showToast("success", t("message.success"));
      setLoading(false);
    } catch (error) {
      showToast("error", t("message.error"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userAuth) {
      Router.push("/");
    }

  }, [userAuth]);

  return (
    <div className="pt-28 pb-40 px-2 grid grid-cols-1 justify-items-center pb-40 w-full">
      <Form {...form}>
        <form
          className="grid grid-rows-8 grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleEditUser)}
        >

          <div className="flex grid-cols-2 gap-4 justify-items-end">
            <p className="flex-1 justify-start justify-self-start text-4xl text-slate-700 pb-8 grow">
              {t("account-settings")}
            </p>

            <div className="relative -mt-6">
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                className="mt-1 rounded-full w-20 h-20 bg-terceary absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profileImage"
                className="flex items-center justify-center w-20 h-20 bg-terceary rounded-full cursor-pointer"
              >
                {
                  selectedImage ? <img src={selectedImage} alt="Profile Preview" className="w-full h-full object-cover rounded-full" />
                    : <Camera className="text-gray-500 bg-transparent" size={24} />
                }
              </label>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormInput required type="text" control={form.control} name="name" label={t("name.name")} placeholder={t("name.placeholder")} />
            <FormInput type="text" control={form.control} name="lastName" label={t("last-name.name")} placeholder={t("last-name.placeholder")} />
          </div>

          <FormInput type="email" control={form.control} name="email" label={t("email.name")} placeholder={t("email.placeholder")} />
          <FormInput required type="phone" control={form.control} name="phone" label={t("phone.name")} placeholder={t("phone.placeholder")} />

          <DatePicker required name="birthDate" label={t("date-birth.name")} placeholder={t("date-birth.placeholder")} />

          <FormInput type="text" control={form.control} name="address" label={t("address.name")} placeholder={t("address.placeholder")} />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>{t("gender.name")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("gender.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="female">{t("gender.female")}</SelectItem>
                    <SelectItem value="male">{t("gender.male")}</SelectItem>
                    <SelectItem value="other">{t("gender.other")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default MyProfile;
