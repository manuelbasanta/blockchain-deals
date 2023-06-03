import { createContext } from "react";
import { WalletClient, PublicClient } from "wagmi";

export const ClientContext = createContext<{ walletClient: WalletClient, publicClient: PublicClient } | null>(null);