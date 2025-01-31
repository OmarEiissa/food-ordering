import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translation = await getTrans(locale);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translation.logo}
        </Link>
        <Navbar translation={translation} initialSession={initialSession} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <AuthButtons
              translations={translation}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
