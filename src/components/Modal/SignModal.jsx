import { useRef, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
const SignModal = ({ show, setMode, onPasteSign }) => {
  const [locations, setLocations] = useState([]);
  const [isPainting, setPainting] = useState(false);
  const [lineWidth, setLineWidth] = useState(4);
  const [lineColor, setLineColor] = useState('#000000');
  const [newImg, setNewImg] = useState(null);

  const [canvasCurrent, setCanvasCurrent] = useState(null);
  const [ctxVal, setCtxVal] = useState(null);

  const canvasRef_signModal = useRef(null);
  const clearRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef_signModal.current;
    const wrapper = document.getElementById('canvas-wrapper-setting-sign');
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    setCanvasCurrent(canvas);
    const ctx = canvas.getContext('2d');
    setCtxVal(ctx);
  }, []);

  useEffect(() => {
    if (canvasCurrent) {
      canvasCurrent.addEventListener('mousedown', startPosition);
      canvasCurrent.addEventListener('mouseup', finishedPosition);
      canvasCurrent.addEventListener('mouseleave', finishedPosition);
      canvasCurrent.addEventListener('mousemove', draw);
      // canvasCurrent.addEventListener('click', reset);
    }

    return () => {
      if (!canvasCurrent) return;
      canvasCurrent.removeEventListener('mousedown', startPosition);
      canvasCurrent.removeEventListener('mouseup', finishedPosition);
      canvasCurrent.removeEventListener('mouseleave', finishedPosition);
      canvasCurrent.removeEventListener('mousemove', draw);
      // canvasCurrent.removeEventListener('click', reset);
    };
  });

  // 取得滑鼠 / 手指在畫布上的位置
  const getPaintPosition = (e) => {
    const canvasSize = canvasCurrent.getBoundingClientRect();

    if (e.type === 'mousemove') {
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
    // e.preventDefault();
    setPainting(true);
  };

  // // 結束繪圖時，將狀態關閉，並產生新路徑
  const finishedPosition = () => {
    setPainting(false);
    ctxVal.beginPath();
  };

  function draw(e) {
    // 滑鼠移動過程中，若非繪圖狀態，則跳出
    if (!isPainting) return;

    // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
    const paintPosition = getPaintPosition(e);

    ctxVal.lineWidth = lineWidth;
    ctxVal.strokeStyle = lineColor;
    ctxVal.lineCap = 'round';
    // 移動滑鼠位置並產生圖案
    ctxVal.lineTo(paintPosition.x, paintPosition.y);
    ctxVal.stroke();
  }

  const reset = () => {
    ctxVal.clearRect(0, 0, canvasCurrent.width, canvasCurrent.height);
  };
  const showImage = document.querySelector('.sign-img');

  const saveSign = (e) => {
    // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
    const newImg = canvasCurrent.toDataURL('image/png');
    setNewImg(newImg);
    localStorage.setItem('img', newImg);
    setMode(null);
    onPasteSign();
  };

  return (
    <div
      className="
    position-center fixed z-50
    flex h-full w-full items-center justify-center bg-black bg-opacity-50"
    >
      <div className="h-[319px] w-[354px] rounded-[10px] bg-white drop-shadow-md">
        <div className="flex h-[55px] items-center justify-center py-4 px-5">
          <h4 className="flex-1 text-center">簽名板</h4>
          <XMarkIcon
            onClick={() => setMode(null)}
            className="h-6 w-6 flex-none cursor-pointer"
          />
        </div>
        <div
          id="canvas-wrapper-setting-sign"
          className="draw h-[162px] border-y border-blue-dark bg-[#EBF3FC]"
        >
          <canvas
            ref={canvasRef_signModal}
            className="responsive-canvas-modal"
          />
        </div>
        <div className="flex gap-2.5 border-b border-gray py-2.5 px-[14px]">
          <span>顏色</span>
          <span className="btn-color bg-black" />
          <span className="btn-color bg-[#0272A1]" />
          <span className="btn-color bg-[#DA2F2F]" />
          <span>大小</span>
          <div className="flex items-center gap-2.5">
            <span className="btn-size h-3 w-3" />
            <span className="btn-size h-[18px] w-[18px]" />
            <span className="btn-size h-6 w-6" />
          </div>
        </div>
        <div className="flex justify-end gap-2.5 p-2.5">
          <button onClick={reset} type="button" className="btn-white border">
            清除
          </button>
          <button onClick={saveSign} type="button" className="btn-black">
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignModal;
