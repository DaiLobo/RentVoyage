import { HotelIcon, LogOutIcon, MapPinned } from "lucide-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

import LanguageSelector from "../components/LanguageSelector";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function HeaderResponsive() {
  const { t } = useTranslation("common");
  const { userAuth, userData, logOut } = useAuth();
  const router = useRouter();

  const isAuthPage = router.pathname === "/login" || router.pathname === "/register";

  return (
    <header className="bg-primary mt-4 mb-4 px-8">
      <div className="flex flex-1 flex-col h-full w-full">

        <div className="flex flex-1 flex-row flex-wrap justify-between items-baseline">
          <div className="-ml-4 w-1/2">
            <Link href="/" legacyBehavior passHref>
              <Image
                src="/assets/logo_h_small.png"
                alt="rentvoyage"
                width={200}
                height={100}
              />
            </Link>
          </div>

          <div className="flex gap-2 p-4 pr-0">
            <LanguageSelector />
            <div className="flex items-center space-x-2">
              {userAuth ? (
                <Popover>
                  <PopoverTrigger asChild>
                    {/* <div className="grid grid-rows-2 justify-items-center"> */}
                    <button className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        // @ts-ignore
                        src={(userData?.profileImage || userAuth?.photoURL) ?? "/assets/avatar.png"}
                        alt="Profile"
                        objectFit="cover"
                        layout="fill"
                      // width={50}
                      // height={50}
                      />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-40 p-1 flex flex-col items-end gap-2">
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

        {!isAuthPage ? (
          <div className="flex items-center">
            <div className="flex-1 overflow-x-auto scrollbar-hide pl-24">
              <NavigationMenu className="flex space-x-2">
                <NavigationMenuList>
                  <NavigationMenuItem className="-ml-[56px]">
                    <Link href="/" legacyBehavior passHref>
                      <Badge
                        variant="outline"
                        className="pr-4 py-2 cursor-pointer border-0 text-md font-semibold hover:bg-[#FFF4F4] border-transparent"
                      >
                        {t("home")}
                      </Badge>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <Badge
                        variant="outline"
                        className="px-4 py-2 cursor-pointer border-0 text-md font-semibold hover:bg-[#FFF4F4] border-transparent"
                      >
                        {t("about")}
                      </Badge>
                    </Link>
                  </NavigationMenuItem>

                  {userAuth && <NavigationMenuItem>
                    <Link href="/register-property" legacyBehavior passHref>
                      <Badge
                        variant="outline"
                        className="px-4 py-2 cursor-pointer border-0 text-md font-semibold hover:bg-[#FFF4F4] border-transparent"
                      >
                        {t("list-property")}
                      </Badge>
                    </Link>
                  </NavigationMenuItem>}

                  {!userAuth && (
                    <>
                      <NavigationMenuItem>
                        <Link href="/register" legacyBehavior passHref>
                          <Badge
                            variant="outline"
                            className="px-4 py-2 cursor-pointer border-0 text-md font-semibold hover:bg-[#FFF4F4] border-transparent"
                          >
                            {t("register")}
                          </Badge>
                        </Link>
                      </NavigationMenuItem>

                      <NavigationMenuItem>
                        <Link href="/login" legacyBehavior passHref>
                          <Badge
                            variant="outline"
                            className="px-4 py-2 cursor-pointer border-0 text-md font-semibold hover:bg-[#FFF4F4] border-transparent"
                          >
                            {t("login")}
                          </Badge>
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <Link href="/booking" legacyBehavior passHref>
              <a
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "ml-2 text-base bg-primary py-2 px-4 rounded-lg"
                )}
              >
                {t("reserve")}
              </a>
            </Link>
          </div>
        ) : null}

      </div>
    </header>
  );
}
