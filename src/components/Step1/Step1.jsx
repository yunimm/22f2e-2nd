import React, { useRef, useState, useEffect } from 'react';
import cx from 'classnames';
import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

const Step1 = ({ isUpload, setIsUpload, focus, uploadPdf, fileName }) => {
  // if (focus !== '1') return null;
  const canvasRef = useRef(null);
  const minusRef = useRef(null);
  const plusRef = useRef(null);
  const [pdfPage, setPdfPage] = useState(1);
  const [scale, setScale] = useState(1);

  let thePdf = null;

  useEffect(() => {
    if (!isUpload) return;
    onRenderPdf();
  }, [isUpload]);

  const onRenderPdf = () => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(uploadPdf);
    fileReader.addEventListener('load', () => {
      // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF
      const typedarray = new Uint8Array(fileReader.result);
      // handlePdf(typedarray);
      pdf.getDocument(typedarray).promise.then(async (pdfDocument) => {
        // 總頁數
        setPdfPage(pdfDocument.numPages);

        thePdf = pdfDocument;

        // PDFDocumentProxy
        const viewer = canvasRef.current;

        for (let page = 1; page <= thePdf.numPages; page++) {
          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page-canvas';
          viewer.appendChild(canvas);
          handlePages(page, canvas, scale);
        }
      });
    });
  };

  const handlePages = (pageNumber, canvas, scale) => {
    thePdf.getPage(pageNumber).then((page) => {
      const viewport = page.getViewport({ scale: scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const result = page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      });
      return result;
    });
  };

  const deleteFile = () => {
    const viewer = document.getElementById('pdf-viewer');
    while (viewer.firstChild) {
      viewer.removeChild(viewer.lastChild);
    }
    setIsUpload(false);
  };

  //用CSS模擬放大縮小
  // 預設大小為1
  // 每個step為25%
  // 1 = 100, 1.25 = 125%  0.75 = 75%, 0.5 = 50%
  const updateScale = (e) => {
    const canvas = document.querySelector('canvas');
    let target = e.target.getAttribute('data-name');
    let cs = canvas.className;
    // scale = 1
    let min = 0.25;
    let max = 1.5;
    let step = 0.25;

    if (target === 'minus') {
      if (scale < min) return;
      setScale(scale - step);

      if (scale === 1.5) {
        canvasRef.current.className = ' scale-125';
        return;
      } else if (scale === 1.25) {
        canvasRef.current.className = ' scale-100';
        return;
      } else if (scale === 1) {
        canvasRef.current.className = ' scale-75';
        return;
      } else if (scale === 0.75) {
        canvasRef.current.className = ' scale-50';
        return;
      }
    } else if (target === 'plus') {
      setScale(scale + step);
      if (scale === 1.25) {
        canvasRef.current.className = ' scale-150';
        return;
      } else if (scale === 1) {
        canvasRef.current.className = ' scale-125';
        return;
      } else if (scale === 0.75) {
        canvasRef.current.className = ' scale-100';
        return;
      } else if (scale === 0.5) {
        canvasRef.current.className = ' scale-75';
        return;
      } else if (scale === 0.25) {
        canvasRef.current.className = ' scale-50';
        return;
      }
    }
  };

  return (
    <>
      <main className={cx('step1-main-wrapper', { hidden: focus === '2' })}>
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
              <span className="absolute right-2.5 z-50 rounded-md bg-black py-1.5 px-3 font-medium text-white">
                共{pdfPage}頁
              </span>

              <div className="pdf-wrapper">
                <div
                  className="pdf-viewer"
                  id="pdf-viewer"
                  ref={canvasRef}
                ></div>
              </div>

              <div className="absolute bottom-2.5 right-2.5 flex gap-1">
                <button className="icon-btn">
                  <MinusIcon
                    onClick={updateScale}
                    data-name="minus"
                    ref={minusRef}
                    className={cx('h-6 w-6 text-white', {
                      disabled: scale === 0.25,
                    })}
                  />
                </button>
                <button className="icon-btn">
                  <PlusIcon
                    onClick={updateScale}
                    ref={plusRef}
                    data-name="plus"
                    className={cx('h-6 w-6 text-white', {
                      disabled: scale === 1.5,
                    })}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Step1;
