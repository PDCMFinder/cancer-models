// mostly needed to dynamically import driver.js
declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}
