import { profile, profileText } from "../content/profile";
import { site, siteText } from "../content/site";
import { locales, type Locale } from "../i18n/locales";

const PERSON_ID = `${site.url}/#person`;

// schema.org description of the person behind the site. `sameAs` ties the site to the same
// person's other profiles, which is what search engines use to recognise the name.
export function personNode(locale: Locale) {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: `${profile.firstName} ${profile.lastName}`,
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: siteText[locale].jobTitle,
    description: profileText[locale].intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      addressCountry: "FR",
    },
    knowsAbout: [...profile.marquee],
    sameAs: profile.links.flatMap((link) => (link.href === null ? [] : [link.href])),
  };
}

// One website in two languages.
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: [...locales],
    publisher: { "@id": PERSON_ID },
  };
}

export function homeStructuredData(locale: Locale) {
  return { "@context": "https://schema.org", "@graph": [personNode(locale), websiteNode()] };
}
