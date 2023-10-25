import type { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import InputAndLabel from "../components/Input/InputAndLabel";
import { createTicket } from "../apis/Contact.api";
import { hj_event } from "../utils/hotjar";
import Loader from "../components/Loader/Loader";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

interface IFormStatus {
	status: "success" | "error" | "loading" | "";
	message: string;
}

const Contact: NextPage = () => {
	const recaptchaRef = useRef<any>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);
	const [formStatus, setFormStatus] = useState<IFormStatus>({
		status: "",
		message: "",
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
				message: "Thank you for your message! We will be in touch soon.",
			});
		} else if (response.error) {
			// Logging the error so Hotjar can show it in analytics
			console.log("Error_code: CFER");
			setFormStatus({
				status: "error",
				message:
					"There has been an error sending the form. Try again or email info@cancermodels.org instead, thank you!",
			});
		}
	};

	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Contact</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
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
									<Button
										type="submit"
										priority="primary"
										color="dark"
										onClick={() => hj_event("click_contactSubmit")}
									>
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
												: "transparent",
									}}
								>
									{formStatus.status === "loading" ? (
										<Loader />
									) : (
										<p className="m-0">{formStatus.message}</p>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
