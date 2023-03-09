import type { NextPage } from "next";
import { FormEvent, useRef } from "react";
import Button from "../components/Button/Button";
import Form from "../components/Form/Form";
import InputAndLabel from "../components/Input/InputAndLabel";
import { createTicket } from "../apis/Contact.api";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Contact: NextPage = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);

	const handleFormOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		if (!executeRecaptcha) {
			return;
		}

		let { value: nameValue } = nameRef.current!;
		let { value: emailValue } = emailRef.current!;
		let { value: messageValue } = messageRef.current!;
		const token = await executeRecaptcha("feedback");
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
							<h2>PDCM Finder Feedback</h2>
							<p>
								PDCM Finder is continuously developed in response to community's
								needs. We need your feedback to improve and refine the PDCM
								Finder.
							</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
							<Form onSubmit={handleFormOnSubmit}>
								<InputAndLabel
									name="name"
									type="text"
									label="Your name"
									inputRef={nameRef}
								/>
								<InputAndLabel
									name="email"
									type="email"
									label="Email address"
									inputClassName="mb-0"
									inputRef={emailRef}
								/>
								<p className="text-small text-muted">
									We'll never share your email with anyone else.
								</p>
								<InputAndLabel
									name="message"
									type="textarea"
									label="Your message *"
									inputRef={messageRef}
									required={true}
								/>
								<div className="text-right">
									<Button type="submit" priority="primary" color="dark">
										Submit
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
