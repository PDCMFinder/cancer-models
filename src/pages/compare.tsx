import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getAllModelData } from "../apis/ModelDetails.api";
import { useQuery } from "react-query";
import Loader from "../components/Loader/Loader";
import Head from "next/head";
import styles from "./compare.module.scss";
import Header from "../components/Compare/Header/Header";
import CommonDataTables from "../components/DataTables/CommonDataTables";
import DataTables from "../components/DataTables/DataTables";
import Button from "../components/Button/Button";

const Compare: NextPage = () => {
	const { query } = useRouter();
	const modelsToCompare: string[] =
		typeof query.models === "string" ? query.models.split(" ") : [];

	let { data: firstModelData } = useQuery(modelsToCompare[0], () => {
		return getAllModelData(modelsToCompare[0]);
	});
	let { data: secondModelData } = useQuery(modelsToCompare[1], () => {
		return getAllModelData(modelsToCompare[1]);
	});

	const getModelDataKeys = (targetArr: string[], data: any) => {
		for (const [key, value] of Object.entries(data)) {
			// add to keys to be shown if it contains data
			if (Array.isArray(value)) {
				if (value.length > 0) targetArr.push(key);
			} else if (Object.getOwnPropertyNames(value).length > 0) {
				targetArr.push(key);
			}
		}
	};

	let firstModelKeys: string[] = [];
	if (firstModelData) {
		getModelDataKeys(firstModelKeys, firstModelData);
	}
	let secondModelKeys: string[] = [];
	if (secondModelData) {
		getModelDataKeys(secondModelKeys, secondModelData);
	}

	let commonData: string[] = [];
	let differentData: string[] = [];
	const allModelDataKeys = [...firstModelKeys, ...secondModelKeys];
	allModelDataKeys.forEach((key) => {
		// don't add keys that don't use data table
		if (key === "metadata" || key === "extLinks") {
			return;
		}
		let counter = 0;
		for (let i = 0; i <= allModelDataKeys.length; i++) {
			if (allModelDataKeys[i] == key) {
				counter++;
			}
		}
		if (counter === 1) {
			// add key to different data keys since there's only one instance of it
			differentData.push(key);
		} else if (!commonData.includes(key)) {
			// add key to common data keys since both models have this key
			commonData.push(key);
		}
	});

	const metadataDataArr = [
		{
			label: "Patient Sex",
			value: [
				firstModelData?.metadata.patientSex,
				secondModelData?.metadata.patientSex,
			],
		},
		{
			label: "Patient Age",
			value: [
				firstModelData?.metadata.patientAge,
				secondModelData?.metadata.patientAge,
			],
		},
		{
			label: "Patient Ethnicity",
			value: [
				firstModelData?.metadata.patientEthnicity,
				secondModelData?.metadata.patientEthnicity,
			],
		},
		{
			label: "Tumour Type",
			value: [
				firstModelData?.metadata.tumourType,
				secondModelData?.metadata.tumourType,
			],
		},
		{
			label: "Cancer Grade",
			value: [
				firstModelData?.metadata.cancerGrade,
				secondModelData?.metadata.cancerGrade,
			],
		},
		{
			label: "Cancer Stage",
			value: [
				firstModelData?.metadata.cancerStage,
				secondModelData?.metadata.cancerStage,
			],
		},
		{
			label: "Primary Site",
			value: [
				firstModelData?.metadata.primarySite,
				secondModelData?.metadata.primarySite,
			],
		},
		{
			label: "Collection Site",
			value: [
				firstModelData?.metadata.collectionSite,
				secondModelData?.metadata.collectionSite,
			],
		},
	];

	return (
		<>
			<Head>
				<title>{`CancerModels.Org - Comparing ${modelsToCompare[0]} and ${modelsToCompare[1]}`}</title>
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Compare models</h1>
						</div>
					</div>
				</div>
			</header>
			{firstModelData && secondModelData ? (
				<section className="pt-0">
					<div className="container">
						<div className="row sticky top-0 pt-3 mb-3">
							<div className="col-12 col-lg-6">
								<Header
									modelId={modelsToCompare[0]}
									score={firstModelData?.metadata?.score}
									histology={firstModelData?.metadata?.histology}
								/>
							</div>
							<div className="col-12 col-lg-6">
								<Header
									modelId={modelsToCompare[1]}
									score={secondModelData?.metadata?.score}
									histology={secondModelData?.metadata?.histology}
								/>
							</div>
						</div>
						{commonData && (
							<div className="row">
								<div className="col-12">
									<h2>Sections where models overlap</h2>
								</div>
							</div>
						)}
						<div className="row">
							<div className="col-12">
								<h2 className="h3">Patient / Tumour Metadata</h2>
							</div>
							<div className="col-12">
								<div className="row">
									<div className="col-3">{/* <Image/> */}</div>
									<div className="col-6">
										<ul className="w-100 p-0 ul-noStyle">
											{metadataDataArr.map((data) => (
												<li
													key={data.label}
													className="mb-2 text-capitalize col-6 col-lg-3 w-100 text-center"
												>
													<span className={styles.metadataLabel}>
														{data.label}
													</span>
													<br />
													<div className="d-flex justify-content-between">
														{data.value.map((modelData, i) => {
															modelData =
																typeof modelData === "string"
																	? modelData.replace("/", " / ")
																	: modelData ?? "NA";

															return (
																<span
																	key={`${modelData}-${i}`}
																	style={{ width: "45%" }}
																	className={
																		i === 0 ? "text-right" : "text-left"
																	}
																>
																	{modelData}
																</span>
															);
														})}
													</div>
												</li>
											))}
										</ul>
									</div>
									<div className="col-3">{/* <Image/> */}</div>
								</div>
							</div>
						</div>
						{commonData.map((dataName) => (
							<CommonDataTables
								tableName={dataName}
								// @ts-ignore
								firstModelData={firstModelData && firstModelData[dataName]}
								// @ts-ignore
								secondModelData={secondModelData && secondModelData[dataName]}
								limited={true}
							/>
						))}
						{differentData && (
							<>
								<div className="row">
									<div className="col-12">
										<h2>Other sections</h2>
									</div>
								</div>
								<div className="row">
									<div className="col-6">
										{differentData.map((dataName) => (
											<DataTables
												tableName={dataName}
												modelData={
													// @ts-ignore
													firstModelData && firstModelData[dataName]
												}
												limited={true}
											/>
										))}
									</div>
									<div className="col-6">
										{differentData.map((dataName) => (
											<DataTables
												tableName={dataName}
												modelData={
													// @ts-ignore
													secondModelData && secondModelData[dataName]
												}
												limited={true}
											/>
										))}
									</div>
								</div>
							</>
						)}
						{differentData.map((dataName) => (
							<DataTables
								tableName={dataName}
								// @ts-ignore
								firstModelData={firstModelData && firstModelData[dataName]}
								// @ts-ignore
								secondModelData={secondModelData && secondModelData[dataName]}
								limited={true}
							/>
						))}
					</div>
					<div className="row">
						<div className="col-6 text-center">
							<Button
								color="dark"
								priority="primary"
								htmlTag="a"
								href={`/data/models/${firstModelData.metadata.providerId}/${modelsToCompare[0]}`}
							>
								<>See full {modelsToCompare[0]} details</>
							</Button>
						</div>
						<div className="col-6 text-center">
							<Button
								color="dark"
								priority="primary"
								htmlTag="a"
								href={`/data/models/${secondModelData.metadata.providerId}/${modelsToCompare[1]}`}
							>
								<>See full {modelsToCompare[1]} details</>
							</Button>
						</div>
					</div>
				</section>
			) : (
				<>
					<h1 className="text-center">Comparing...</h1>
					<Loader style={{ marginBottom: "50px" }} />
				</>
			)}
		</>
	);
};

export default Compare;
