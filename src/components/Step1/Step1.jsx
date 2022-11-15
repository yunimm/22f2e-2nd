import { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import camera from '../../assets/camera_2x.png';
import file from '../../assets/file_2x.png';
import image from '../../assets/image_2x.png';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;
const PreviewFile = () => {
  return (
    <>
      <div className="step1-main-wrapper__content">
        <div className="relative mb-2.5 ">
          <p className="rounded-lg border py-2.5 px-3">上傳簽署檔案名稱.pdf</p>
          <button className="absolute -right-0.5 top-0 translate-y-[-1px] rounded-lg bg-red py-3 px-4 text-white ring-blue-dark hover:bg-red-dark active:ring-2 disabled:bg-gray">
            刪除檔案
          </button>
        </div>
        <canvas ref={canvasRef}></canvas>
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
const EmptyFile = ({ onUploadFile }) => {
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

const Step1 = ({ isUpload, step, setIsUpload }) => {
  if (step > 1) return null;
  // const [uploadFile, seUploadFile] = useState(null);
  const [pdfPage, setPdfPage] = useState(1);
  const [size, setSize] = useState(1);
  const [u8file, setU8file] = useState(null);
  const [fileName, setFileName] = useState('上傳簽署檔案名稱.pdf');

  let currPage = 1;
  // let numPages = 0;
  let thePdf = null;
  let scale = 1;

  const onUploadFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.addEventListener('load', () => {
      // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
      const typedarray = new Uint8Array(fileReader.result);
      setU8file(typedarray);
      handlePdf(typedarray);
      setIsUpload(true);
    });
  };
  const handlePdf = (typedarray) => {
    pdf.getDocument(typedarray).promise.then((pdfDocument) => {
      // 總頁數
      setPdfPage(pdfDocument.numPages);
      thePdf = pdfDocument;
      const viewer = document.getElementById('pdf-viewer');
      for (let page = 1; page <= thePdf.numPages; page++) {
        const canvas = document.createElement('canvas');
        canvas.className = 'pdf-page-canvas';
        viewer.appendChild(canvas);
        handlePages(page, canvas, size);
      }
    });
  };
  const handlePages = (pageNumber, canvas, size) => {
    thePdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: size });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      });
    });
  };

  const deleteFile = () => {
    const viewer = document.getElementById('pdf-viewer');
    viewer.remove();
    setIsUpload(false);
  };

  //TODO:用CSS做掉放大縮小
  const minusSize = () => {
    setSize(0.5);
    console.log('minusSize');
  };
  return (
    <>
      <main className="step1-main-wrapper">
        {!isUpload && <EmptyFile onUploadFile={onUploadFile} />}
        <div className={cx({ hidden: !isUpload })}>
          <div className="step1-main-wrapper__content">
            <div className="relative mb-2.5 ">
              <p className="rounded-lg border py-2.5 px-3">{fileName}</p>
              <button
                onClick={deleteFile}
                type="button"
                className="absolute -right-0.5 top-0 translate-y-[-1px] rounded-lg bg-red py-3 px-4 text-white ring-blue-dark hover:bg-red-dark active:ring-2 disabled:bg-gray"
              >
                刪除檔案
              </button>
            </div>

            <div className="relative h-[538px] rounded-[10px] border bg-[#E7E9EA] p-2.5">
              <span className="absolute right-2.5 rounded-md bg-black py-1.5 px-3 font-medium text-white">
                共{pdfPage}頁
              </span>
              {/* <canvas  ref={canvasRef}></canvas> */}
              <div id="pdf-viewer"></div>
              <div className="absolute bottom-2.5 right-2.5 flex gap-1">
                <button className="icon-btn">
                  <MinusIcon
                    onClick={minusSize}
                    className="h-6 w-6 text-white"
                  />
                </button>
                <button className="icon-btn">
                  <PlusIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {isUpload && <PreviewFile />} */}
      </main>
    </>
  );
};

export default Step1;
