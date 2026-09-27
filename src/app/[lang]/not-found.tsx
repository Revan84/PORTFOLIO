import Link from "next/link";
import { getDictionary } from "../../i18n/dictionaries";
import { localizePath } from "../../i18n/locales";
import { currentLocale } from "../../i18n/server";

export default async function NotFound() {
  const locale = await currentLocale();
  const text = getDictionary(locale).notFound;

  return (
    <div className="container">
      <p className="section-label">
        404 <span>/not-found</span>
      </p>
      <h1>{text.page}</h1>
      <Link href={localizePath(locale, "/")} className="btn btn-primary">
        {text.home}
      </Link>
    </div>
  );
}
