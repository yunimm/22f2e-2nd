import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import signIcon from '../../assets/createSign-black_2x.png';
const PersonalModal = ({ show, setMode }) => {
  if (!show) return null;
  return (
    <div
      className="
    position-center fixed z-50
    flex h-full w-full items-center justify-center bg-black bg-opacity-50"
    >
      <div className="h-[335px] w-[206px] rounded-[10px] bg-white drop-shadow-md">
        <div className="flex h-[55px] items-center justify-center border-b border-blue-dark py-4 px-5">
          <h4 className="flex-1 text-center">個人化</h4>
          <XMarkIcon
            onClick={() => setMode(null)}
            className="h-6 w-6 flex-none cursor-pointer"
          />
        </div>
        <div className="flex h-[76px] justify-center py-5 px-2.5">
          <div className="flex flex-col gap-2.5">
            <button className="btn-group">
              <EnvelopeIcon className="h-5 w-5" />
              <span>信箱</span>
            </button>
            <button className="btn-group">
              <PhoneIcon className="h-5 w-5" />
              <span>電話</span>
            </button>
            <button className="btn-group">
              <MapPinIcon className="h-5 w-5" />
              <span>地址</span>
            </button>
            <button className="btn-group">
              <img src={signIcon} alt="icon on screen" className="w-4 ml-0.5" />
              <span>簽名1</span>
            </button>
            <button className="btn-group">
              <img src={signIcon} alt="icon on screen" className="w-4 ml-0.5" />
              <span>簽名2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalModal;
