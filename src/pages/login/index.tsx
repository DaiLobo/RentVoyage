import { Loader2 } from 'lucide-react';
import Image from 'next/image';
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
    const form = useForm<z.infer<typeof login>>({
        resolver: zodResolver(login),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { handleSignIn, signInWithGoogle, loading } = useAuth();

    const handleOnSubmit = async (values: z.infer<typeof login>) => {
        try {
            await handleSignIn(values.email, values.password);
            form.reset();

        } catch (error) {
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
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input id="email"
                                        type="email"
                                        placeholder="Insira seu e-mail"
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
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input id="password"
                                        type="password"
                                        placeholder="Insira sua senha"
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
                        Entrar
                    </Button>
                </form>
            </Form>

            <div className="flex flex-1 flex-col space-y-4 items-center">
                <div className="flex items-center justify-center w-full max-w-28 ">
                    <Separator />
                    <span className="mx-4">OU</span>
                    <Separator />
                </div>

                <Button variant="outline" className='gap-2' onClick={handleGoogleSignIn}>
                    <Image src="/assets/google_icon.webp" alt="Google" width={18} height={18} />
                    <span> Entrar com Google</span>
                </Button>
            </div>

        </div>
    )
}

export default Login;