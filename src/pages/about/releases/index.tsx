import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { GitlabRelease } from "../../../../types/releaseTypes";
import {
	getDataReleaseInformation,
	getUIReleaseInformation
} from "../../../apis/AggregatedData.api";
import InputAndLabel from "../../../components/Input/InputAndLabel";
import Loader from "../../../components/Loader/Loader";
import ReleasesList from "../../../components/ReleasesList/ReleasesList";

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const [filter, setFilter] = useState<{ data: boolean; ui: boolean }>({
		data: true,
		ui: true
	});

	const { data: dataReleaseData, isLoading: isDataLoading } = useQuery(
		"dataReleaseData",
		getDataReleaseInformation
	);
	const { data: uiReleaseData, isLoading: isUILoading } = useQuery(
		"uiReleaseData",
		getUIReleaseInformation
	);

	const allReleases = useMemo(() => {
		const combinedReleases: GitlabRelease[] = [
			...(uiReleaseData ?? []),
			...(dataReleaseData ?? [])
		];
		return combinedReleases.sort(
			(a, b) =>
				new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
		);
	}, [uiReleaseData, dataReleaseData]);

	const filteredReleases = useMemo(() => {
		return allReleases.filter((release) => {
			if (filter.data && release.repository === "data") return true;
			if (filter.ui && release.repository === "ui") return true;
			return false;
		});
	}, [allReleases, filter]);

	const handleFilterChange = (type: "data" | "ui") => {
		setFilter((prev) => ({
			...prev,
			[type]: !prev[type]
		}));
	};

	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Release log</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row mb-5">
						<div className="col-12 col-lg-8 offset-lg-2">
							<div className="bg-lightGray p-2 br-common">
								<div className="d-flex align-center justify-content-around">
									<h2 className="m-0 h3">Filter:</h2>
									<InputAndLabel
										forId="filter-dataReleases"
										label="Data releases"
										name="filter-data"
										type="checkbox"
										checked={filter.data}
										onChange={() => handleFilterChange("data")}
									/>
									<InputAndLabel
										forId="filter-uiReleases"
										label="UI releases"
										name="filter-ui"
										type="checkbox"
										checked={filter.ui}
										onChange={() => handleFilterChange("ui")}
									/>
								</div>
							</div>
						</div>
					</div>
					{isDataLoading && isUILoading ? (
						<div style={{ height: "300px" }}>
							<Loader />
						</div>
					) : (
						<ReleasesList releases={filteredReleases} />
					)}
				</div>
			</section>
		</>
	);
};

export default Releases;
