import type { NextPage } from "next";
import {
	getDataReleaseInformation,
	getUIReleaseInformation,
} from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import styles from "./index.module.scss";
import { IGitlabRelease } from "../../../../types/releaseTypes";
import InputAndLabel from "../../../components/Input/InputAndLabel";

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const dataReleaseInfo = useQuery(
		"dataReleaseInfo",
		() => {
			return getDataReleaseInformation();
		},
		{
			onSuccess(data) {
				setDataReleases(data);
			},
		}
	);
	const uiReleaseInfo = useQuery(
		"uiReleaseInfo",
		() => {
			return getUIReleaseInformation();
		},
		{
			onSuccess(data) {
				setUIReleases(data);
			},
		}
	);

	const [dataReleases, setDataReleases] = useState<IGitlabRelease[]>(
		dataReleaseInfo.data || []
	);
	const [showDataReleases, setShowDataReleases] = useState<boolean>(true);
	const [uiReleases, setUIReleases] = useState<IGitlabRelease[]>(
		uiReleaseInfo.data || []
	);
	const [showUIReleases, setShowUIReleases] = useState<boolean>(true);
	const [allReleases, setReleases] = useState<IGitlabRelease[]>([]);

	const sortReleases = (x: IGitlabRelease[], y: IGitlabRelease[]) => {
		return [...x, ...y].sort(
			(a, b) =>
				new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
		);
	};

	useEffect(() => {
		setReleases(sortReleases(dataReleases, uiReleases));
	}, [dataReleases, uiReleases]);

	const handleFilter = (filter?: string) => {
		let data: [] | IGitlabRelease[] = showDataReleases ? dataReleases : [];
		let ui: [] | IGitlabRelease[] = showUIReleases ? uiReleases : [];

		if (filter === "data") {
			const showDataStatus = !showDataReleases;
			data = showDataStatus ? dataReleases : [];
			setShowDataReleases(showDataStatus);
		}
		if (filter === "ui") {
			const showUIStatus = !showUIReleases;
			ui = showUIStatus ? uiReleases : [];
			setShowUIReleases(showUIStatus);
		}

		setReleases(sortReleases(data, ui));
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
									<h2 className="m-0 h3">Show:</h2>
									<InputAndLabel
										forId="filter-dataReleases"
										label="Data releases"
										name="filter-data"
										type="checkbox"
										checked={showDataReleases}
										onChange={() => handleFilter("data")}
									/>
									<InputAndLabel
										forId="filter-uiReleases"
										label="UI releases"
										name="filter-ui"
										type="checkbox"
										checked={showUIReleases}
										onChange={() => handleFilter("ui")}
									/>
								</div>
							</div>
						</div>
					</div>
					{uiReleases.length > 0 || dataReleases.length > 0 ? (
						allReleases.map((data: IGitlabRelease) => (
							<div className="row mb-5" key={data.released_at + data.tag_name}>
								<div className="col-12 col-lg-8 offset-lg-2">
									<Card
										headerClassName="py-1"
										header={
											<div className="d-flex align-center justify-content-between">
												<h2 className="p-0 m-0 h3">
													{data.repository}:{" "}
													<span className="text-bold">{data.tag_name}</span>
												</h2>
												<p className="h4 m-0">{data.released_at}</p>
											</div>
										}
										contentClassName="py-2"
									>
										<div
											className={styles.Releases_release_content}
											// we trust gitlab and github, dont we? Nothing dangerous here
											dangerouslySetInnerHTML={{ __html: data.description }}
										/>
									</Card>
								</div>
							</div>
						))
					) : (
						<div style={{ height: "300px" }}>
							<Loader />
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Releases;
