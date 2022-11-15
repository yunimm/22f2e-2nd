import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import cx from "classnames";
import SignModal from "../src/components/Modal/SignModal";
import TextModal from "../src/components/Modal/TextModal";
import PersonalModal from "../src/components/Modal/PersonalModal";
import SideBar from "../src/components/SideBar/SideBar";
import Header from "./components/Header/Header";
import Step1 from "../src/components/Step1/Step1";
import Footer from "./components/Footer/Footer";
import FileList from "./components/FileList/FileList";
import DownloadBtn from "./components/DownloadBtn/DownloadBtn";
import Stepper from "./components/Stepper/Stepper";
import SettingSignModal from "./components/Modal/SettingSignModal";

import {PDFRender} from "./components/Pdf";
import samplePDF from "./test.pdf";

import * as pdf from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.js?url";

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
	const [focus, setFocus] = useState("1");
	const [showHamburger, setShowHamburger] = useState(false);
	const [step, setStep] = useState("1");
	const [uploadFile, setUploadFile] = useState(null);
	const [mode, setMode] = useState(null);
	const [showFileList, setFileList] = useState(false);
	const canvasRef = useRef(null);

	const onUploadFile = (e) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(file);
		fileReader.addEventListener("load", () => {
			// 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
			const typedarray = new Uint8Array(fileReader.result);
			pdf
				.getDocument(typedarray)
				.promise.then((pdfDocument) => {
					return pdfDocument.getPage(1);
				})
				.then((pdfPage) => {
					// // 設定 PDF 內容的顯示比例
					const viewport = pdfPage.getViewport({scale: 1.0});
					const canvas = canvasRef.current;
					if (!canvas) {
						return Promise.reject();
					}
					canvas.width = viewport.width;
					canvas.height = viewport.height;
					const ctx = canvas.getContext("2d");
					// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

					pdfPage.render({
						canvasContext: ctx,
						viewport,
					});
				});
		});
	};

	useEffect(() => {
		setShowHamburger(false);
	}, [focus]);

	return (
		<div className="App">
			<canvas ref={canvasRef}></canvas>
			<div className="bg-gray-200 h-screen">
				<div className="relative flex">
					<div className={cx("absolute z-10 flex h-screen", !showHamburger && "hidden")}>
						<SideBar focus={focus} setFocus={setFocus} setShowHamburger={setShowHamburger} />
					</div>
					<div className="flex h-screen w-full flex-col">
						<Header
							uploadFile={uploadFile}
							setStep={setStep}
							step={step}
							setShowHamburger={setShowHamburger}
							showHamburger={showHamburger}
						/>
						<Stepper step={step} />
						{focus === "1" && (
							<>
								{step === "1" ? (
									<Step1 onUploadFile={onUploadFile} step={step} uploadFile={uploadFile} />
								) : (
									<>
										<div className="relative h-full bg-gray py-2.5 px-5">
											<FileList showFileList={showFileList} setFileList={setFileList} />
											{step === "3" && <DownloadBtn />}
										</div>
										<Footer mode={mode} setMode={setMode} />
										<SignModal setMode={setMode} show={mode === "sign"} />
										<TextModal setMode={setMode} show={mode === "text"} />
										<PersonalModal setMode={setMode} show={mode === "personal"} />
									</>
								)}
							</>
						)}
						{/* focus === '2' */}
						{focus === "2" && <SettingSignModal />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
