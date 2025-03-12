"use client";

import React, { PropsWithChildren } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export const PrivyMainProvider = ({ children }: PropsWithChildren) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ''}
      config={{
        appearance: {
          accentColor: "#EF8977",
          theme: "#FFFFFF",
          showWalletLoginFirst: false,
          logo: "https://ik.imagekit.io/clg5lw23vmwy/collor-logo-mark_U8cKyTWM5.png",
          walletChainType: "ethereum-and-solana",
          walletList: ["detected_wallets", "metamask", "phantom"],
        },
        loginMethods: ["google", "email"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          ethereum: {
            createOnLogin: "off",
          },
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};
