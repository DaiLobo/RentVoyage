import '../styles/globals.css';
import { ShadcnProvider } from '@/lib/shadcn';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return <ShadcnProvider>
        <Component {...pageProps} />
    </ShadcnProvider>
}