import Image from "next/image";
import Link from "next/link";
import { useActiveProject } from "../../hooks/useActiveProject";
import { ProjectButtons } from "../../pages/about/providers";
import Loader from "../Loader/Loader";

const HomeProjectAccordion = () => {
	const { activeProjectData, handleProjectClick, isLoadingProviders } =
		useActiveProject();

	return activeProjectData.project_abbreviation === null &&
		isLoadingProviders ? (
		<div style={{ height: "50vh" }}>
			<Loader />
		</div>
	) : (
		<div className="row justify-content-center">
			<div className="col-12 col-md-3 col-lg-2">
				<ProjectButtons
					direction="column"
					activeProject={activeProjectData.project_abbreviation}
					onClick={handleProjectClick}
				/>
			</div>
			<div className="col-12 col-md-9 col-lg-8 mt-5 mt-md-0">
				{/* project logo and name */}
				{activeProjectData.project_description &&
				activeProjectData.project_settings.logo ? (
					<>
						<div className="row flex-lg-row-reverse mb-3">
							<div className="col-12 col-md-6 col-lg-3">
								<Image
									src={activeProjectData.project_settings.logo}
									alt={`${activeProjectData.project_full_name} logo`}
									title={`${activeProjectData.project_full_name}`}
									className="w-50 h-auto mx-auto mb-2 mb-md-0 w-lg-auto mr-lg-0"
									height={120}
									width={120}
									style={{
										maxHeight: "120px",
										maxWidth: "100%"
									}}
								/>
							</div>
							<div className="col-12 col-md-6 col-lg-9">
								<h3 className="mt-0">
									{activeProjectData.project_full_name ??
										activeProjectData.project_abbreviation}
								</h3>
								<p className="mb-lg-0">
									<a
										href={`/search?filters=project_name%3A${activeProjectData.project_abbreviation}`}
									>
										Explore project&apos;s models
									</a>
								</p>
							</div>
						</div>
						<hr className="mb-3" />
					</>
				) : null}
				{/* provider logos */}
				<div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
					{activeProjectData.providers?.map((provider) => (
						<div key={provider?.data_source} className="col text-center">
							<Link
								href={`/search?filters=data_source%3A${provider?.data_source}`}
								title={`Explore all ${provider?.data_source} models`}
								style={{ height: "100px" }}
								className="mb-1 d-flex"
							>
								<Image
									src={`/img/providers/${provider?.data_source}.png`}
									alt={`${provider?.provider_name} logo`}
									title={provider?.provider_name}
									className="w-auto h-auto m-auto"
									width={300}
									height={100}
									style={{
										maxHeight: "100px",
										maxWidth: "75%"
									}}
								/>
							</Link>
							<p className="text-small text-muted">{provider?.provider_name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeProjectAccordion;
