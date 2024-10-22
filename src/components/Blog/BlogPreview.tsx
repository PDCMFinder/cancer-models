import Button from "../Button/Button";

type IBlogPreviewProps = { postAmount: number };

const BlogPreview = (props: IBlogPreviewProps) => {
	// Show latest {postAmount} posts
	return (
		<section>
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-4">
						<h2>This is a blog, news or event title</h2>
						<p>
							Scelerisque morbi eu arcu quis. Nibh at diam nam etiam congue. Non
							sodales orci amet, elit dolor volutpat.
						</p>
						<Button color="light" priority="primary" className="mb-5">
							Read more
						</Button>
						<hr className="col-lg-8 ml-0" />
					</div>
					<div className="col-12 col-md-4">
						<h2>This is a blog, news or event title</h2>
						<p>
							Scelerisque morbi eu arcu quis. Nibh at diam nam etiam congue. Non
							sodales orci amet, elit dolor volutpat.
						</p>
						<Button color="light" priority="primary" className="mb-5">
							Read more
						</Button>
						<hr className="col-lg-8 ml-0" />
					</div>
					<div className="col-12 col-md-4">
						<h2>This is a blog, news or event title</h2>
						<p>
							Scelerisque morbi eu arcu quis. Nibh at diam nam etiam congue. Non
							sodales orci amet, elit dolor volutpat.
						</p>
						<Button color="light" priority="primary" className="mb-5">
							Read more
						</Button>
						<hr className="col-lg-8 ml-0" />
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-center mt-5">
						<Button color="dark" priority="primary">
							View all entries
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BlogPreview;
