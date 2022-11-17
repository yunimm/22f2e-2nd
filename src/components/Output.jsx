import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { bgFileAtom, signAtom } from '../data';
// import { Wrapper, Main } from './style';
import { fabric } from 'fabric';

const canvasOriginalHeight = 800;
const canvasOriginalWidth = 800;

const Output = () => {
  const [signData] = useAtom(signAtom);
  const [bgFileData] = useAtom(bgFileAtom);

  const mainRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  /** 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setCanvas(c);
  }, [mainRef]);

  /** 填上簽名 */
  useEffect(() => {
    if (canvas && signData) {
      fabric.Image.fromURL(signData, (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        canvas.add(img).renderAll();
      });
    }
  }, [canvas, signData]);

  /** 填上背景檔案 */
  useEffect(() => {
    if (canvas && bgFileData) {
      fabric.Image.fromURL(bgFileData, (img) => {
        canvas.setBackgroundImage(bgFileData).renderAll();
        canvas.setHeight(img.height);
        canvas.setWidth(img.width);
        scaleAndPositionImage(img);
      });
    }
  }, [canvas, bgFileData]);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });

  /** 縮放 */
  const scaleAndPositionImage = (bgImage) => {
    const { canvasWidth, canvasHeight } = setCanvasZoom();

    const canvasAspect = canvasWidth / canvasHeight;
    const imgAspect = bgImage.width / bgImage.height;
    let left, top, scaleFactor;

    if (canvasAspect >= imgAspect) {
      scaleFactor = canvasWidth / bgImage.width;
      left = 0;
      top = -(bgImage.height * scaleFactor - canvasHeight) / 2;
    } else {
      scaleFactor = canvasHeight / bgImage.height;
      top = 0;
      left = -(bgImage.width * scaleFactor - canvasWidth) / 2;
    }

    canvas.setBackgroundImage(bgImage, canvas.renderAll.bind(canvas), {
      top: top,
      left: left,
      originX: 'left',
      originY: 'top',
      scaleX: scaleFactor,
      scaleY: scaleFactor,
    });
  };

  const setCanvasZoom = () => {
    let canvasWidth = canvasOriginalWidth * 1;
    let canvasHeight = canvasOriginalHeight * 1;

    canvas.setWidth(canvasWidth);
    canvas.setHeight(canvasHeight);
    return { canvasWidth, canvasHeight };
  };

  /** 監聽刪除 */
  const handleUserKeyPress = (e) => {
    console.log(e, e.keyCode);
    if (e.keyCode === 8) {
      deleteSelectedObjectsFromCanvas();
    }
  };

  /** 刪除選取物件 */
  const deleteSelectedObjectsFromCanvas = () => {
    console.log('canvas', canvas);
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      const activeGroup = canvas.getActiveGroup();

      console.log('activeObject', activeObject);
      console.log('activeGroup', activeGroup);
      if (activeObject) {
        canvas.remove(activeObject);
      } else if (activeGroup) {
        const objectsInGroup = activeGroup.getObjects();
        canvas.discardActiveGroup();
        objectsInGroup.forEach(function (object) {
          canvas.remove(object);
        });
      }
    }
  };

  /** 下載 */
  const download = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = dataURL;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <div className="output-wrapper">
      <div>
        <button onClick={download}>下載</button>
      </div>

      <canvas ref={mainRef} style={{ border: `2px solid #000` }}></canvas>
    </div>
  );
};

export default Output;
