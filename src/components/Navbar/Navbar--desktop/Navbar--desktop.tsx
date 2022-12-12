import Logotype from "../../Logotype/Logotype";
import { INavProps } from "../../../../globalTypes";

import styles from "./Navbar--desktop.module.scss";
import Link from "next/link";

const NavDesktop = (props: INavProps) => {
	return (
		<nav className={styles["Navbar--desktop"]}>
			<div className="container">
				<div className="row">
					<div className="col-3">
						<Link href="/">
							<Logotype color="dark" />
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavDesktop;
