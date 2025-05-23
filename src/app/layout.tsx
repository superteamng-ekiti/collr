import "./globals.css";
import { ClusterProvider } from "@/components/cluster/cluster-data-access";
import { SolanaProvider } from "@/components/solana/solana-provider";
import { UiLayout } from "@/components/ui/ui-layout";
import { ReactQueryProvider } from "./react-query-provider";
import { PrivyMainProvider } from "@/provider/privy-provider";

export const metadata = {
  title: "Collr",
  description: "Generated by create-solana-dapp"
};

const links: { label: string; path: string }[] = [
  { label: "Account", path: "/account" },
  { label: "Clusters", path: "/clusters" }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <PrivyMainProvider>
                <UiLayout>{children}</UiLayout>
              </PrivyMainProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
