import Link from "next/link";
import styles from "./HierarchyTree.module.scss";

interface IHierarchyTreeProps {}

const HierarchyTree = (props: IHierarchyTreeProps) => {
	return (
		<div className={styles.HierarchyTree}>
			<ul>
				<li>
					{/* Link is wrapping span so the whole cell can be clicked */}
					<Link href={"/data/models/${providerId}/SIDM01263"}>
						<span>SIDM01263</span>
					</Link>
					<ul>
						<li>
							<Link
								href={"/data/models/${providerId}/SIDM01244"}
								className={styles.HierarchyTree_current}
							>
								<span>SIDM01244</span>
							</Link>
							<ul>
								<li>
									<Link href={"/data/models/${providerId}/SIDM01016"}>
										<span>SIDM01016</span>
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};

export default HierarchyTree;
