import styles from "./Logotype.module.scss";

type ILogotypeProps = { color: "dark" | "light" | "white" };

const Logotype = (props: ILogotypeProps) => {
	return (
		<svg
			className={styles[`Logotype-${props.color}`]}
			viewBox="0 0 352 41"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13.023 31.4072C8.82967 31.4072 5.623 30.1615 3.403 27.6702C1.183 25.1542 0.072998 21.7255 0.072998 17.3842C0.072998 14.5228 0.652665 12.0315 1.812 9.91016C2.996 7.76416 4.61166 6.11149 6.659 4.95216C8.70633 3.79282 11.025 3.21316 13.615 3.21316C14.7003 3.21316 15.7487 3.28716 16.76 3.43516C17.7713 3.55849 18.9677 3.73116 20.349 3.95316C21.385 4.12582 21.9523 4.21216 22.051 4.21216L21.644 11.8342H18.24L17.093 6.54316C16.8217 6.27182 16.353 6.04982 15.687 5.87716C15.021 5.70449 14.17 5.61816 13.134 5.61816C11.0373 5.61816 9.34767 6.59249 8.065 8.54116C6.807 10.4652 6.178 13.2648 6.178 16.9402C6.178 20.4922 6.78233 23.3905 7.991 25.6352C9.19967 27.8798 10.9633 29.0022 13.282 29.0022C14.392 29.0022 15.243 28.9035 15.835 28.7062C16.4517 28.4842 16.9697 28.1758 17.389 27.7812L19.017 23.9702L22.125 24.2662L21.385 30.0012C20.867 30.0505 20.349 30.1492 19.831 30.2972C19.3377 30.4205 19.0293 30.4945 18.906 30.5192C17.9193 30.7905 16.9943 31.0002 16.131 31.1482C15.2923 31.3208 14.2563 31.4072 13.023 31.4072Z"
				className={styles.Logotype_firstLetter}
			/>
			<path
				d="M25.3515 25.2282C25.3515 22.9835 26.4738 21.2938 28.7185 20.1592C30.9878 19.0245 33.9108 18.4448 37.4875 18.4202V17.5692C37.4875 16.5578 37.3765 15.7685 37.1545 15.2012C36.9572 14.6338 36.5748 14.2145 36.0075 13.9432C35.4648 13.6472 34.6632 13.4992 33.6025 13.4992C32.3938 13.4992 31.3085 13.6595 30.3465 13.9802C29.3845 14.2762 28.3855 14.6708 27.3495 15.1642L26.2025 12.7962C26.5725 12.4755 27.1892 12.0932 28.0525 11.6492C28.9405 11.2052 29.9888 10.8228 31.1975 10.5022C32.4062 10.1568 33.6518 9.98416 34.9345 9.98416C36.8338 9.98416 38.3138 10.2308 39.3745 10.7242C40.4598 11.2175 41.2368 12.0068 41.7055 13.0922C42.1742 14.1775 42.4085 15.6328 42.4085 17.4582V28.7802H44.4065V30.8522C43.9132 30.9755 43.2102 31.0988 42.2975 31.2222C41.3848 31.3455 40.5832 31.4072 39.8925 31.4072C39.0538 31.4072 38.4865 31.2838 38.1905 31.0372C37.9192 30.7905 37.7835 30.2848 37.7835 29.5202V28.5212C37.1175 29.2612 36.2542 29.9272 35.1935 30.5192C34.1328 31.1112 32.9365 31.4072 31.6045 31.4072C30.4698 31.4072 29.4215 31.1728 28.4595 30.7042C27.5222 30.2108 26.7698 29.5078 26.2025 28.5952C25.6352 27.6578 25.3515 26.5355 25.3515 25.2282ZM33.9725 28.3362C34.4905 28.3362 35.0825 28.1882 35.7485 27.8922C36.4145 27.5715 36.9942 27.1892 37.4875 26.7452V20.6772C35.2675 20.6772 33.6025 21.0595 32.4925 21.8242C31.4072 22.5642 30.8645 23.5262 30.8645 24.7102C30.8645 25.8942 31.1358 26.7945 31.6785 27.4112C32.2458 28.0278 33.0105 28.3362 33.9725 28.3362Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M49.5275 13.9432L47.1595 13.2772V10.7242L53.3015 9.94716H53.4125L54.3375 10.6872V12.1302L54.3005 13.0182C55.1639 12.2042 56.2862 11.5012 57.6675 10.9092C59.0489 10.3172 60.4425 10.0212 61.8485 10.0212C63.3532 10.0212 64.5249 10.3048 65.3635 10.8722C66.2269 11.4148 66.8435 12.2782 67.2135 13.4622C67.5835 14.6462 67.7685 16.2495 67.7685 18.2722V28.4842L70.0256 28.7802V31.0002H60.4795V28.7802L62.4775 28.4842V18.2722C62.4775 16.9895 62.3912 15.9905 62.2185 15.2752C62.0459 14.5352 61.7252 14.0048 61.2565 13.6842C60.8125 13.3388 60.1712 13.1662 59.3325 13.1662C57.9265 13.1662 56.4219 13.7705 54.8185 14.9792V28.4472L57.0385 28.7802V31.0002H47.3815V28.7802L49.5275 28.4472V13.9432Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M72.8991 20.8252C72.8991 18.7038 73.3185 16.8168 74.1571 15.1642C75.0205 13.5115 76.2415 12.2288 77.8201 11.3162C79.4235 10.3788 81.2858 9.91016 83.4071 9.91016C84.3938 9.91016 85.2448 9.98416 85.9601 10.1322C86.6755 10.2802 87.4771 10.4775 88.3651 10.7242L89.4381 11.0202L89.2161 17.3472H85.9971L85.0721 13.2772C84.9241 12.6358 84.1965 12.3152 82.8891 12.3152C81.5078 12.3152 80.4225 12.9195 79.6331 14.1282C78.8685 15.3368 78.4738 17.2238 78.4491 19.7892C78.4491 22.5025 78.9178 24.5868 79.8551 26.0422C80.7925 27.4728 82.0381 28.1882 83.5921 28.1882C85.4668 28.1882 87.1935 27.6825 88.7721 26.6712L89.6231 28.5952C88.9818 29.2858 87.9951 29.9272 86.6631 30.5192C85.3558 31.1112 83.9375 31.4072 82.4081 31.4072C79.2508 31.4072 76.8705 30.4328 75.2671 28.4842C73.6885 26.5355 72.8991 23.9825 72.8991 20.8252Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M102.631 31.4072C99.3746 31.4072 96.945 30.4575 95.3416 28.5582C93.763 26.6342 92.9736 24.0195 92.9736 20.7142C92.9736 18.4942 93.3806 16.5702 94.1946 14.9422C95.0333 13.3142 96.205 12.0685 97.7096 11.2052C99.2143 10.3418 100.953 9.91016 102.927 9.91016C105.393 9.91016 107.293 10.5638 108.625 11.8712C109.957 13.1538 110.647 14.9915 110.697 17.3842C110.697 19.0122 110.598 20.2208 110.401 21.0102H98.3756C98.4743 23.2548 99.0046 25.0062 99.9666 26.2642C100.929 27.4975 102.298 28.1142 104.074 28.1142C105.036 28.1142 106.022 27.9538 107.034 27.6332C108.07 27.3125 108.884 26.9302 109.476 26.4862L110.401 28.5212C109.735 29.2365 108.649 29.9025 107.145 30.5192C105.665 31.1112 104.16 31.4072 102.631 31.4072ZM105.517 18.7902C105.566 18.0995 105.591 17.5692 105.591 17.1992C105.591 13.9185 104.493 12.2782 102.298 12.2782C101.089 12.2782 100.152 12.7592 99.4856 13.7212C98.8196 14.6832 98.4496 16.3728 98.3756 18.7902H105.517Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M114.389 28.8172L116.831 28.5212V13.9432L114.463 13.2772V10.7242L120.198 9.94716H120.309L121.234 10.6872V11.5012L121.123 14.4982H121.234C121.407 14.0048 121.814 13.4005 122.455 12.6852C123.097 11.9452 123.898 11.3038 124.86 10.7612C125.847 10.1938 126.908 9.91016 128.042 9.91016C128.585 9.91016 129.054 9.98416 129.448 10.1322V15.6822C128.708 15.1642 127.808 14.9052 126.747 14.9052C124.947 14.9052 123.38 15.3862 122.048 16.3482V28.4842L126.34 28.8172V31.0002H114.389V28.8172Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M136.8 6.28416L132.804 5.80316V3.50916H144.348L148.751 19.4192L149.787 23.7482L150.675 19.4192L155.041 3.50916H166.474V5.80316L162.441 6.28416L165.401 28.3732L168.398 28.7802V31.0002H156.595V28.7802L159.851 28.4102L158.223 12.2042L157.52 5.43316L156.151 11.1312L150.786 29.8532H146.864L141.388 12.0932L139.501 5.43316L138.946 12.2042L137.54 28.4102L141.277 28.7802V31.0002H130.991V28.7802L134.099 28.4102L136.8 6.28416Z"
				className={styles.Logotype_firstLetter}
			/>
			<path
				d="M170.9 20.7512C170.9 18.4325 171.356 16.4592 172.269 14.8312C173.206 13.2032 174.452 11.9822 176.006 11.1682C177.56 10.3295 179.249 9.91016 181.075 9.91016C184.183 9.91016 186.575 10.8722 188.253 12.7962C189.955 14.6955 190.806 17.2855 190.806 20.5662C190.806 22.9095 190.337 24.9075 189.4 26.5602C188.487 28.1882 187.254 29.4092 185.7 30.2232C184.17 31.0125 182.481 31.4072 180.631 31.4072C177.547 31.4072 175.155 30.4575 173.453 28.5582C171.751 26.6342 170.9 24.0318 170.9 20.7512ZM180.927 29.0022C183.714 29.0022 185.108 26.3135 185.108 20.9362C185.108 18.1242 184.775 15.9905 184.109 14.5352C183.443 13.0552 182.357 12.3152 180.853 12.3152C177.991 12.3152 176.561 15.0038 176.561 20.3812C176.561 23.1932 176.906 25.3392 177.597 26.8192C178.312 28.2745 179.422 29.0022 180.927 29.0022Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M202.642 31.4072C201.113 31.4072 199.744 31.0495 198.535 30.3342C197.327 29.5942 196.365 28.4595 195.649 26.9302C194.934 25.4008 194.576 23.4892 194.576 21.1952C194.576 19.1232 194.996 17.2362 195.834 15.5342C196.698 13.8075 197.956 12.4385 199.608 11.4272C201.261 10.4158 203.247 9.91016 205.565 9.91016C206.503 9.91016 207.391 10.0088 208.229 10.2062V3.95316L204.603 3.43516V1.40016L212.225 0.660156H212.336L213.372 1.43716V28.7432H215.37V30.8522C213.594 31.2222 212.127 31.4072 210.967 31.4072C210.178 31.4072 209.611 31.2715 209.265 31.0002C208.945 30.7535 208.784 30.2478 208.784 29.4832V28.4472C208.143 29.3105 207.267 30.0258 206.157 30.5932C205.047 31.1358 203.876 31.4072 202.642 31.4072ZM204.566 28.3362C205.38 28.3362 206.096 28.1758 206.712 27.8552C207.354 27.5098 207.859 27.1028 208.229 26.6342V13.1662C208.057 12.9195 207.687 12.7098 207.119 12.5372C206.577 12.3645 205.985 12.2782 205.343 12.2782C203.765 12.2782 202.494 12.9688 201.532 14.3502C200.595 15.7068 200.126 17.8898 200.126 20.8992C200.126 23.4152 200.533 25.2898 201.347 26.5232C202.161 27.7318 203.234 28.3362 204.566 28.3362Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M228.134 31.4072C224.878 31.4072 222.449 30.4575 220.845 28.5582C219.267 26.6342 218.477 24.0195 218.477 20.7142C218.477 18.4942 218.884 16.5702 219.698 14.9422C220.537 13.3142 221.709 12.0685 223.213 11.2052C224.718 10.3418 226.457 9.91016 228.43 9.91016C230.897 9.91016 232.796 10.5638 234.128 11.8712C235.46 13.1538 236.151 14.9915 236.2 17.3842C236.2 19.0122 236.102 20.2208 235.904 21.0102H223.879C223.978 23.2548 224.508 25.0062 225.47 26.2642C226.432 27.4975 227.801 28.1142 229.577 28.1142C230.539 28.1142 231.526 27.9538 232.537 27.6332C233.573 27.3125 234.387 26.9302 234.979 26.4862L235.904 28.5212C235.238 29.2365 234.153 29.9025 232.648 30.5192C231.168 31.1112 229.664 31.4072 228.134 31.4072ZM231.02 18.7902C231.07 18.0995 231.094 17.5692 231.094 17.1992C231.094 13.9185 229.997 12.2782 227.801 12.2782C226.593 12.2782 225.655 12.7592 224.989 13.7212C224.323 14.6832 223.953 16.3728 223.879 18.7902H231.02Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M242.039 3.95316L239.301 3.47216V1.47416L246.146 0.660156H246.22L247.219 1.36316V28.4842L249.92 28.7802V31.0002H239.449V28.7802L242.039 28.4472V3.95316Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M257.314 27.9662C257.512 28.2622 257.956 28.5458 258.646 28.8172C259.362 29.0638 260.077 29.1872 260.792 29.1872C261.952 29.1872 262.815 28.9528 263.382 28.4842C263.974 27.9908 264.27 27.3495 264.27 26.5602C264.27 25.7462 263.913 25.0925 263.197 24.5992C262.482 24.0812 261.273 23.4522 259.571 22.7122L258.535 22.2682C256.833 21.5528 255.563 20.6895 254.724 19.6782C253.886 18.6668 253.466 17.3595 253.466 15.7562C253.466 14.6462 253.799 13.6595 254.465 12.7962C255.131 11.9082 256.069 11.2175 257.277 10.7242C258.486 10.2308 259.88 9.98416 261.458 9.98416C262.618 9.98416 263.604 10.0582 264.418 10.2062C265.257 10.3542 266.133 10.5515 267.045 10.7982C267.539 10.9708 267.909 11.0695 268.155 11.0942V15.9412H265.232L264.381 13.1292C264.233 12.8825 263.9 12.6605 263.382 12.4632C262.864 12.2658 262.272 12.1672 261.606 12.1672C260.595 12.1672 259.781 12.3892 259.164 12.8332C258.572 13.2525 258.276 13.8445 258.276 14.6092C258.276 15.2998 258.486 15.8795 258.905 16.3482C259.325 16.7922 259.781 17.1375 260.274 17.3842C260.768 17.6308 261.68 18.0378 263.012 18.6052C264.344 19.1725 265.442 19.7152 266.305 20.2332C267.193 20.7512 267.921 21.4295 268.488 22.2682C269.08 23.0822 269.376 24.0812 269.376 25.2652C269.376 27.0905 268.661 28.5705 267.23 29.7052C265.8 30.8398 263.74 31.4072 261.051 31.4072C259.793 31.4072 258.659 31.2962 257.647 31.0742C256.661 30.8522 255.514 30.5562 254.206 30.1862L253.392 29.9272V25.0432H256.463L257.314 27.9662Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M276.612 31.3332C275.847 31.3332 275.181 31.0742 274.614 30.5562C274.047 30.0135 273.763 29.3352 273.763 28.5212C273.763 27.6085 274.084 26.8685 274.725 26.3012C275.391 25.7092 276.193 25.4132 277.13 25.4132C278.018 25.4132 278.721 25.6968 279.239 26.2642C279.757 26.8068 280.016 27.4605 280.016 28.2252C280.016 29.1872 279.695 29.9518 279.054 30.5192C278.437 31.0618 277.623 31.3332 276.612 31.3332Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M296.184 31.4072C292.163 31.4072 289.154 30.1492 287.156 27.6332C285.158 25.1172 284.159 21.6885 284.159 17.3472C284.159 14.5105 284.677 12.0192 285.713 9.87316C286.773 7.72716 288.253 6.07449 290.153 4.91516C292.052 3.75582 294.235 3.17616 296.702 3.17616C300.772 3.17616 303.818 4.38482 305.841 6.80216C307.888 9.19482 308.912 12.5495 308.912 16.8662C308.912 19.7275 308.369 22.2682 307.284 24.4882C306.223 26.6835 304.731 28.3855 302.807 29.5942C300.883 30.8028 298.675 31.4072 296.184 31.4072ZM296.554 5.43316C294.531 5.43316 292.952 6.43216 291.818 8.43016C290.683 10.4282 290.116 13.3882 290.116 17.3102C290.116 21.1828 290.658 24.1305 291.744 26.1532C292.854 28.1512 294.432 29.1502 296.48 29.1502C298.478 29.1502 300.044 28.1018 301.179 26.0052C302.313 23.8838 302.881 20.8375 302.881 16.8662C302.881 13.0182 302.338 10.1568 301.253 8.28216C300.167 6.38282 298.601 5.43316 296.554 5.43316Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M312.373 28.8172L314.815 28.5212V13.9432L312.447 13.2772V10.7242L318.182 9.94716H318.293L319.218 10.6872V11.5012L319.107 14.4982H319.218C319.39 14.0048 319.797 13.4005 320.439 12.6852C321.08 11.9452 321.882 11.3038 322.844 10.7612C323.83 10.1938 324.891 9.91016 326.026 9.91016C326.568 9.91016 327.037 9.98416 327.432 10.1322V15.6822C326.692 15.1642 325.791 14.9052 324.731 14.9052C322.93 14.9052 321.364 15.3862 320.032 16.3482V28.4842L324.324 28.8172V31.0002H312.373V28.8172Z"
				className={styles.Logotype_notFirstLetter}
			/>
			<path
				d="M339.483 40.9902C336.177 40.9902 333.785 40.4722 332.305 39.4362C330.825 38.4002 330.085 36.9942 330.085 35.2182C330.085 34.2068 330.418 33.2448 331.084 32.3322C331.774 31.4442 332.601 30.7782 333.563 30.3342C332.428 29.6682 331.861 28.6075 331.861 27.1522C331.861 26.3135 332.132 25.5242 332.675 24.7842C333.217 24.0195 333.92 23.4275 334.784 23.0082C333.427 22.4902 332.416 21.7008 331.75 20.6402C331.084 19.5795 330.751 18.3215 330.751 16.8662C330.751 15.4602 331.158 14.2392 331.972 13.2032C332.81 12.1425 333.92 11.3285 335.302 10.7612C336.708 10.1938 338.225 9.91016 339.853 9.91016C342.739 9.91016 344.885 10.4652 346.291 11.5752C346.611 11.1558 347.154 10.7612 347.919 10.3912C348.683 10.0212 349.473 9.83616 350.287 9.83616H351.582V13.8692H347.771C348.141 14.6585 348.326 15.4972 348.326 16.3852C348.35 18.6298 347.561 20.4305 345.958 21.7872C344.354 23.1192 342.159 23.7852 339.372 23.7852C338.212 23.7852 337.238 23.6988 336.449 23.5262C336.202 23.8468 336.005 24.1922 335.857 24.5622C335.733 24.9075 335.672 25.2158 335.672 25.4872C335.672 26.3012 335.955 26.8562 336.523 27.1522C337.115 27.4482 338.163 27.5962 339.668 27.5962H343.627C348.659 27.5962 351.175 29.4215 351.175 33.0722C351.175 34.6015 350.632 35.9705 349.547 37.1792C348.461 38.3878 347.018 39.3252 345.218 39.9912C343.417 40.6572 341.505 40.9902 339.483 40.9902ZM339.742 21.4912C342.036 21.4912 343.183 19.9248 343.183 16.7922C343.183 15.1888 342.887 14.0172 342.295 13.2772C341.727 12.5125 340.852 12.1302 339.668 12.1302C338.508 12.1302 337.608 12.5125 336.967 13.2772C336.35 14.0172 336.042 15.1395 336.042 16.6442C336.042 19.8755 337.275 21.4912 339.742 21.4912ZM340.038 38.4372C341.592 38.4372 342.936 38.0548 344.071 37.2902C345.205 36.5502 345.773 35.5142 345.773 34.1822C345.773 33.1215 345.489 32.3568 344.922 31.8882C344.379 31.4195 343.392 31.1852 341.962 31.1852H337.929C337.312 31.1852 336.745 31.1482 336.227 31.0742C335.561 31.9622 335.228 33.0228 335.228 34.2562C335.228 35.6128 335.598 36.6488 336.338 37.3642C337.078 38.0795 338.311 38.4372 340.038 38.4372Z"
				className={styles.Logotype_notFirstLetter}
			/>
		</svg>
	);
};

export default Logotype;
