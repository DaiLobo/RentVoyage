import { Loader2 } from 'lucide-react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { login } from '@/validations/signIn';
import { zodResolver } from '@hookform/resolvers/zod';

export function Login() {
    const { t } = useTranslation('login');

    const form = useForm<z.infer<typeof login>>({
        resolver: zodResolver(login),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { handleSignIn, signInWithGoogle, loading, error } = useAuth();

    const handleOnSubmit = async (values: z.infer<typeof login>) => {
        try {
            await handleSignIn(values.email, values.password);
            form.reset();
        } catch (error) {
            toast.error(`${t("message.error")}`, {
                className: "bg-transparent text-red-500",
            })
            console.log(error);
        }

    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            toast(`Error: ${error}`, {
                className: "bg-transparent text-red-500",
            })
        }
    }

    return (
        <div className="pt-16 px-20 grid grid-cols-1 gap-8 justify-items-center">
            <p className="flex justify-start text-4xl text-slate-700">
                Login
            </p>

            <Form {...form}>
                <form
                    className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-md"
                    onSubmit={form.handleSubmit(handleOnSubmit)}
                >

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel>{t("email.name")}</FormLabel>
                                <FormControl>
                                    <Input id="email"
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
                                    <Input id="password"
                                        type="password"
                                        placeholder={t("password.placeholder")}
                                        className="mt-1"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="absolute text-red-500 text-xs left-0" />
                            </FormItem>
                        )}
                    />

                    <Button variant="default" className="mt-6" type='submit' disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />}
                        {t("enter")}
                    </Button>
                </form>
            </Form>

            <div className="flex flex-1 flex-col space-y-4 items-center">
                <div className="flex items-center justify-center w-full max-w-28 ">
                    <Separator />
                    <span className="mx-4">{t("or")}</span>
                    <Separator />
                </div>

                <Button variant="outline" className='gap-2' onClick={handleGoogleSignIn}>
                    <Image src="/assets/google_icon.webp" alt="Google" width={18} height={18} className='bg-transparent' />
                    <span className='hover:text-primary'>{t("enter-google")}</span>
                </Button>
            </div>

            <span className='pt-8'>{t("dont-have-account")} <Link href='/register' className='underline font-bold'> {t("click-here")}</Link></span>

        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({
    locale,
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'pt', ['login'])),
    },
})

export default Login;