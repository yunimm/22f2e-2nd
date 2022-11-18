import camera from "../../assets/camera_2x.png";
import file from "../../assets/file_2x.png";
import image from "../../assets/image_2x.png";

const EmptyFile = ({onUploadFile}) => {
	return (
		<>
			<div className="step1-main-wrapper__content">
				<h4 className="text-center text-gray-dark">上傳簽署檔案</h4>
				<div className="mt-3 flex h-[559px] w-full flex-col gap-5">
					<div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
						<div className="flex flex-col items-center justify-center gap-4">
							<img src={camera} alt="camera icon on screen" className="h-10" />
							<button type="button" className="btn-black flex w-[136px] items-center justify-center">
								開啟相機
							</button>
						</div>
					</div>
					<div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
						<div className="flex flex-col items-center justify-center gap-4">
							<img src={image} alt="image on screen" className="h-10" />
							<label className="btn-black flex w-[136px] items-center justify-center">
								<input type="file" className="hidden" />
								<span>選擇照片</span>
							</label>
						</div>
					</div>
					<div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
						<div className="flex flex-col items-center justify-center gap-4">
							<img src={file} alt="file icon on screen" className="h-10" />

							<label className="btn-black flex w-[136px] items-center justify-center">
								<input onChange={onUploadFile} type="file" accept=".pdf" className="hidden" />
								<span>選擇檔案</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmptyFile;
