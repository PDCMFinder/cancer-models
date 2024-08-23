const Banner = () => {
	return (
		<section className="bg-primary-quaternary py-4">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<p className="text-family-primary">
							Do data resources managed by EMBL-EBI and our collaborators make a
							difference to your work?
						</p>
						<p className="text-small">
							Please take 10 minutes to fill in our annual user survey, and help
							us make the case for why sustaining open data resources is
							critical for life sciences research.
						</p>
						<p className="mb-0 text-small">
							Survey link:{" "}
							<a
								href="https://www.surveymonkey.com/r/HJKYKTT?channel=[website]"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://www.surveymonkey.com/r/HJKYKTT
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
