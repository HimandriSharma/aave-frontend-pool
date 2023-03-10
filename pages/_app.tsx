import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
const { chains, provider } = configureChains(
	[mainnet, goerli],
	[
		alchemyProvider({
			apiKey: process.env.ALCHEMY_API_KEY ? process.env.ALCHEMY_API_KEY : "",
		}),
	]
);
const { connectors } = getDefaultWallets({
	appName: "Aave Liquidity Pool",
	chains,
});
const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});
export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
