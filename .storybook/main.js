module.exports = {
	stories: [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)",
		"../src/components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/preset-scss",
		"storybook-addon-next-router",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-webpack5",
	},
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		});

		return config;
	},
	previewHead: (head) => `
    ${head}
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');

      :root {
        --type-primary: 'Merriweather', serif;
        --type-secondary: 'Space Mono', monospace;
      }
    </style>
  `,
};
