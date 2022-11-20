import { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import * as pdf from 'pdfjs-dist';
import { fabric } from 'fabric';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { jsPDF } from 'jspdf';
const doc = new jsPDF();
pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

const ShowUploadPdf = ({ uploadPdf, step, setFa, fa, focus }) => {
  const mainRef = useRef(null);
  const Base64Prefix = 'data:application/pdf;base64,';

  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setFa(c);
  }, [mainRef]);

  // 使用原生 FileReader 轉檔
  function readBlob(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', reject);
      reader.readAsDataURL(blob);
    });
  }

  async function printPDF(pdfData) {
    // 將檔案處理成 base64
    pdfData = await readBlob(pdfData);
    // 將 base64 中的前綴刪去，並進行解碼
    const data = window.atob(pdfData.substring(Base64Prefix.length));

    // 利用解碼的檔案，載入 PDF 檔及第一頁
    const pdfDoc = await pdf.getDocument({ data }).promise;

    const pdfPage = await pdfDoc.getPage(1);

    // 設定尺寸及產生 canvas
    const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

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
      id: 'renderPDF',
      scaleX: scale,
      scaleY: scale,
    });
  }

  // // 此處 canvas 套用 fabric.js
  useEffect(() => {
    if (step !== '2') return;
    onPDFtoBackground();
  }, [step]);

  const onPDFtoBackground = async () => {
    fa.requestRenderAll();

    //<canvas class="canvas-img"></canvas>
    const pdfData = await printPDF(uploadPdf);
    const pdfImage = await pdfToImage(pdfData);

    // 透過比例設定 canvas 尺寸
    fa.setWidth(pdfImage.width / window.devicePixelRatio);
    fa.setHeight(pdfImage.height / window.devicePixelRatio);

    // 將 PDF 畫面設定為背景
    fa.setBackgroundImage(pdfImage, fa.renderAll.bind(fa));
  };

  return (
    <div
      className={cx('max-h-[600px] w-full bg-gray', { hidden: focus === '2' })}
      style={{ paddingLeft: 'calc(50% - 250px)' }}
    >
      <canvas
        style={{ left: '50%' }}
        className="divcanvas left-1/2 max-h-[90%] max-w-[90%]"
        ref={mainRef}
      ></canvas>
    </div>
  );
};

export default ShowUploadPdf;
