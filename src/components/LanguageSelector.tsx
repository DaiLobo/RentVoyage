import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useRouter } from 'next/router';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const router = useRouter()
    const { pathname, asPath, query } = router;

    const [language, setLanguage] = useState<'en' | 'pt'>('pt');

    const changeLanguage = (lng: 'en' | 'pt') => {
        i18n.changeLanguage(lng);
        router.push({ pathname, query }, asPath, { locale: lng })
        setLanguage(lng);
    };

    const getFlagSrc = () => {
        return language === 'en' ? '/assets/eng-lang.png' : '/assets/pt-br-lang.png';
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-transparent flex items-center justify-center">
                    <Image src={getFlagSrc()} alt="Selecione o idioma" width={100} height={100} className='absolute w-full h-full' />
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-42 p-2 flex flex-col items-center">
                <button onClick={() => changeLanguage('pt')} className="rounded-full w-full flex items-center justify-center bg-white gap-2 bg-transparent hover:bg-accent hover:text-accent-foreground">
                    <Image src="/assets/pt-br-lang.png" alt="Português" width={26} height={26} />
                    <span className='text-xs'>Português (BR)</span>
                </button>
                <button onClick={() => changeLanguage('en')} className="rounded-full w-full flex items-center justify-center bg-white gap-2 bg-transparent hover:bg-accent hover:text-accent-foreground mt-2 ">
                    <Image src="/assets/eng-lang.png" alt="English" width={26} height={26} />
                    <span className='text-xs'>English (US)</span>
                </button>
            </PopoverContent>
        </Popover>
    );
}
