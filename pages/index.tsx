import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useIsMounted } from "./hooks/useIsMounted";

export default function Home() {
	const { address } = useAccount();
	const mounted = useIsMounted();
	return (
		<>
			<ConnectButton showBalance={true} />
			{mounted ? address && <p>{address}</p> : null}
		</>
	);
}
