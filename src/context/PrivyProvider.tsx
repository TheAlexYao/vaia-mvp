"use client";
import { defineChain } from "viem";
import { useCallback, useEffect } from "react";
import { PrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useUserDetails } from "./UserAuthContext";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import api from "../utils/api";
import type { ReactNode } from 'react';

const Capx = defineChain({
  id: Number(import.meta.env.VITE_CAPX_CHAIN_ID),
  name: import.meta.env.VITE_CAPX_CHAIN_NETWORK_NAME,
  network: import.meta.env.VITE_CAPX_CHAIN_NETWORK_NAME,
  logoUrl: "https://internal.app.capx.fi/favicon.png",
  nativeCurrency: {
    decimals: 18,
    name: "ether",
    symbol: import.meta.env.VITE_CAPX_CHAIN_CURRENCY,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_CAPX_CHAIN_RPC_URL],
      webSocket: [import.meta.env.VITE_CAPX_CHAIN_WEB_SOCKET_URL],
    },
    public: {
      http: [import.meta.env.VITE_CAPX_CHAIN_RPC_URL],
      webSocket: [import.meta.env.VITE_CAPX_CHAIN_WEB_SOCKET_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: import.meta.env.VITE_CAPX_CHAIN_EXPLORE_URL,
    },
  },
});

const PrivyWrapper = ({ children }: { children: ReactNode }) => {
  const { txDetails, userDetails, getUserDetails } = useUserDetails();
  const { wallets } = useWallets();
  const { user, authenticated, createWallet } = usePrivy();

  const mintXId = async () => {
    const startTime = performance.now();
    if (Object.keys(txDetails).length > 0) {
      try {
        await api.post("/wallet/faucet");
      } catch (error) {
        console.log(error, "request faucet error");
      }
      try {
        const wallet = wallets.find(
          (wallet) => wallet.walletClientType === "privy"
        );
        if (!wallet) return false;
        
        await wallet.switchChain(import.meta.env.VITE_CAPX_CHAIN_ID);
        const provider = await wallet.getEthereumProvider();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const contract = new ethers.Contract(
          txDetails.contract_address,
          txDetails.contract_abi,
          signer
        );
        const txResponse = await signer.sendTransaction({
          to: txDetails.contract_address,
          data: contract.interface.encodeFunctionData("createProfile", [
            txDetails.input_params._profileParams,
            txDetails.input_params._profileData,
          ]),
          chainId: import.meta.env.VITE_CAPX_CHAIN_ID,
        });

        const recipt = await txResponse.wait();
        const endTime = performance.now();
        console.log(endTime - startTime, "XID transaction time");
        console.log(recipt, "mint tx recipt");
        await getUserDetails();
        return true;
      } catch (error) {
        console.log(error, "mint transaction error");
        return false;
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    (async () => {
      if (txDetails && userDetails?.version && userDetails.version < 3 && wallets.length > 0) {
        const isMinted = await mintXId();
        if (!isMinted) {
          timer = setInterval(async () => {
            const isXIdMinted = await mintXId();
            if (isXIdMinted) {
              clearInterval(timer);
            }
          }, 300000);
        }
      }
    })();

    return () => clearInterval(timer);
  }, [Object.keys(txDetails).length, wallets.length]);

  useEffect(() => {
    (async () => {
      if (authenticated) {
        if (!user?.wallet) {
          await createWallet();
        }
      }
    })();
  }, [authenticated]);
  return <>{wallets.length > 0 ? children : <p>Loading...</p>}</>;
};

export default function PrivyWalletProvider({ children }: { children: ReactNode }) {
  const { isUserCreated } = useUserDetails();

  const getCustomToken = useCallback(async (): Promise<string | undefined> => {
    if (isUserCreated) {
      return Cookies.get("access_token") || undefined;
    }
    return undefined;
  }, [isUserCreated]);

  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        supportedChains: [Capx],
        defaultChain: Capx,
        loginMethods: ["telegram"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          logo: "https://internal.app.capx.fi/favicon.png",
          showWalletLoginFirst: false,
        },
        customAuth: {
          enabled: isUserCreated,
          getCustomAccessToken: getCustomToken,
          isLoading: false
        },
        embeddedWallets: {
          showWalletUIs: false
        },
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </PrivyProvider>
  );
}
