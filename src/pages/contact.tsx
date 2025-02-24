import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import ReactGA from "react-ga4";
import ReCAPTCHA from "react-google-recaptcha";
import { createTicket } from "../apis/Contact.api";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Form from "../components/Form/Form";
import SocialMediaIcons from "../components/Icons/SocialMediaIcons";
import InputAndLabel from "../components/Input/InputAndLabel";
import Loader from "../components/Loader/Loader";

type FormStatus = {
	status: "success" | "error" | "loading" | "";
	message: string;
};

const Contact: NextPage = () => {
	const recaptchaRef = useRef<any>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);
	const [formStatus, setFormStatus] = useState<FormStatus>({
		status: "",
		message: ""
	});

	const handleFormOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		setFormStatus({ status: "loading", message: "" });

		if (!recaptchaRef.current.executeAsync) {
			return;
		}

		let { value: nameValue } = nameRef.current!;
		let { value: emailValue } = emailRef.current!;
		let { value: messageValue } = messageRef.current!;
		const token = await recaptchaRef.current.executeAsync();
		const response = await createTicket(
			nameValue,
			emailValue,
			messageValue,
			token
		);

		if (!response.error) {
			if (nameRef.current) nameRef.current.value = "";
			if (emailRef.current) emailRef.current.value = "";
			if (messageRef.current) messageRef.current.value = "";
			setFormStatus({
				status: "success",
				message: "Thank you for your message! We will be in touch soon."
			});

			ReactGA.event("contactForm-success", {
				category: "event",
				value: 1
			});
		} else if (response.error) {
			// Logging the error so Hotjar can show it in analytics
			console.log("Error_code: CFER");
			setFormStatus({
				status: "error",
				message:
					"There has been an error sending the form. Try again or email info@cancermodels.org instead, thank you!"
			});
		}
	};

	return (
		<>
			{/* page metadata */}
			<Head>
				<title>
					Connect with CancerModels.Org for Collaborations & Inquiries
				</title>
				<meta
					name="description"
					content="Contact our team to explore opportunities in cancer research, model contributions, or any questions you may have."
				/>
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Contact CancerModels.Org</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row justify-content-around mb-5">
						<div className="col-12 col-md-6">
							<Card>
								<p className="text-center">
									If you are interested in acquiring a specific model or have
									questions about it, please visit the models page. You can
									contact the provider using the links on the right side of the
									top banner.
								</p>
							</Card>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<h2>CancerModels.Org Feedback</h2>
							<p>
								CancerModels.Org is continuously developed in response to
								community&apos;s needs. We need your feedback to improve and
								refine the CancerModels.Org.
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
							<Form onSubmit={handleFormOnSubmit}>
								<InputAndLabel
									forId="name"
									id="name"
									name="name-name"
									type="text"
									label="Your name"
									inputRef={nameRef}
								/>
								<InputAndLabel
									forId="email"
									id="email"
									name="email-name"
									type="email"
									label="Email address"
									inputClassName="mb-0"
									inputRef={emailRef}
								/>
								<p className="text-small text-muted">
									We&apos;ll never share your email with anyone else.
								</p>
								<InputAndLabel
									forId="message"
									id="message"
									name="message-name"
									type="textarea"
									label="Your message *"
									inputRef={messageRef}
									required={true}
								/>
								<p className="text-muted text-small">
									This site is protected by reCAPTCHA and the Google{" "}
									<Link
										href="https://policies.google.com/privacy"
										target="_blank"
										rel="noopener noreferrer"
									>
										Privacy Policy
									</Link>{" "}
									and{" "}
									<Link
										href="https://policies.google.com/terms"
										target="_blank"
										rel="noopener noreferrer"
									>
										Terms of Service
									</Link>{" "}
									apply.
								</p>
								<div className="text-right">
									<Button type="submit" priority="primary" color="dark">
										Submit
									</Button>
								</div>
								<ReCAPTCHA
									ref={recaptchaRef}
									size="invisible"
									sitekey="6LepEiwjAAAAAN9QFU8RpeY0QXCFoRRVVis2B-iF"
								/>
							</Form>
							{formStatus.status && (
								<div
									style={{
										border: "1px solid",
										padding: "1rem",
										borderColor:
											formStatus.status !== "loading"
												? formStatus.status === "success"
													? "lightGreen"
													: "red"
												: "transparent"
									}}
								>
									{formStatus.status === "loading" ? (
										<Loader />
									) : (
										<p className="m-0">{formStatus.message}</p>
									)}
								</div>
							)}
							<SocialMediaIcons />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
