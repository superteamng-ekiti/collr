"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ReactNode, Suspense, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import { AccountChecker } from "../account/account-ui";
import {
  ClusterChecker,
  ClusterUiSelect,
  ExplorerLink,
} from "../cluster/cluster-ui";
import { WalletButton } from "../solana/solana-provider";
import Header from "../header/header";

export function UiLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
    </div>
  );
}
