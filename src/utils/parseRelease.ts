import { remark } from "remark";
import remarkHtml from "remark-html";
import { IGitlabRelease } from "../../types/releaseTypes";

const parseRelease = async (
	release: IGitlabRelease,
	repository?: "Data" | "UI"
) => {
	const searchTxt = "v";
	const regEscape = (v: string) =>
		v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	const strArr = release.tag_name.split(new RegExp(regEscape(searchTxt), "ig"));
	const parsedDescription = await remark()
		.use(remarkHtml, { sanitize: true })
		.process(release.description);

	release.released_at = release.released_at.split("T")[0];
	release.tag_name = `v${strArr[strArr.length - 1]}`;
	release.description = parsedDescription.toString();
	if (repository) release.repository = repository;

	return release;
};

export default parseRelease;
