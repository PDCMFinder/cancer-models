import Logotype from "../Logotype/Logotype";
import { routes } from "../../utils/routes";

import styles from "./Footer.module.scss";

const Footer = () => {
	return (
		<footer className={`${styles.Footer} text-white`}>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<div className={styles.Footer_Logotype}>
							<Logotype color="white" />
						</div>
					</div>
					<div className="col-12">{routes.map((route) => route.name)}</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
