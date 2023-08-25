import type { NextPage } from "next";
import { getReleaseChangeLog } from "../../../apis/AggregatedData.api";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader/Loader";

export interface Release {
	url: string;
	assets_url: string;
	upload_url: string;
	html_url: string;
	id: number;
	author: Author;
	node_id: string;
	tag_name: string;
	target_commitish: string;
	name: string;
	draft: boolean;
	prerelease: boolean;
	created_at: string;
	published_at: string;
	assets: any[];
	tarball_url: string;
	zipball_url: string;
	body: string;
}

export interface Author {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
}

interface IReleasesProps {}

const Releases: NextPage<IReleasesProps> = () => {
	let releaseChangeLog = useQuery("releaseChangeLog", () => {
		return getReleaseChangeLog();
	});

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
							{releaseChangeLog.data ? (
								releaseChangeLog.data.map((data: Release) => {
									return (
										<>
											<h2>{data.name}</h2>
											<p style={{ whiteSpace: "pre-wrap" }}>{data.body}</p>
										</>
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
