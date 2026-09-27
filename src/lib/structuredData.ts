import { profile } from "../content/profile";
import { site } from "../content/site";

const PERSON_ID = `${site.url}/#person`;

// schema.org description of the person behind the site. `sameAs` ties the site to the same
// person's other profiles, which is what search engines use to recognise the name.
export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: `${profile.firstName} ${profile.lastName}`,
    givenName: profile.firstName,
    familyName: profile.lastName,
    url: site.url,
    email: `mailto:${profile.email}`,
    jobTitle: "Full-stack developer",
    description: profile.intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montpellier",
      addressCountry: "FR",
    },
    knowsAbout: [...profile.marquee],
    sameAs: profile.links.flatMap((link) => (link.href === null ? [] : [link.href])),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function homeStructuredData() {
  return { "@context": "https://schema.org", "@graph": [personNode(), websiteNode()] };
}
