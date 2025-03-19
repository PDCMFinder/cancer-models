import BlueskyIcon from "./BlueskyIcon";
import LinkedinIcon from "./LinkedinIcon";
import TwitterIcon from "./TwitterIcon";
import YoutubeIcon from "./YoutubeIcon";

type Props = {
	linkClassName?: string;
};

const SocialMediaIcons = ({ linkClassName }: Props) => {
	return (
		<div className="d-flex align-center" style={{ gap: "1.5rem" }}>
			<a
				href="https://www.linkedin.com/company/cancermodelsorg/"
				target="_blank"
				rel="noopener noreferrer"
				className={linkClassName}
			>
				<LinkedinIcon />
			</a>
			<a
				href="https://www.youtube.com/@CancerModelsOrg"
				target="_blank"
				rel="noopener noreferrer"
				className={linkClassName}
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
			<a
				href="https://bsky.app/profile/cancermodelsorg.bsky.social"
				target="_blank"
				rel="noopener noreferrer"
				className={linkClassName}
			>
				<BlueskyIcon />
			</a>
		</div>
	);
};

export default SocialMediaIcons;
