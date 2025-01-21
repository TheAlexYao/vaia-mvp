import { defineChain } from "viem";
import { useCallback, useEffect } from "react";
import { PrivyProvider as BasePrivyProvider, usePrivy, useWallets } from "@privy-io/react-auth";
import { useUserDetails } from "./UserAuthContext";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import api from "../utils/api";

const Capx = defineChain({
  id: Number(import.meta.env.VITE_CAPX_CHAIN_ID),
  name: import.meta.env.VITE_CAPX_CHAIN_NETWORK_NAME,
  network: import.meta.env.VITE_CAPX_CHAIN_NETWORK_NAME,
  logoUrl: "https://internal.app.capx.fi/favicon.png",
  nativeCurrency: {
    decimals: 18,
    name: "ether",
    symbol: import.meta.env.VITE_CAPX_CHAIN_CURRENCY!,
  },
  rpcUrls: {
    default: {
      http: [import.meta.env.VITE_CAPX_CHAIN_RPC_URL!],
      webSocket: [import.meta.env.VITE_CAPX_WEB_SOCKET_URL!],
    },
    public: {
      http: [import.meta.env.VITE_CAPX_CHAIN_RPC_URL!],
      webSocket: [import.meta.env.VITE_CAPX_WEB_SOCKET_URL!],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: import.meta.env.VITE_CAPX_CHAIN_EXPLORE_URL!,
    },
  },
});

const PrivyWrapper = ({ children }: { children: React.ReactNode }) => {
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
        
        await wallet.switchChain(Number(import.meta.env.VITE_CAPX_CHAIN_ID));
        const providerInstance = new ethers.providers.Web3Provider(await wallet.getEthereumProvider());
        const signer = providerInstance.getSigner();
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
          chainId: 10245,
        });

        const receipt = await txResponse.wait();
        const endTime = performance.now();
        console.log(endTime - startTime, "XID transaction time");
        console.log(receipt, "mint tx receipt");
        await getUserDetails();
        return true;
      } catch (error) {
        console.log(error, "mint transaction error");
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    (async () => {
      if (txDetails && (userDetails?.version ?? 0) < 3 && wallets.length > 0) {
        const isMinted = await mintXId();
        if (!isMinted) {
          timer = setInterval(async () => {
            const isXIdMinted = await mintXId();
            if (isXIdMinted) {
              clearInterval(timer);
            }
          }, 300000); // 5 minutes
        }
      }
    })();

    return () => clearInterval(timer);
  }, [Object.keys(txDetails).length, wallets.length]);

  useEffect(() => {
    (async () => {
      if (authenticated && !user?.wallet) {
        await createWallet();
      }
    })();
  }, [authenticated, user?.wallet, createWallet]);

  return <>{wallets.length > 0 ? children : <p>Loading...</p>}</>;
};

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  const { isUserCreated } = useUserDetails();

  const getCustomToken = useCallback(async () => {
    if (isUserCreated) {
      return Cookies.get("access_token") || undefined;
    }
    return undefined;
  }, [isUserCreated]);

  return (
    <BasePrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID!}
      config={{
        supportedChains: [Capx],
        defaultChain: Capx,
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
      }}
    >
      <PrivyWrapper>{children}</PrivyWrapper>
    </BasePrivyProvider>
  );
} 