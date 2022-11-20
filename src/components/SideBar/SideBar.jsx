import React from 'react';
import cx from 'classnames';
import { MoonIcon, XMarkIcon } from '@heroicons/react/24/solid';
import {
  PlusCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import signIcon from '../../assets/createSign_2x.png';
import userImage from '../../assets/userImage_2x.png';

const SideBar = ({ setShowHamburger, setFocus, focus }) => {
  return (
    <>
      <div className="mod model-5"></div>
      <div className="md:bg-red-600 xl:bg-green-500 flex h-full w-[86px] flex-col justify-between bg-black py-5">
        <div className="flex flex-col items-center justify-center gap-[18px]">
          <XMarkIcon
            onClick={() => setShowHamburger(false)}
            className="h-9 w-9 cursor-pointer text-[#C0D2DD]"
          />
          <button
            className={cx('sidebarBtn', { focus: focus === '1' })}
            onClick={() => setFocus('1')}
          >
            <PlusCircleIcon className="h-9 w-9 cursor-pointer text-white" />
            <span className="text-white">開始簽署</span>
          </button>
          <button
            className={cx('sidebarBtn', { focus: focus === '2' })}
            onClick={() => setFocus('2')}
          >
            <img src={signIcon} alt="signIcon on screen" className="mb-1 w-7" />
            <span className="text-white">建立簽名</span>
          </button>
        </div>
        {/* <div className="flex flex-col items-center justify-center gap-2.5">
          <button className="icon-btn-white">
            <EllipsisHorizontalIcon className="h-6 w-6 rounded-md" />
          </button>
          <button className="icon-btn-white">
            <MoonIcon className="h-6 w-6 rounded-md" />
          </button>
          <img
            className="h[42px] w-[42px]"
            src={userImage}
            alt="user's image"
          />
        </div> */}
      </div>
    </>
  );
};

export default SideBar;
