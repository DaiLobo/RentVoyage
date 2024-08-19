import "../styles/globals.css";

import { GetStaticProps } from "next";
import { appWithTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppProps } from "next/app";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { ShadcnProvider } from "@/lib/shadcn";

function App({ Component, pageProps }: AppProps) {
  return (
    <ShadcnProvider>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
        <Footer />
      </AuthProvider>
    </ShadcnProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", [
        "common",
        "login",
        "register"
      ]))
    }
  };
};

export default appWithTranslation(App);
