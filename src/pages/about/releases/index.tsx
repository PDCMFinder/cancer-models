import type { NextPage } from "next";
import { getReleaseChangeLog } from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { useState } from "react";
import Card from "../../../components/Card/Card";
import styles from "./index.module.scss";

interface IRelease {
	title: string;
	content: string;
	publishedAt: string;
}

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const [parsedReleases, setParsedReleases] = useState<IRelease[]>([]);

	const parseReleaseContent = async (content: string) => {
		const processedContent = await remark()
			.use(remarkHtml, { sanitize: true })
			.process(content);
		return processedContent.toString();
	};

	let releaseChangeLog = useQuery(
		"releaseChangeLog",
		() => getReleaseChangeLog(),
		{
			onSuccess(data) {
				data.forEach(async (release) => {
					release.content = await parseReleaseContent(release.content);
				});
				setParsedReleases(data);
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
						parsedReleases.map((data: IRelease) => {
							return (
								<div className="row mb-5" key={data.title}>
									<div className="col-12 col-lg-8 offset-lg-2">
										<Card
											header={
												<div className="d-lg-flex align-center justify-content-between">
													<h1 className="m-0">{data.title}</h1>
													<p className="mb-0 text-muted text-small">
														{data.publishedAt.split("T")[0]}
													</p>
												</div>
											}
										>
											<div
												className={styles.Releases_release_content}
												dangerouslySetInnerHTML={{ __html: data.content }}
											/>
										</Card>
									</div>
								</div>
							);
						})
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
