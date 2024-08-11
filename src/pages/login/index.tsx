import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { auth } from '@/services/firebaseConfig';
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

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSignIn = (values: z.infer<typeof login>) => {
        signInWithEmailAndPassword(values.email, values.password);
    }

    console.log(user)
    return (
        <div className="pt-16 px-20 grid grid-cols-1 gap-8 justify-items-center">
            <p className="flex justify-start text-4xl text-slate-700">
                Login
            </p>

            <Form {...form}>
                <form
                    className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-md"
                    onSubmit={form.handleSubmit(handleSignIn)}
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

                    <Button variant="default" className="mt-6" type='submit'>Entrar</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login;