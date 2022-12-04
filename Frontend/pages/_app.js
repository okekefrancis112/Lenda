import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const alchemyId = "Lc4674R5HyssxRE0VPhmqCHOmWit27LW";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
        webSocket: `wss://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Lenda",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const { address, isConnected } = useAccount();

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <ChakraProvider>
            <div className="bg-darkNavyBlue">
              <Header />
              <ToastContainer />

              <Component {...pageProps} />
              <Footer />
            </div>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
