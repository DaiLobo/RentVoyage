
import { useTranslation } from "next-i18next";

import { FacebookLogo, GithubLogo, InstagramLogo } from "@phosphor-icons/react";

import { Separator } from "./ui/separator";

export const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-secondary text-white py-8 bottom-0 xs:bottom-10 w-auto">
      <div className="bg-secondary container mx-auto px-4">
        <div className=" bg-secondary flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 md:mb-0 mb-6 bg-secondary">
            <Separator className="w-20 h-1 mb-2 rounded" />

            <h2 className="font-bold text-white text-xl">
              {t("footer.call")}
            </h2>

            <p className="mt-4 text-gray-300">(21) 3456-7890</p>
          </div>

          <div className="bg-secondary w-full md:w-1/4 mb-6 md:mb-0">
            <Separator className="w-20 h-1 mb-2 rounded" />

            <h2 className="font-bold mb-4 text-white text-xl">
              {t("footer.contact")}
            </h2>

            <ul className="bg-secondary">
              <li className="mb-2 bg-secondary text-gray-300">
                Email: contato@rentvoyage.com
              </li>
              <li className="mb-2 bg-secondary text-gray-300">
                {t("footer.phone")}: +55 (21) 99999-9999
              </li>
              <li className="mb-2 bg-secondary text-gray-300">{t("footer.address")}: Av. Exemplo, 123, Pernambuco, PE</li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 bg-secondary">
            <Separator className="w-20 h-1 mb-2 rounded" />

            <h2 className="font-bold mb-4 bg-secondary text-white text-xl">
              {t("footer.follow")}
            </h2>

            <ul className="flex space-x-4 bg-secondary">
              <li className="bg-secondary">
                <a
                  className="bg-secondary"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FacebookLogo size={28} color="white" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo size={28} color="white" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/DaiLobo/RentVoyage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo size={28} color="white" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="w-full mt-8 rounded" />

        <div className="mt-6 text-center text-gray-400 bg-transparent ">
          <p className="text-white">
            &copy; {new Date().getFullYear()} RentVoyage. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
