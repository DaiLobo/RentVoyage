import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export const Footer = () => {
    const { t } = useTranslation('common');

    return (
        <footer className="bg-secondary text-white py-8 absolute bottom-0 xs:bottom-10 w-screen">
            <div className="bg-secondary container mx-auto px-4">
                <div className=" bg-secondary flex flex-wrap justify-between">

                    <div className="w-full md:w-1/4 mb-6 md:mb-0 bg-secondary ">
                        <Link href="/booking" className="text-2xl font-bold text-white">
                            {t("footer.call")}
                        </Link>
                        <p className="mt-2 text-gray-300">(21) 3456-7890</p>
                    </div>



                    <div className="bg-secondary w-full md:w-1/4 mb-6 md:mb-0">
                        <h2 className="font-semibold mb-4 text-white">{t("footer.contact")}</h2>
                        <ul className="bg-secondary">
                            <li className="mb-2 bg-secondary text-gray-300">Email: contato@rentvoyage.com</li>
                            <li className="mb-2 bg-secondary text-gray-300">{t("footer.phone")}: +55 (21) 99999-9999</li>
                            <li className="mb-2 bg-secondary text-gray-300">{t("footer.address")}: Av. Exemplo, 123, Rio de Janeiro, RJ</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/4 bg-secondary">
                        <h2 className="font-semibold mb-4 bg-secondary text-white">{t("footer.follow")}</h2>
                        <ul className="flex space-x-4 bg-secondary">
                            <li className="bg-secondary">
                                <a className="bg-secondary" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" alt="Facebook" className="w-6 h-6 bg-secondary" />
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="Instagram" className="w-6 h-6 bg-secondary" />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://freelogopng.com/images/all_img/1657045903twitter-logo-transparent-background.png" alt="Twitter" className="w-6 h-6 bg-secondary" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400 bg-transparent ">
                    <p className="text-white">&copy; {new Date().getFullYear()} RentVoyage. {t("footer.rights")}</p>
                </div>
            </div>
        </footer>
    )
}