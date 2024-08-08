// lib/shadcn.tsx
import { FC, ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
    children: ReactNode;
}

export const ShadcnProvider: FC<Props> = ({ children }) => {
    return (
        <NextThemesProvider attribute="class">
            {children}
        </NextThemesProvider>
    );
};
