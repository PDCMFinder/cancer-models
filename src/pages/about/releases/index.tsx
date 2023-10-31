import type { NextPage } from "next";
import {
	getDataReleaseInformation,
	getUIReleaseInformation,
} from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import styles from "./index.module.scss";
import { IGitlabRelease } from "../../../../types/releaseTypes";
import InputAndLabel from "../../../components/Input/InputAndLabel";

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const [parsedDataReleases, setParsedDataReleases] = useState<
		IGitlabRelease[]
	>([]);
	const [showDataReleases, setShowDataReleases] = useState<boolean>(true);
	const [parsedUIReleases, setParsedUIReleases] = useState<IGitlabRelease[]>(
		[]
	);
	const [showUIReleases, setShowUIReleases] = useState<boolean>(true);
	const [parsedReleases, setParsedReleases] = useState<IGitlabRelease[]>([]);

	const parseReleaseContent = async (
		release: IGitlabRelease,
		repository: "Data" | "UI"
	) => {
		const searchTxt = "v";
		const regEscape = (v: string) =>
			v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
		const strArr = release.tag_name.split(
			new RegExp(regEscape(searchTxt), "ig")
		);
		const parsedDescription = await remark()
			.use(remarkHtml, { sanitize: true })
			.process(release.description);

		release.released_at = release.released_at.split("T")[0];
		release.tag_name = `v${strArr[strArr.length - 1]}`;
		release.description = parsedDescription.toString();
		release.repository = repository;

		return release;
	};

	let dataReleaseInfo = useQuery(
		"dataReleaseInfo",
		() => {
			return getDataReleaseInformation();
		},
		{
			onSuccess(data) {
				data.forEach(async (release: IGitlabRelease) => {
					release = await parseReleaseContent(release, "Data");
				});

				setParsedDataReleases(data);
			},
		}
	);
	let uiReleaseInfo = useQuery(
		"uiReleaseInfo",
		() => {
			return getUIReleaseInformation();
		},
		{
			onSuccess(data) {
				data.forEach(async (release: IGitlabRelease) => {
					release = await parseReleaseContent(release, "UI");
				});

				setParsedUIReleases(data);
			},
		}
	);

	const sortReleases = (x: IGitlabRelease[], y: IGitlabRelease[]) => {
		return [...x, ...y].sort(
			(a, b) =>
				new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
		);
	};

	useEffect(() => {
		setParsedReleases(sortReleases(parsedDataReleases, parsedUIReleases));
	}, [parsedDataReleases, parsedUIReleases]);

	const handleFilter = (filter?: string) => {
		let data: [] | IGitlabRelease[] = showDataReleases
			? parsedDataReleases
			: [];
		let ui: [] | IGitlabRelease[] = showUIReleases ? parsedUIReleases : [];

		if (filter === "data") {
			let showDataStatus = !showDataReleases;
			data = showDataStatus ? parsedDataReleases : [];
			setShowDataReleases(showDataStatus);
		}
		if (filter === "ui") {
			let showUIStatus = !showUIReleases;
			ui = showUIStatus ? parsedUIReleases : [];
			setShowUIReleases(showUIStatus);
		}

		setParsedReleases(sortReleases(data, ui));
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
									<h2 className="m-0">Show:</h2>
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
					{parsedUIReleases.length > 0 || parsedDataReleases.length > 0 ? (
						parsedReleases.map((data: IGitlabRelease) => (
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
