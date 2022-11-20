import file from '../../assets/file_2x.png';
// import camera from '../../assets/camera_2x.png';
// import image from '../../assets/image_2x.png';

const EmptyFile = ({ onUploadFile }) => {
  return (
    <>
      <div className="empty-file-wrapper">
        <h4 className="text-center text-gray-dark">上傳簽署檔案</h4>
        <div className="mt-3 flex h-[559px] w-full flex-col justify-center">
          <div className="flex h-full items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
            <div className="flex flex-col items-center justify-center gap-4">
              <img src={file} alt="file icon on screen" className="h-10" />
              <p>請選擇欲上傳的文件或拖曳檔案至此處 本系統支援PDF檔</p>
              <label className="btn-black flex w-[136px] items-center justify-center">
                <input
                  onChange={onUploadFile}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                />
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
