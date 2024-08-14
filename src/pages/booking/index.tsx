import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Booking() {
    return (
        <div className=" flex pt-16 px-20 grid gap-16 bg-primary">
            <p className="flex justify-start text-4xl text-slate-700">
                Reserva
            </p>

            <div className="flex flex-1 grid grid-rows-3 grid-cols-1 gap-2 w-full max-w-md justify-center">{/*  form */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Insira seu e-mail" className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="senha">Senha</Label>
                    <Input id="password" type="password" placeholder="Insira sua senha" className="mt-1" />
                </div>

                <Button variant="default">Login</Button>
            </div>
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

export default Booking;