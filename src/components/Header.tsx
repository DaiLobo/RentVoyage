import { LogOutIcon } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

import LanguageSelector from '../components/LanguageSelector';
import { buttonVariants } from './ui/button';
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
    navigationMenuTriggerStyle
} from './ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function Header() {
    const { t } = useTranslation('common');
    const { userAuth, logOut } = useAuth();
    const router = useRouter();

    const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

    return (
        <header className="relative bg-cover bg-center h-400" style={{ backgroundImage: "url('/assets/paronamic.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="relative flex flex-col h-full">

                <div className="flex fixed top-4 right-4 p-4 space-x-4 pr-32">
                    <LanguageSelector />
                    <div className="flex items-center space-x-4">
                        {userAuth ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="relative w-10 h-10 rounded-full overflow-hidden">
                                        <Image src={userAuth?.photoURL ?? '/assets/avatar.png'} alt="Profile" layout="fill" objectFit="cover" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-60 p-2 flex flex-col items-start gap-2">
                                    <button className="w-full text-left bg-transparent hover:bg-accent hover:text-accent-foreground">
                                        {t("profile")}: <br />
                                        {userAuth.email}
                                    </button>
                                    <button className="w-full flex items-center text-left bg-transparent hover:bg-accent hover:text-accent-foreground"
                                        onClick={logOut}
                                    >
                                        {t("logout")} <LogOutIcon size={20} className='ml-2 bg-transparent' />
                                    </button>
                                </PopoverContent>
                            </Popover>
                        ) : null}
                    </div>
                </div>


                {!isAuthPage ? (
                    <div className="pt-16 flex justify-center space-x-8">

                        <NavigationMenu className="flex justify-center space-x-8 p-2">
                            <NavigationMenuList className="flex items-end space-x-4 p-2">
                                <NavigationMenuItem className='mr-32'>
                                    <Link href="/" legacyBehavior passHref>
                                        <Image src='/assets/logo_h_small.png' alt='rentvoyage' width={200} height={100} />
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {t('home')}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/booking" legacyBehavior passHref>
                                        <NavigationMenuLink className={userAuth ? cn(buttonVariants({ variant: "outline" })) : navigationMenuTriggerStyle()}>
                                            {t("reserve")}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/about" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            {t("about")}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                {!userAuth && (
                                    <>
                                        <NavigationMenuItem className='pl-16'>
                                            <Link href="/register" legacyBehavior passHref>
                                                <NavigationMenuLink className={cn(buttonVariants({ variant: "outline" }))}>
                                                    {t("register")}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <Link href="/login" legacyBehavior passHref>
                                                <NavigationMenuLink className={cn(buttonVariants({ variant: "outline" }))}>
                                                    {t("login")}
                                                </NavigationMenuLink>
                                            </Link>
                                        </NavigationMenuItem>
                                    </>
                                )
                                }
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                ) : null}
            </div>
        </header>
    );
}
