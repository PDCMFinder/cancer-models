import styles from "./DataCountCard.module.scss";
import Card from "../Card/Card";
import Link from "next/link";

interface IDataCountCardProps {}

const DataCountCard = (props: IDataCountCardProps) => {
	return (
		<div className="col-12 col-lg-3 col-xl-2 offset-lg-1 offset-xl-2">
			<Card className="bg-primary-quaternary">
				<div className="row text-center justify-content-center">
					<div className={`${styles.DataCountCard_item} col-6 col-lg-12`}>
						<Link href="/search?xenograft" className="p text-noDecoration">
							<p className="h2 mb-0">4,662</p>
							<p className="text-underline">Xenograft models</p>
						</Link>
					</div>
					<div className={`${styles.DataCountCard_item} col-6 col-lg-12`}>
						<Link href="/search?cell-line" className="p text-noDecoration">
							<p className="h2 mb-0">1,547</p>
							<p className="text-underline">Cell line models</p>
						</Link>
					</div>
					<div className={`${styles.DataCountCard_item} col-6 col-lg-12`}>
						<Link href="/search?organoid" className="p text-noDecoration">
							<p className="h2 mb-0">108</p>
							<p className="text-underline">Organoid models</p>
						</Link>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DataCountCard;
