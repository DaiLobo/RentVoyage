import { Camera, Loader2 } from 'lucide-react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DatePicker } from '@/components/DatePicker';
import { showToast } from '@/components/Toast';
import { Button } from '@/components/ui/button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { SignUpService } from '@/services/SignUpService';
import { useFormEdit } from '@/validations/editUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormInput } from '@/components/FormInput';

export function MyProfile() {
  const { t } = useTranslation("profile");
  const edit = useFormEdit();

  const { userAuth } = useAuth();

  const form = useForm<z.infer<typeof edit>>({
    resolver: zodResolver(edit),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: undefined,
      address: "",
      gender: ""
    }
  });
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleEditUser = async (values: z.infer<typeof edit>) => {
    try {
      await SignUpService.registerUser({ uid: userAuth?.uid, ...values, profileImage: file, });

      showToast("success", "Usuário atualizado com sucesso!")
    } catch (error) {
      showToast("error", "Erro ao realizar a edição");
    }
  };

  useEffect(() => {
    if (!userAuth) {
      Router.push("/");
    }

  }, [userAuth])

  return (
    <div className="pt-24 pb-54 grid grid-cols-1 justify-items-center pb-40 w-full">
      <Form {...form}>
        <form
          className="grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-xl"
          onSubmit={form.handleSubmit(handleEditUser)}
        >

          <div className="flex grid-cols-2 gap-4 justify-items-end">
            <p className="flex-1 justify-start justify-self-start text-4xl text-slate-700 pb-8 grow">
              {t("account-settings")}
            </p>

            {/* <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      className="mt-1 rounded-full w-20 h-20 bg-terceary absolute inset-0 opacity-0 cursor-pointer"
                      required
                      {...field}
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center w-20 h-20 bg-terceary rounded-full cursor-pointer"
                  >
                    <Camera className="text-gray-500 bg-transparent" size={24} />
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormInput type="text" control={form.control} name="name" label={t("name.name")} placeholder={t("name.placeholder")} />
            <FormInput type="text" control={form.control} name="lastName" label={t("last-name.name")} placeholder={t("last-name.placeholder")} />
            {/* <FormField
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
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* <FormField
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-500 text-xs left-0" />
                </FormItem>
              )}
            /> */}
          </div>

          <FormInput type="email" control={form.control} name="email" label={t("email.name")} placeholder={t("email.placeholder")} />


          {/* <FormField
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
          /> */}

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

          <DatePicker name="birthDate" label={t("date-birth.name")} placeholder={t("date-birth.placeholder")} />

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("gender.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
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
              disabled={false}
              onClick={() => Router.back()}
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
