import React, {useRef, useLayoutEffect, useEffect, useState} from "react";

const SettingSignModal = () => {
	const [locations, setLocations] = React.useState([]);
	const [isPainting, setPainting] = useState(false);
	const [lineWidth, setLineWidth] = useState(4);
	const [lineColor, setLineColor] = useState("#000000");

	const canvasRef = React.useRef(null);

	const clearRef = React.useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
	});

	useEffect(() => {
		canvasRef.current.addEventListener("mousedown", startPosition);
		canvasRef.current.addEventListener("mouseup", finishedPosition);
		canvasRef.current.addEventListener("mouseleave", finishedPosition);
		canvasRef.current.addEventListener("mousemove", draw);
		clearRef.current.addEventListener("click", reset);

		return () => {
			canvasRef.current.addEventListener("mousedown", startPosition);
			canvasRef.current.addEventListener("mouseup", finishedPosition);
			canvasRef.current.addEventListener("mouseleave", finishedPosition);
			canvasRef.current.removeEventListener("mousemove", draw);
			clearRef.current.removeEventListener("click", reset);
		};
	}, [isPainting]);

	// 取得滑鼠 / 手指在畫布上的位置
	const getPaintPosition = (e) => {
		const canvasSize = canvas.getBoundingClientRect();

		if (e.type === "mousemove") {
			return {
				x: e.clientX - canvasSize.left,
				y: e.clientY - canvasSize.top,
			};
		} else {
			return {
				x: e.touches[0].clientX - canvasSize.left,
				y: e.touches[0].clientY - canvasSize.top,
			};
		}
	};

	// // 開始繪圖時，將狀態開啟
	const startPosition = (e) => {
		e.preventDefault();
		setPainting(true);
	};

	// // 結束繪圖時，將狀態關閉，並產生新路徑
	const finishedPosition = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		setPainting(false);
		ctx.beginPath();
	};

	function draw(e) {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		// 滑鼠移動過程中，若非繪圖狀態，則跳出
		if (!isPainting) return;

		// 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
		const paintPosition = getPaintPosition(e);

		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.lineCap = "round";
		// 移動滑鼠位置並產生圖案
		ctx.lineTo(paintPosition.x, paintPosition.y);
		ctx.stroke();
	}

	const reset = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	return (
		<div className="h-full w-full bg-gray py-10 px-[18px]">
			<div className="h-[549px] w-full rounded-[10px] bg-white drop-shadow-md">
				<form className="flex flex-col gap-4 p-5">
					<label>
						<h5 className="ml-3">信箱</h5>
						<input
							type="text"
							className="h-9 w-full rounded-md border py-2.5 px-3"
							placeholder="請輸入欲使用的個人信箱"
						/>
					</label>
					<label>
						<h5 className="ml-3">信箱</h5>
						<input
							type="text"
							className="h-9 w-full rounded-md border py-2.5 px-3"
							placeholder="請輸入欲使用的個人信箱"
						/>
					</label>
					<label>
						<h5 className="ml-3">信箱</h5>
						<input
							type="text"
							className="h-9 w-full rounded-md border py-2.5 px-3"
							placeholder="請輸入欲使用的個人地址"
						/>
					</label>
					<div>
						<ul className="flex gap-3 pl-3 text-lg">
							<li>
								<a className="text-blue">簽名1</a>
							</li>
							<span className="text-md text-gray">|</span>
							<li>
								<a>簽名2</a>
							</li>
						</ul>
						<div className="rounded-md border">
							<div className="draw h-[138px] rounded-t-md border-b border-blue-dark bg-[#EBF3FC]"></div>
							<div className="flex gap-2.5 border-b border-gray py-2.5 px-[14px]">
								<span>顏色</span>
								<span onClick={() => setLineColor("#000000")} className="btn-color bg-black" />
								<span onClick={() => setLineColor("#0272A1")} className="btn-color bg-[#0272A1]" />
								<span onClick={() => setLineColor("#DA2F2F")} className="btn-color bg-[#DA2F2F]" />
								<span>大小</span>
								<div className="flex items-center gap-2.5">
									<span onClick={() => setLineWidth(2)} className="btn-size h-3 w-3" />
									<span onClick={() => setLineWidth(4)} className="btn-size h-[18px] w-[18px]" />
									<span onClick={() => setLineWidth(6)} className="btn-size h-6 w-6" />
								</div>
							</div>
							<div className="flex justify-end gap-2.5 p-2.5">
								<button ref={clearRef} type="button" className="btn-white border">
									清除
								</button>
								<button type="button" className="btn-black">
									完成
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<canvas ref={canvasRef} id="canvas" width="500" height="300" style={{border: "1px solid #333333"}} />
		</div>
	);
};
export default SettingSignModal;
