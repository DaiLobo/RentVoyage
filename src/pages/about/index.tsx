import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <Card className="w-full max-w-md sm:max-w-lg p-4 shadow-md">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <Separator className="my-4" />
        <CardContent>
          <p className="text-gray-700 mb-4">
            {t("the")} <strong>Rent Voyage</strong> {t("content1")}
          </p>
          <p className="text-gray-700">
            {t("content2")}
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt", [
        "common",
        "login",
        "register",
        "about"
      ]))
    }
  };
};

export default About;
