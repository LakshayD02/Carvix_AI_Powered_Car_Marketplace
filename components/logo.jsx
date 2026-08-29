"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo({ width = 130, height = 42, className = "" }) {
  return (
    <Image
      src="/logo.png"
      alt="Carvix Logo"
      width={width}
      height={height}
      className={`h-10 w-auto object-contain transition-all duration-300 ${className}`}
      priority
    />
  );
}

