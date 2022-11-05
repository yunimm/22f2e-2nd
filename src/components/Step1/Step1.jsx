import React from 'react';
import camera from '../../assets/camera_2x.png';
import file from '../../assets/file_2x.png';
import image from '../../assets/image_2x.png';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
const IsFileUpload = () => {
  return (
    <>
      <div className="step1-main-wrapper__content">
        <div className="relative mb-2.5 ">
          <p className="rounded-lg border py-2.5 px-3">上傳簽署檔案名稱.pdf</p>
          <button className="absolute -right-0.5 top-0 translate-y-[-1px] rounded-lg bg-red py-3 px-4 text-white ring-blue-dark hover:bg-red-dark active:ring-2 disabled:bg-gray">
            刪除檔案
          </button>
        </div>

        <div className="relative h-[538px] rounded-[10px] border bg-[#E7E9EA] p-2.5">
          <span className="absolute right-2.5 rounded-md bg-black py-1.5 px-3 font-medium text-white">
            共三頁
          </span>
          <div className="absolute bottom-2.5 right-2.5 flex gap-1">
            <button className="icon-btn">
              <MinusIcon className="h-6 w-6 text-white" />
            </button>
            <button className="icon-btn">
              <PlusIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const IsEmptyFile = () => {
  return (
    <>
      <div className="step1-main-wrapper__content">
        <h4 className="text-center text-gray-dark">上傳簽署檔案</h4>
        <div className="mt-3 flex h-[559px] w-full flex-col gap-5">
          <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
            <div className="flex flex-col items-center justify-center gap-4">
              <img src={camera} alt="camera icon on screen" className="h-10" />
              <button
                type="button"
                className="btn-black flex w-[136px] items-center justify-center"
              >
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
                <input type="file" className="hidden" />
                <span>選擇檔案</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Step1 = ({ uploadFile, step }) => {
  if (step > 1) return null;
  return (
    <>
      <main className="step1-main-wrapper">
        {uploadFile === null && <IsEmptyFile />}
        {uploadFile !== null && <IsFileUpload />}
      </main>
    </>
  );
};

export default Step1;
