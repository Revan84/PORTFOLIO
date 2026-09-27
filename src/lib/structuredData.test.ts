import { describe, expect, it } from "vitest";
import { personNode, websiteNode } from "./structuredData";

describe("structured data", () => {
  it("names the person and links the other profiles", () => {
    const person = personNode("en");
    expect(person.name).toBe("Quentin Euillot");
    expect(person.url).toBe("https://quentin-euillot.com");
    expect(person.sameAs).toEqual([
      "https://github.com/Revan84",
      "https://www.linkedin.com/in/quentin-euillot-9b90a7167/",
    ]);
  });

  it("describes the person in the page's language", () => {
    expect(personNode("fr").jobTitle).toBe("Développeur full-stack");
    expect(personNode("en").jobTitle).toBe("Full-stack developer");
  });

  it("makes the person the publisher of the website", () => {
    expect(websiteNode().publisher).toEqual({ "@id": personNode("en")["@id"] });
    expect(websiteNode().inLanguage).toEqual(["en", "fr"]);
  });
});
