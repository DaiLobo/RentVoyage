import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Router from 'next/router';
import { MouseEvent, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/services/firebaseConfig';

export function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);

        Router.push("/login");
    }

    return (
        <div className="pt-16 px-20 grid grid-cols-1 gap-8 justify-items-center">
            <p className="flex justify-start text-4xl text-slate-700">
                Criar conta
            </p>

            <div className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-md">{/*  form */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Insira seu e-mail"
                        className="mt-1"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Insira sua senha"
                        className="mt-1"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Button variant="default" className="mt-2" onClick={handleSignUp} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin bg-transparent" />}
                    Continuar
                </Button>
            </div>

            <Link href='/login' className='underline'>Já tem uma conta? Clique aqui</Link>
        </div>
    )
}

export default Register;