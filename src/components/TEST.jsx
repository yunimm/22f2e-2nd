import {useEffect, useState, useRef} from "react";
import * as pdf from "pdfjs-dist";
import {fabric} from "fabric";
import pdfWorker from "pdfjs-dist/build/pdf.worker.js?url";
pdf.GlobalWorkerOptions.workerSrc = pdfWorker;
const Test = () => {
	const [fa, setFa] = useState(null);
	const mainRef = useRef(null);
	const Base64Prefix = "data:application/pdf;base64,";

	useEffect(() => {
		const c = new fabric.Canvas(mainRef.current);
		setFa(c);
	}, [mainRef]);

	// 使用原生 FileReader 轉檔
	function readBlob(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener("load", () => resolve(reader.result));
			reader.addEventListener("error", reject);
			reader.readAsDataURL(blob);
		});
	}

	async function printPDF(pdfData) {
		// 將檔案處理成 base64
		pdfData = await readBlob(pdfData);

		// 將 base64 中的前綴刪去，並進行解碼
		const data = window.atob(pdfData.substring(Base64Prefix.length));

		// 利用解碼的檔案，載入 PDF 檔及第一頁
		const pdfDoc = await pdf.getDocument({data}).promise;
		const pdfPage = await pdfDoc.getPage(1);

		// 設定尺寸及產生 canvas
		const viewport = pdfPage.getViewport({scale: window.devicePixelRatio});
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");

		// 設定 PDF 所要顯示的寬高及渲染
		canvas.height = viewport.height;
		canvas.width = viewport.width;
		const renderContext = {
			canvasContext: context,
			viewport,
		};
		const renderTask = pdfPage.render(renderContext);

		// 回傳做好的 PDF canvas
		return renderTask.promise.then(() => canvas);
	}

	async function pdfToImage(pdfData) {
		// 設定 PDF 轉為圖片時的比例
		const scale = 1 / window.devicePixelRatio;

		// 回傳圖片
		return new fabric.Image(pdfData, {
			id: "renderPDF",
			scaleX: scale,
			scaleY: scale,
		});
	}

	// 此處 canvas 套用 fabric.js
	const onChange = async (e) => {
		fa.requestRenderAll();
		const pdfData = await printPDF(e.target.files[0]);
    console.log('test-pdfdata:',pdfData)
		const pdfImage = await pdfToImage(pdfData);
    console.log('test-pdfImage:',pdfImage)
		// 透過比例設定 canvas 尺寸
		fa.setWidth(pdfImage.width / window.devicePixelRatio);
		fa.setHeight(pdfImage.height / window.devicePixelRatio);
		// 將 PDF 畫面設定為背景
		fa.setBackgroundImage(pdfImage, fa.renderAll.bind(fa));
	};

	const onPasteSign = () => {
		const sign = document.querySelector(".sign");
		if (fa) {
			fabric.Image.fromURL(sign.src, function (image) {
				// 設定簽名出現的位置及大小，後續可調整
				image.top = 400;
				image.scaleX = 0.5;
				image.scaleY = 0.5;
				fa.add(image).renderAll();
			});
		}
	};

  return (
    <>
      <p>選擇簽名</p>
      <button onClick={onPasteSign} className="btn">
        貼上簽名
      </button>
      <img
        onClick={onPasteSign}
        className="sign"
        src={localStorage.getItem('img') ? localStorage.getItem('img') : null}
        style={{ border: '1px solid #000' }}
        width="250"
        height="150"
      />
      <div className="h-full w-full">
        <input onChange={onChange} type="file" />
        <canvas ref={mainRef}></canvas>
      </div>
    </>
  );
};

export default Test;
