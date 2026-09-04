import { formatDate } from "@/lib/format-date";

describe("formatDate", () => {
  it("formats an ISO date string", () => {
    expect(formatDate("2024-03-05T12:00:00.000Z")).toBe("MAR 05, 2024");
  });

  it("returns an empty string for falsy input", () => {
    expect(formatDate("")).toBe("");
  });
});
