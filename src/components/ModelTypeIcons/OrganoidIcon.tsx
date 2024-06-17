const OrganoidIcon = ({ color, size }: { color?: string; size: string }) => {
	return (
		<svg
			className="d-inline"
			style={{ height: size ?? "1em" }}
			viewBox="0 0 122 122"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M115.249 52.0037C113.547 50.3519 111.786 48.6433 111.389 47.1644C110.965 45.572 111.651 43.1385 112.314 40.7822C113.282 37.3429 114.284 33.7846 112.607 30.8889C110.907 27.949 107.29 27.0373 103.795 26.1533C101.451 25.5625 99.0295 24.9511 97.8993 23.8235C96.7732 22.6946 96.1603 20.2709 95.5696 17.9273C94.6869 14.4313 93.7752 10.8149 90.834 9.11595C87.9398 7.43779 84.38 8.43942 80.9393 9.40786C78.5846 10.0719 76.1538 10.7581 74.5586 10.332C73.0797 9.93497 71.3711 8.17379 69.7193 6.4723C67.2982 3.97512 64.5506 1.14453 61.0741 1.14453C57.5976 1.14453 54.8528 3.97512 52.4331 6.46946C50.7812 8.17114 49.0727 9.93228 47.5938 10.3292C45.9986 10.7581 43.5651 10.0691 41.2117 9.40503C37.771 8.4352 34.2141 7.43773 31.3184 9.11173C28.3785 10.812 27.4668 14.4285 26.5828 17.9231C25.9921 20.2681 25.3806 22.6906 24.2531 23.8193C23.1242 24.9482 20.7004 25.5611 18.3541 26.1518C14.8581 27.0331 11.2445 27.9448 9.54417 30.886C7.86602 33.783 8.86764 37.3414 9.83608 40.7833C10.4988 43.1379 11.185 45.5716 10.7602 47.164C10.3632 48.6429 8.60202 50.3515 6.90054 52.0033C4.40476 54.423 1.57422 57.1678 1.57422 60.6444C1.57422 64.1209 4.40479 66.8685 6.89912 69.2882C8.60079 70.9401 10.3619 72.6487 10.7588 74.1276C11.1835 75.72 10.4974 78.1534 9.83466 80.5083C8.86623 83.949 7.86461 87.506 9.54137 90.4031C11.2417 93.3429 14.8581 94.2547 18.3527 95.1372C20.6977 95.728 23.1187 96.3395 24.2489 97.4698C25.3791 98.6001 25.9907 101.022 26.5814 103.369C27.4626 106.863 28.3743 110.478 31.3155 112.179C34.2153 113.858 37.7709 112.851 41.2102 111.885C43.5663 111.223 46.0081 110.541 47.5909 110.961C49.0726 111.358 50.7798 113.12 52.4317 114.821C54.8527 117.314 57.5975 120.145 61.074 120.145C64.5534 120.145 67.2982 117.314 69.7193 114.817C71.3697 113.116 73.0769 111.355 74.5572 110.96C76.1454 110.539 78.5787 111.22 80.9378 111.884C84.3785 112.852 87.9369 113.854 90.8326 112.177C93.7724 110.477 94.6841 106.86 95.5667 103.367C96.1575 101.021 96.7689 98.5995 97.8992 97.468C99.0281 96.3418 101.452 95.7289 103.795 95.1382C107.291 94.2556 110.908 93.3439 112.607 90.4026C114.282 87.5056 113.28 83.9486 112.313 80.5079C111.651 78.1532 110.965 75.7195 111.389 74.13C111.786 72.6483 113.547 70.9411 115.246 69.2906C117.744 66.8682 120.574 64.1233 120.574 60.6439C120.574 57.1673 117.743 54.4234 115.249 52.0037ZM112.486 66.4443C110.397 68.4697 108.238 70.5657 107.56 73.1058C106.854 75.7483 107.688 78.7145 108.498 81.5825C109.243 84.2319 110.015 86.9698 109.178 88.4155C108.314 89.9069 105.525 90.6097 102.828 91.2917C99.9645 92.0139 97.0011 92.761 95.0989 94.6633C93.1966 96.5655 92.4496 99.5288 91.7247 102.394C91.044 105.089 90.3426 107.879 88.8512 108.743C87.4069 109.576 84.6703 108.808 82.0183 108.062C79.1489 107.253 76.1773 106.412 73.5391 107.124C71.0005 107.805 68.9045 109.964 66.879 112.051C64.9076 114.082 62.8727 116.179 61.0739 116.179C59.2768 116.179 57.2418 114.084 55.2787 112.059C53.2519 109.968 51.1558 107.809 48.6146 107.131C47.9146 106.943 47.1925 106.865 46.4564 106.865C44.4075 106.865 42.2436 107.474 40.1338 108.068C37.4859 108.812 34.7424 109.582 33.3009 108.748C31.8095 107.884 31.1067 105.095 30.4274 102.399C29.7039 99.5328 28.9554 96.5708 27.0532 94.6686C25.1509 92.7664 22.1876 92.0192 19.3238 91.2943C16.6261 90.6136 13.8357 89.9123 12.9736 88.4208C12.1366 86.9751 12.9086 84.2385 13.6543 81.5879C14.4609 78.7199 15.2979 75.7522 14.5923 73.1112C13.9144 70.5711 11.752 68.4737 9.66582 66.4471C7.63765 64.4771 5.54048 62.4433 5.54048 60.6448C5.54048 58.8477 7.63506 56.8155 9.66051 54.8495C11.7509 52.8227 13.9133 50.7266 14.5884 48.1855C15.294 45.5431 14.4611 42.5768 13.6518 39.7088C12.9061 37.0594 12.1341 34.3201 12.9711 32.8744C13.8344 31.383 16.6222 30.6802 19.3199 30.0009C22.1865 29.2773 25.1484 28.5289 27.0507 26.6266C28.9529 24.7244 29.7 21.7639 30.4222 18.9001C31.1042 16.2009 31.807 13.4105 33.2984 12.547C34.74 11.7114 37.4807 12.482 40.1285 13.2277C42.9951 14.0342 45.9613 14.8796 48.6076 14.1657C51.1477 13.4877 53.2451 11.3254 55.2716 9.23774C57.2444 7.20542 59.2769 5.11097 61.0739 5.11097C62.8724 5.11097 64.906 7.20694 66.8706 9.23243C68.8974 11.3215 70.9934 13.4825 73.5346 14.1589C76.1742 14.8686 79.1432 14.0303 82.0112 13.2223C84.6592 12.4766 87.4027 11.7088 88.8441 12.5417C90.3355 13.4049 91.0383 16.1953 91.7204 18.8919C92.4426 21.7557 93.1896 24.719 95.0919 26.6213C96.9941 28.5236 99.9574 29.2706 102.821 29.9928C105.519 30.6749 108.309 31.3777 109.171 32.869C110.008 34.3148 109.236 37.0514 108.491 39.6992C107.684 42.5671 106.847 45.5359 107.553 48.1798C108.233 50.7184 110.393 52.8144 112.481 54.8413C114.513 56.8128 116.607 58.8477 116.607 60.6451C116.607 62.4436 114.51 64.4783 112.486 66.4443ZM43.9727 43.8037C48.6697 43.8037 52.4893 39.9839 52.4893 35.2869C52.4893 30.59 48.6697 26.7688 43.9727 26.7688C39.2757 26.7688 35.4546 30.5914 35.4546 35.2869C35.4532 39.9839 39.2757 43.8037 43.9727 43.8037ZM43.9727 30.7355C46.4823 30.7355 48.523 32.7761 48.523 35.2873C48.523 37.7969 46.4824 39.8377 43.9727 39.8377C41.4617 39.8377 39.4209 37.7971 39.4209 35.2873C39.4196 32.7763 41.4615 30.7355 43.9727 30.7355ZM94.5938 55.2398C89.8968 55.2398 86.0757 59.0623 86.0757 63.7579C86.0757 68.4549 89.8982 72.2746 94.5938 72.2746C99.2907 72.2746 103.11 68.4549 103.11 63.7579C103.11 59.0623 99.2921 55.2398 94.5938 55.2398ZM94.5938 68.3079C92.0828 68.3079 90.042 66.2673 90.042 63.7575C90.042 61.2465 92.0826 59.2058 94.5938 59.2058C97.1034 59.2058 99.1441 61.2464 99.1441 63.7575C99.1427 66.2671 97.1021 68.3079 94.5938 68.3079ZM80.4795 81.4536C76.8383 81.4536 73.875 84.4142 73.875 88.0557C73.875 91.6971 76.8384 94.6602 80.4795 94.6602C84.1206 94.6602 87.0815 91.6968 87.0815 88.0557C87.0829 84.4159 84.1209 81.4536 80.4795 81.4536ZM80.4795 90.6939C79.0255 90.6939 77.8413 89.5096 77.8413 88.0556C77.8413 86.6043 79.0255 85.4201 80.4795 85.4201C81.9308 85.4201 83.115 86.6043 83.115 88.0556C83.115 89.5124 81.9335 90.6939 80.4795 90.6939ZM70.3153 35.3549C73.9565 35.3549 76.9173 32.3943 76.9173 28.7529C76.9173 25.1115 73.9567 22.1483 70.3153 22.1483C66.6739 22.1483 63.7108 25.1117 63.7108 28.7529C63.7108 32.394 66.6742 35.3549 70.3153 35.3549ZM70.3153 26.1147C71.7665 26.1147 72.9508 27.299 72.9508 28.753C72.9508 30.2042 71.7665 31.3885 70.3153 31.3885C68.8612 31.3885 67.677 30.2042 67.677 28.753C67.677 27.2989 68.8613 26.1147 70.3153 26.1147ZM28.1765 54.0427C24.5353 54.0427 21.572 57.0033 21.572 60.6447C21.572 64.2862 24.5354 67.2493 28.1765 67.2493C31.8176 67.2493 34.7785 64.2859 34.7785 60.6447C34.7799 57.0035 31.8179 54.0427 28.1765 54.0427ZM28.1765 63.2829C26.7225 63.2829 25.5382 62.0987 25.5382 60.6447C25.5382 59.1934 26.7225 58.0092 28.1765 58.0092C29.6278 58.0092 30.812 59.1934 30.812 60.6447C30.8134 62.0987 29.6291 63.2829 28.1765 63.2829ZM82.4667 53.5947C82.4667 46.8973 77.0158 41.4463 70.3185 41.4463C63.6212 41.4463 58.1702 46.8973 58.1702 53.5947C58.1702 60.292 63.6212 65.743 70.3185 65.743C77.0158 65.7416 82.4667 60.292 82.4667 53.5947ZM70.3185 61.7753C65.8085 61.7753 62.1365 58.1036 62.1365 53.5932C62.1365 49.0829 65.8081 45.4112 70.3185 45.4112C74.8284 45.4112 78.5004 49.0829 78.5004 53.5932C78.5004 58.1047 74.8302 61.7753 70.3185 61.7753ZM50.5071 65.7958C41.79 65.7958 34.6995 72.8862 34.6995 81.6034C34.6995 90.3206 41.79 97.411 50.5071 97.411C59.2242 97.411 66.3146 90.3206 66.3146 81.6034C66.3146 72.8862 59.2217 65.7958 50.5071 65.7958ZM50.5071 93.4419C43.9784 93.4419 38.6659 88.1307 38.6659 81.6006C38.6659 75.0718 43.9769 69.7593 50.5071 69.7593C57.0358 69.7593 62.3483 75.0704 62.3483 81.6006C62.3469 88.1307 57.0358 93.4419 50.5071 93.4419Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
				strokeWidth="2"
			/>
		</svg>
	);
};

export default OrganoidIcon;
