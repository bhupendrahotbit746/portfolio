import { render, screen, act } from "@testing-library/react";
import Clock from "@/app/components/Clock";

describe("Clock", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2024-01-01T10:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders a time in HH:MM:SS format", () => {
    render(<Clock />);
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it("omits the city prefix when showCity is false", () => {
    const { container: withCity } = render(<Clock showCity />);
    const { container: withoutCity } = render(<Clock showCity={false} />);

    expect(withCity.textContent).toMatch(/^IST \d{2}:\d{2}:\d{2} IST$/);
    expect(withoutCity.textContent).toMatch(/^\d{2}:\d{2}:\d{2} IST$/);
  });

  it("updates the displayed time every second", () => {
    render(<Clock />);
    const initial = screen.getByText(/:\d\d:\d\d/).textContent;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const updated = screen.getByText(/:\d\d:\d\d/).textContent;
    expect(updated).not.toBe(initial);
  });
});
