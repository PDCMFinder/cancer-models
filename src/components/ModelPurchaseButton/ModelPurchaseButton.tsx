import { ExternalModelLink } from "../../types/ModelData.model";
import Button from "../Button/Button";

type Props = {
	supplier: ExternalModelLink;
	isLastSupplier: boolean;
};

const ModelPurchaseButton = ({
	supplier,
	isLastSupplier
}: Props): JSX.Element => {
	return (
		<Button
			priority="primary"
			color="dark"
			target="_blank"
			htmlTag="a"
			href={supplier.link}
			className={`${isLastSupplier ? "mt-0" : ""}`}
		>{`Purchase at ${
			supplier.resourceLabel + supplier.resourceLabel.includes("ATCC")
				? " " + supplier.linkLabel
				: ""
		}`}</Button>
	);
};

export default ModelPurchaseButton;
