"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Clock({ showCity = true }: { showCity?: boolean }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {showCity && `${profile.city} `}
      {time ?? "--:--:--"} {profile.timezone}
    </span>
  );
}
