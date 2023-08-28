import type { NextPage } from "next";
import { getReleaseChangeLog } from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { useEffect, useState } from "react";
import React from "react";

interface Release {
	title: string;
	content: string;
}

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	const [parsedReleases, setParsedReleases] = useState<
		{ title: string; content: string }[]
	>([]);

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
					<div className="row">
						<div className="col-12">
							{parsedReleases.length > 0 ? (
								parsedReleases.map((data: Release) => {
									return (
										<React.Fragment key={data.title}>
											<h1>{data.title}</h1>
											<div dangerouslySetInnerHTML={{ __html: data.content }} />
										</React.Fragment>
									);
								})
							) : (
								<div style={{ height: "300px" }}>
									<Loader />
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Releases;
