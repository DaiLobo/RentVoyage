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
    <header className="bg-primary mt-4 mb-4 px-4">
      <div className="flex flex-1 flex-col h-full w-full">

        <div className="flex flex-1 flex-row flex-wrap justify-between items-baseline">
          <div className="-ml-2 w-1/2">
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
          <div className="flex items-center w-full space-x-2">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2">
                <Link href="/" passHref>
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-0 text-md font-semibold px-4 pl-0 py-2 hover:bg-[#FFF4F4]"
                  >
                    {t("home")}
                  </Badge>
                </Link>

                <Link href="/about" passHref>
                  <Badge
                    variant="outline"
                    className="cursor-pointer border-0 text-md font-semibold px-4 py-2 hover:bg-[#FFF4F4]"
                  >
                    {t("about")}
                  </Badge>
                </Link>

                {userAuth &&
                  <Link href="/register-property" passHref>
                    <Badge
                      variant="outline"
                      className="cursor-pointer border-0 text-md font-semibold px-4 py-2 hover:bg-[#FFF4F4] w-max"
                    >
                      {t("list-property")}
                    </Badge>
                  </Link>
                }

                {!userAuth && (
                  <>
                    <Link href="/register" passHref>
                      <Badge
                        variant="outline"
                        className="cursor-pointer border-0 text-md font-semibold px-4 py-2 hover:bg-[#FFF4F4] w-max"
                      >
                        {t("register")}
                      </Badge>
                    </Link>

                    <Link href="/login" passHref>
                      <Badge
                        variant="outline"
                        className="cursor-pointer border-0 text-md font-semibold px-4 py-2 hover:bg-[#FFF4F4]"
                      >
                        {t("login")}
                      </Badge>
                    </Link>
                  </>
                )}

              </div>

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
