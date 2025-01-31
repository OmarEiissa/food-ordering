"use client";

import { Languages } from "@/constants/enums";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;

    router.push(path);
  };

  return (
    <div className="flex max-lg:w-full">
      {/* {locale === Languages.ARABIC ? (
        <Button
          variant={"outline"}
          className="hover:text-white "
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          variant={"outline"}
          className="hover:text-white font-semibold"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )} */}
      
      <Button
        variant={"outline"}
        className={`hover:text-white !px-8 !rounded-full max-lg:w-full ${
          locale === Languages.ARABIC && "font-semibold"
        }`}
        onClick={() =>
          switchLanguage(
            locale === Languages.ARABIC ? Languages.ENGLISH : Languages.ARABIC
          )
        }
      >
        {locale === Languages.ARABIC ? "English" : "العربية"}
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
