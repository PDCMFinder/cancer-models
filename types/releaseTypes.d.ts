export interface IGitlabRelease {
	name: string;
	tag_name: string;
	description: string;
	created_at: string;
	released_at: string;
	upcoming_release: boolean;
	author: Author;
	commit: Commit;
	commit_path: string;
	tag_path: string;
	assets: Assets;
	evidences: Evidence[];
	_links: Links;
}

interface IGitlabAuthor {
	id: number;
	username: string;
	name: string;
	state: string;
	avatar_url: string;
	web_url: string;
}

interface IGitlabCommit {
	id: string;
	short_id: string;
	created_at: string;
	parent_ids: string[];
	title: string;
	message: string;
	author_name: string;
	author_email: string;
	authored_date: string;
	committer_name: string;
	committer_email: string;
	committed_date: string;
	trailers: object;
	web_url: string;
}

interface IGitlabAssets {
	count: number;
	sources: Source[];
	links: any[];
}

interface IGitlabSource {
	format: string;
	url: string;
}

interface IGitlabEvidence {
	sha: string;
	filepath: string;
	collected_at: string;
}

interface IGitlabLinks {
	closed_issues_url: string;
	closed_merge_requests_url: string;
	edit_url: string;
	merged_merge_requests_url: string;
	opened_issues_url: string;
	opened_merge_requests_url: string;
	self: string;
}

export interface IGithubRelease {
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

interface IGithubAuthor {
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
