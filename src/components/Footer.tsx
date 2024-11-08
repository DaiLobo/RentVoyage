
import { useTranslation } from "next-i18next";

import { FacebookLogo, GithubLogo, InstagramLogo } from "@phosphor-icons/react";

import { Separator } from "./ui/separator";

export const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-secondary text-white py-8 lg:px-16 px-8 lg:w-full">
      <div className="flex flex-wrap justify-between space-y-6 lg:space-y-0">
        {/* Telefone */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-start">
          <Separator className="w-20 h-1 mb-2 rounded" />

          <h2 className="font-bold text-white text-xl">
            {t("footer.call")}
          </h2>

          <p className="mt-4 text-gray-300">(21) 3456-7890</p>
        </div>

        {/* Contato */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-center">
          <ul>
            <li>
              <Separator className="w-20 h-1 mb-2 rounded" />
              <h2 className="font-bold mb-4 text-white text-xl">
                {t("footer.contact")}
              </h2>
            </li>

            <li className="mb-2 text-gray-300">
              Email: contato@rentvoyage.com
            </li>
            <li className="mb-2 text-gray-300">
              {t("footer.phone")}: +55 (21) 99999-9999
            </li>
            <li className="mb-2 text-gray-300">{t("footer.address")}: Av. Exemplo, 123, Pernambuco, PE</li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end">
          <Separator className="w-20 h-1 mb-2 rounded" />

          <h2 className="font-bold mb-4 text-white text-xl">
            {t("footer.follow")}
          </h2>

          <ul className="flex space-x-4">
            <li>
              <a
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

      <div className="mt-6 text-center text-gray-400">
        <p className="text-white">
          &copy; {new Date().getFullYear()} RentVoyage. {t("footer.rights")}
        </p>
      </div>

    </footer>
  );
};
