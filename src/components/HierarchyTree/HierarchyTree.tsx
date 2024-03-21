import styles from "./HierarchyTree.module.scss";

interface IHierarchyTreeProps {}

const HierarchyTree = (props: IHierarchyTreeProps) => {
	return (
		<ul className={styles.HierarchyTree}>
			<li>
				<span>Model 1</span>
			</li>
			<li>
				<span>Model 1</span>
				<ul>
					<li>
						<span>Model 2</span>
					</li>
					<li>
						<span>Model 2</span>
					</li>
					<li>
						<span>Model 2</span>
					</li>
					<li>
						<span>Model 2</span>
					</li>
					<li>
						<span>Model 2</span>
					</li>
				</ul>
			</li>
			<li>
				<span>Model 1</span>
				<ul>
					<li>
						<span>Model 2</span>
						<ul>
							<li>
								<span>Model 3</span>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default HierarchyTree;
