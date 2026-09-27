import Link from "next/link";
import { getDictionary } from "../../../../i18n/dictionaries";
import { localizePath } from "../../../../i18n/locales";
import { currentLocale } from "../../../../i18n/server";

export default async function ArticleNotFound() {
  const locale = await currentLocale();
  const text = getDictionary(locale).notFound;

  return (
    <div className="container">
      <p className="section-label">
        404 <span>/writing</span>
      </p>
      <h1>{text.article}</h1>
      <Link href={localizePath(locale, "/articles")} className="btn btn-primary">
        {text.writing}
      </Link>
    </div>
  );
}
