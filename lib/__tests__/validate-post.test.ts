import { validatePostInput } from "@/lib/validate-post";

const validBody = {
  slug: "my-first-post",
  title: "My First Post",
  description: "A short description.",
  content: "Some content here.",
  category: "engineering",
  tags: ["next", "react"],
  coverImage: "https://example.com/cover.png",
  published: true,
};

describe("validatePostInput", () => {
  it("returns a normalized post for valid input", () => {
    expect(validatePostInput(validBody)).toEqual(validBody);
  });

  it("trims whitespace from string fields", () => {
    const result = validatePostInput({ ...validBody, title: "  My First Post  " });
    expect(result.title).toBe("My First Post");
  });

  it("throws when the body is not an object", () => {
    expect(() => validatePostInput(null)).toThrow("Request body must be an object.");
    expect(() => validatePostInput("nope")).toThrow("Request body must be an object.");
  });

  it("rejects slugs with invalid characters", () => {
    expect(() => validatePostInput({ ...validBody, slug: "Not A Slug!" })).toThrow(
      "Slug must be lowercase letters, numbers, and hyphens only."
    );
  });

  it("requires a title", () => {
    expect(() => validatePostInput({ ...validBody, title: "" })).toThrow("Title is required.");
  });

  it("filters out empty tags", () => {
    const result = validatePostInput({ ...validBody, tags: ["next", "  ", ""] });
    expect(result.tags).toEqual(["next"]);
  });
});
