export interface IGitlabRelease {
	name: string;
	repository?: "data" | "ui";
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
