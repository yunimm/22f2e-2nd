import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Squares2X2Icon } from '@heroicons/react/24/solid';
const FileList = ({ showFileList, setFileList }) => {
  return (
    <>
      {!showFileList && (
        <button
          onClick={() => setFileList(true)}
          className="icon-btn w-8 text-white"
        >
          <Squares2X2Icon />
        </button>
      )}
      {showFileList && (
        <>
          <div className="absolute left-0 top-0 h-full w-[184px] border-r border-blue bg-blue bg-opacity-[0.15]">
            <ul className="px-5 py-14">
              <li className="flex flex-col items-center">
                <div className="h-[132.36px] w-[144px] rounded-[10px] border-2 border-blue bg-blue bg-opacity-[0.15]" />
                <span>1/2</span>
              </li>
              <li className="flex flex-col items-center">
                <div className="h-[132.36px] w-[144px] rounded-[10px] border-2 border-blue bg-blue bg-opacity-[0.15]" />
                <span>2/2</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setFileList(false)}
            className="icon-btn absolute w-8 text-white"
          >
            <ArrowLeftIcon />
          </button>
        </>
      )}
    </>
  );
};

export default FileList;
