import Button from "../Button/Button";
import InputAndLabel from "../Input/InputAndLabel";

const SearchFiltersMobile = () => {
	return (
		<ul className="ul-noStyle">
			<li>
				<Button
					color="dark"
					priority="secondary"
					className="link--text m-0 pl-0"
					arrow
				>
					Model
				</Button>
				<ul className="ul-noStyle">
					<li>
						<Button
							color="dark"
							priority="secondary"
							className="link--text m-0 pl-0"
							arrow
						>
							Project
						</Button>
						<ul className="ul-noStyle">
							<li>
								<InputAndLabel name="europdx" type="checkbox" label="Europdx" />
							</li>
						</ul>
					</li>
					<li>
						<Button
							color="dark"
							priority="secondary"
							className="link--text m-0 pl-0"
							arrow
						>
							Model ID
						</Button>
						<ul className="ul-noStyle">
							<li>
								<InputAndLabel
									name="modelID"
									type="search"
									label="Model ID"
									placeholder="e.g. TM00015"
									labelClassName="hideElement-accessible"
								/>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default SearchFiltersMobile;
