import React, { useState } from 'react';
import { fabric } from 'fabric';
import { XMarkIcon } from '@heroicons/react/24/solid';

const TextModal = ({ show, setMode, fa }) => {
  if (!show) return null;

  const [val, setVal] = useState(null);

  const textToFaImg = () => {
    const text = new fabric.IText(val, {
      left: 200,
      top: 200,
    });
    fa.add(text).renderAll();
    setMode(null);
  };
  return (
    <div
      className="
    position-center fixed z-50
    flex h-full w-full items-center justify-center bg-black bg-opacity-50"
    >
      <div className="h-[187px] w-[354px] rounded-[10px] bg-white drop-shadow-md">
        <div className="flex h-[55px] items-center justify-center py-4 px-5">
          <h4 className="flex-1 text-center">文字框</h4>
          <XMarkIcon
            onClick={() => setMode(null)}
            className="h-6 w-6 flex-none cursor-pointer"
          />
        </div>
        <div className="flex h-[76px] justify-center border-y border-blue-dark py-5 px-2.5">
          <input
            onChange={(e) => setVal(e.target.value)}
            className=" w-full rounded-md border border-gray-dark py-2.5 px-3"
            placeholder="請輸入文字"
          />
        </div>
        <div className="flex justify-end gap-2.5 p-2.5">
          <button className="btn-white border">清除</button>
          <button onClick={textToFaImg} type="button" className="btn-black">
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
export default TextModal;
