import type { NextPage } from "next";
import {
	getDataReleaseInformation,
	getUIReleaseInformation,
} from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { useState } from "react";
import Card from "../../../components/Card/Card";
import styles from "./index.module.scss";
import { IGitlabRelease } from "../../../../types/releaseTypes";

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const [parsedReleases, setParsedReleases] = useState<IGitlabRelease[]>([]);
	const [parsedDataReleases, setParsedDataReleases] = useState<
		IGitlabRelease[]
	>([]);
	const [parsedUIReleases, setParsedUIReleases] = useState<IGitlabRelease[]>(
		[]
	);

	const parseReleaseContent = async (content: string) => {
		const processedContent = await remark()
			.use(remarkHtml, { sanitize: true })
			.process(content);
		return processedContent.toString();
	};

	// let releaseChangeLog = useQuery(
	// 	"releaseChangeLog",
	// 	() => getUIReleaseInformation(),
	// 	{
	// 		onSuccess(data) {
	// 			data.forEach(async (release) => {
	// 				release.content = await parseReleaseContent(release.content);
	// 			});
	// 			setParsedReleases(data);
	// 		},
	// 	}
	// );

	let dataReleaseInfo = useQuery(
		"dataReleaseInfo",
		() => {
			return getDataReleaseInformation();
		},
		{
			onSuccess(data) {
				data.forEach(async (release: IGitlabRelease) => {
					const searchTxt = "v";
					const regEscape = (v: string) =>
						v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
					const strArr = release.tag_name.split(
						new RegExp(regEscape(searchTxt), "ig")
					);

					release.created_at = release.created_at.split("T")[0];
					release.tag_name = `v${strArr[strArr.length - 1]}`;
					release.description = await parseReleaseContent(release.description);
				});

				setParsedReleases(data);
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
					release.description = await parseReleaseContent(release.description);
				});

				setParsedUIReleases(data);
			},
		}
	);

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
					{parsedReleases.length > 0 ? (
						parsedReleases.map((data: IGitlabRelease) => (
							<div className="row mb-5" key={data.created_at}>
								<div className="col-12 col-lg-8 offset-lg-2">
									<Card
										headerClassName="pb-0"
										header={
											<div className="d-flex align-center justify-content-between">
												<h2 className="p-0 mt-0">{data.tag_name}</h2>
												<p>{data.created_at}</p>
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
