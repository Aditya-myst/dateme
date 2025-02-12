"use client"; // Ensure it's a Client Component

import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react"; // Correct NextUI Provider

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
