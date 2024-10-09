import LinkedinIcon from "./LinkedinIcon";
import TwitterIcon from "./TwitterIcon";
import YoutubeIcon from "./YoutubeIcon";

type Props = {
	linkClassName?: string;
};

const SocialMediaIcons = ({ linkClassName }: Props) => {
	return (
		<div className="d-flex align-center">
			<a
				href="https://www.linkedin.com/company/cancermodelsorg/"
				target="_blank"
				rel="noopener noreferrer"
				className={`${linkClassName} mr-2`}
			>
				<LinkedinIcon />
			</a>
			<a
				href="https://www.youtube.com/@CancerModelsOrg"
				target="_blank"
				rel="noopener noreferrer"
				className={`${linkClassName} mr-2`}
			>
				<YoutubeIcon />
			</a>
			<a
				href="https://www.twitter.com/cancermodelsorg"
				target="_blank"
				rel="noopener noreferrer"
				className={linkClassName}
			>
				<TwitterIcon />
			</a>
		</div>
	);
};

export default SocialMediaIcons;
