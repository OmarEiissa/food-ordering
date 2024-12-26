import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

async function Hero() {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { hero } = home;

  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2 max-md:text-center">
        <div className="md:py-16 lg:py-20 md:max-w-[450px] max-md:flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-semibold">{hero.title}</h1>
          <p className="text-sm text-accent my-4 max-w-[450px]">
            {hero.description}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} space-x-2 !px-4 !rounded-full font-semibold uppercase`}
            >
              {hero.orderNow}
              <ArrowRightCircle
                className={`!size-5 ${
                  locale === Languages.ARABIC ? "rotate-180 " : ""
                }`}
              />
            </Link>
            <Link
              href={`/${locale}/${Routes.ABOUT}`}
              className="flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold"
            >
              {hero.learnMore}
              <ArrowRightCircle
                className={`!size-5 ${
                  locale === Languages.ARABIC ? "rotate-180 " : ""
                }`}
              />
            </Link>
          </div>
        </div>

        <div className="relative hidden md:block">
          <Image
            src="/assets/images/pizza.png"
            alt="Pizza"
            fill
            className="object-contain"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
}
export default Hero;
