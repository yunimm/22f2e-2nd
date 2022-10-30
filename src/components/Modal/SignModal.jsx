import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
const SignModal = ({ show, setMode }) => {
  if (!show) return null;
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
        <div className="draw h-[162px] border-y border-blue-dark bg-[#EBF3FC]"></div>
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
          <button className="btn-white border">清除</button>
          <button className="btn-black">完成</button>
        </div>
      </div>
    </div>
  );
};
export default SignModal;
