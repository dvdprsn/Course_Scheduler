import React from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import Button from "react-bootstrap/Button";
import "./Share.css";

export default function Share({ imageRef }) {
	const [image, takeScreenShot] = useScreenshot({
		type: "image/jpeg",
		quality: 3.0,
	});
	// To fix linting unused error
	// image;
	console.log(image);
	const download = (image, { name = "calendar", extension = "jpg" } = {}) => {
		const a = document.createElement("a");
		a.href = image;
		a.download = createFileName(extension, name);
		a.click();
	};

	const downloadScreenshot = () =>
		takeScreenShot(imageRef.current).then(download);

	return (
		<Button
			id="shareBtn"
			variant="outline-primary"
			onClick={downloadScreenshot}
		>
			Share
		</Button>
	);
}
