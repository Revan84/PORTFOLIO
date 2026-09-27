import Link from "next/link";
import { getDictionary } from "../../../../i18n/dictionaries";
import { localizePath } from "../../../../i18n/locales";
import { currentLocale } from "../../../../i18n/server";

export default async function ProjectNotFound() {
  const locale = await currentLocale();
  const text = getDictionary(locale).notFound;

  return (
    <div className="container">
      <p className="section-label">
        404 <span>/work</span>
      </p>
      <h1>{text.project}</h1>
      <Link href={localizePath(locale, "/#work")} className="btn btn-primary">
        {text.work}
      </Link>
    </div>
  );
}
