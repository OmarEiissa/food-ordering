import Link from "next/link";
import "./[locale]/globals.css";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

export default async function NotFound() {
  const locale = await getCurrentLocale();

  return (
    <html>
      <body>
        <div className="flex items-center justify-center h-screen bg-background text-foreground">
          <div className="text-center bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Could not find the requested resource.
            </p>
            <Link
              href={`/${locale}`}
              className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/80 transition duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
