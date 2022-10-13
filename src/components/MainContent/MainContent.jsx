import React from "react";

const MainContent = () => {
	const viewer = () => {
		var url = "/cdn.mozilla.net/pdfjs/helloworld.pdf";
		PDFJS.workerSrc = "//mozilla.github.io/pdf.js/build/pdf.worker.js";
		var loadingTask = PDFJS.getDocument(url);
		loadingTask.promise.then(
			function (pdf) {
				console.log("PDF loaded");
				var pageNumber = 1;
				pdf.getPage(pageNumber).then(function (page) {
					console.log("Page loaded");
					var scale = 1.5;
					var viewport = page.getViewport(scale);
					var canvas = document.getElementById("example");
					var context = canvas.getContext("2d");
					canvas.height = viewport.height;
					canvas.width = viewport.width;
					var renderContext = {
						canvasContext: context,
						viewport: viewport,
					};
					var renderTask = page.render(renderContext);
					renderTask.then(function () {
						console.log("Page rendered");
					});
				});
			},
			function (reason) {
				console.error(reason);
			}
		);
	};
	return (
		<>
			<viewer />
		</>
	);
};

export default MainContent;
