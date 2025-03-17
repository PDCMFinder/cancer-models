import ReactGA from "react-ga4";
import { ExternalModelLink } from "../../types/ModelData.model";
import Button from "../Button/Button";

type Props = {
	supplier: ExternalModelLink;
	isLastSupplier: boolean;
};

const ModelPurchaseButton = ({ supplier, isLastSupplier }: Props) => {
	return (
		<Button
			priority="primary"
			color="dark"
			target="_blank"
			htmlTag="a"
			href={supplier.link}
			className={isLastSupplier ? "" : "mb-2"}
			onClick={() => {
				ReactGA.event("provider_purchase_model", {
					category: "event",
					provider: supplier.resourceLabel
				});
			}}
		>
			Purchase {supplier.linkLabel}
		</Button>
	);
};

export default ModelPurchaseButton;
