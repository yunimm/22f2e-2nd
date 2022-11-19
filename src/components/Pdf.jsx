import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import React, { useLayoutEffect, useRef } from 'react';

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

export const PDFRender = ({ uploadFile, src }) => {
  const canvasRef = useRef(null);
  useLayoutEffect(() => {
    if (!uploadFile) return;
    pdf
      .getDocument(src)
      .promise.then((pdfDocument) => {
        return pdfDocument.getPage(1);
      })
      .then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1.0 });
        const canvas = canvasRef.current;
        if (!canvas) {
          return Promise.reject();
        }
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
        const renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport,
        });
        return renderTask.promise;
      })
      .catch((err) => {
        alert(err);
      });
  }, [uploadFile]);
  return <canvas ref={canvasRef} />;
};
