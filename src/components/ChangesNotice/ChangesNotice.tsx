import Link from "next/link";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Card from "../Card/Card";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";
import Logotype from "../Logotype/Logotype";
import Modal from "../Modal/Modal";

const ChangesNotice = () => {
	const [hasSeenNotice, setHasSeenNotice] = useLocalStorage(
		"seen_notice",
		false
	);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (isClient && !hasSeenNotice) {
		return (
			<Modal modalWidth="50">
				<Card
					className="bg-white"
					contentClassName="pt-0 pb-3 text-center"
					headerClassName="py-1 px-2 bg-white"
					header={
						<header className="text-right">
							<CloseIcon color="dark" onClick={() => setHasSeenNotice(true)} />
						</header>
					}
				>
					<div className="mx-auto w-50 mb-3">
						<Logotype color="dark" />
					</div>
					<p>
						Important changes taking place at CancerModels.org, <br />
						<b>effective September 1, 2025</b>.
					</p>
					<p>
						More info{" "}
						<Link href={"/2025-changes"} onClick={() => setHasSeenNotice(true)}>
							here
						</Link>
						.
					</p>
				</Card>
			</Modal>
		);
	}

	return null;
};

export default ChangesNotice;
