"use client";

import { Languages, Routes } from "@/constants/enums";
import Link from "../link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import AuthButtons from "./AuthButtons";
import LanguageSwitcher from "./LanguageSwitcher";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";
import { UserRole } from "@prisma/client";

const Navbar = ({
  initialSession,
  translation,
}: {
  initialSession: Session | null;
  translation: Translations;
}) => {
  const session = useClientSession(initialSession);
  const isAdmin = session.data?.user.role === UserRole.ADMIN;

  const [openMenu, setOpenMenu] = useState(false);
  const { locale } = useParams();
  const pathname = usePathname();

  const links = [
    {
      id: crypto.randomUUID(),
      title: translation.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translation.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translation.navbar.contact,
      href: Routes.CONTACT,
    },
  ];

  return (
    <nav className="order-last lg:order-none">
      <Button
        variant={"secondary"}
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="!size-6" />
      </Button>

      <div
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 py-6 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        <ul
          className={`h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-center gap-8 container lg:p-0`}
        >
          <li
            className={`${
              locale === Languages.ARABIC ? "text-left" : "text-right"
            } w-full lg:hidden`}
          >
            <Button
              variant={"secondary"}
              size="sm"
              onClick={() => setOpenMenu(false)}
            >
              <X className="!size-6" />
            </Button>
          </li>

          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={`/${locale}/${link.href}`}
                className={`hover:text-primary duration-200 transition-colors font-semibold ${
                  pathname.startsWith(`/${locale}/${link.href}`)
                    ? "text-primary"
                    : "text-accent"
                }`}
                onClick={() => setOpenMenu(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}

          {session.data?.user && (
            <li>
              <Link
                href={
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                }
                onClick={() => setOpenMenu(false)}
                className={`${
                  pathname.startsWith(
                    isAdmin
                      ? `/${locale}/${Routes.ADMIN}`
                      : `/${locale}/${Routes.PROFILE}`
                  )
                    ? "text-primary"
                    : "text-accent"
                } hover:text-primary duration-200 transition-colors font-semibold`}
              >
                {isAdmin
                  ? translation.navbar.admin
                  : translation.navbar.profile}
              </Link>
            </li>
          )}

          <li className="lg:hidden flex flex-col-reverse gap-4 items-center max-lg:w-3/4">
            <div onClick={() => setOpenMenu(false)} className=" max-lg:w-full">
              <AuthButtons
                translations={translation}
                initialSession={initialSession}
              />
            </div>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
