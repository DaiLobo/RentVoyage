import { HotelIcon, LogOutIcon, MapPinned } from "lucide-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import LanguageSelector from "../components/LanguageSelector";
import HeaderResponsive from "./HeaderResponsive";
import { buttonVariants } from "./ui/button";
import {
  NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
  navigationMenuTriggerStyle
} from "./ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Header() {
  const { t } = useTranslation("common");
  const { userAuth, userData, logOut } = useAuth();
  const router = useRouter();

  const isAuthPage = router.pathname === "/login" || router.pathname === "/register";

  return (
    <>
      <div className="block lg:hidden">
        <HeaderResponsive />
      </div>

      <div className="hidden lg:block">
        <header className="bg-primary mt-2 mb-6">
          <div className="relative flex flex-1 flex-row h-full w-full px-16">

            <div className="flex self-center pr-2 space-x-4 justify-start">
              <Link href="/" legacyBehavior passHref>
                <Image
                  src="/assets/logo_h_small.png"
                  alt="rentvoyage"
                  width={200}
                  height={100}
                />
              </Link>
            </div>

            {!isAuthPage ? (
              <div className="flex flex-1 justify-center space-x-6">
                <NavigationMenu className="flex justify-center space-x-6 items-end">
                  <NavigationMenuList className="flex items-end space-x-4">
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {t("home")}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link href="/about" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {t("about")}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    {userAuth && <NavigationMenuItem>
                      <Link href="/register-property" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={
                            userAuth
                              ? cn(
                                buttonVariants({ variant: "ghost" }),
                                "text-base"
                              )
                              : navigationMenuTriggerStyle()
                          }
                        >
                          {t("list-property")}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>}

                    <NavigationMenuItem>
                      <Link href="/booking" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={
                            userAuth
                              ? cn(
                                buttonVariants({ variant: "outline" }),
                                "text-base"
                              )
                              : navigationMenuTriggerStyle()
                          }
                        >
                          {t("reserve")}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>


                    {!userAuth && (
                      <>
                        <NavigationMenuItem className="pl-16">
                          <Link href="/register" legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                buttonVariants({ variant: "outline" }),
                                "text-base"
                              )}
                            >
                              {t("register")}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <Link href="/login" legacyBehavior passHref>
                            <NavigationMenuLink
                              className={cn(
                                buttonVariants({ variant: "outline" }),
                                "text-base"
                              )}
                            >
                              {t("login")}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      </>
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : null}

            <div className="flex self-center mt-4 pl-2 space-x-4 justify-end">
              <LanguageSelector />
              <div className="flex items-center space-x-4">
                {userAuth ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      {/* <div className="grid grid-rows-2 justify-items-center"> */}
                      <button className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          // @ts-ignore
                          src={(userData?.profileImage || userAuth?.photoURL) ?? "/assets/avatar.png"}
                          alt="Profile"
                          layout="fill"
                          objectFit="cover"
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-50 p-2 flex flex-col items-start gap-2">
                      <button className="w-full text-pretty text-left bg-transparent hover:bg-accent hover:text-accent-foreground" onClick={() => router.push("/my-profile")}>
                        {t("profile")}:{" "}
                        {(userData?.name || userAuth?.displayName) ?? "Convidado"}
                      </button>

                      <button className="w-full flex items-center text-left bg-transparent hover:bg-accent hover:text-accent-foreground" onClick={() => router.push("/my-properties")}>
                        {t("properties")}
                        <HotelIcon size={20} className="ml-2" />
                      </button>

                      <button className="w-full flex items-center text-left bg-transparent hover:bg-accent hover:text-accent-foreground" onClick={() => router.push("/my-bookings")}>
                        {t("booking")}
                        <MapPinned size={20} className="ml-2" />
                      </button>

                      <button
                        className="w-full flex items-center text-left bg-transparent hover:bg-accent hover:text-accent-foreground"
                        onClick={logOut}
                      >
                        {t("logout")}{" "}
                        <LogOutIcon size={20} className="ml-2" />
                      </button>
                    </PopoverContent>
                  </Popover>
                ) : null}
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
