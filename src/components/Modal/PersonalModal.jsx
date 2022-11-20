import { useState } from 'react';
import cx from 'classnames';
import { fabric } from 'fabric';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import signIcon from '../../assets/createSign-black_2x.png';
const PersonalModal = ({
  show,
  setMode,
  fa,
  userMail,
  userTel,
  userAdr,
  setSigned,
  onPasteSign,
}) => {
  if (!show) return null;

  const pasteMail = (e) => {
    const text = new fabric.IText(userMail, {
      left: 200,
      top: 100,
    });
    fa.add(text).renderAll();
    setSigned(true);
  };
  const pasteTel = (e) => {
    const text = new fabric.IText(userTel, {
      left: 300,
      top: 200,
    });
    fa.add(text).renderAll();
    setSigned(true);
  };
  const pasteAdr = (e) => {
    const text = new fabric.IText(userAdr, {
      left: 400,
      top: 300,
    });
    fa.add(text).renderAll();
    setSigned(true);
  };
  const pasteSign = () => {
    onPasteSign('imgPersonal');
  };
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
          <div className="flex flex-col gap-2.5 ">
            <button
              name="mail"
              onClick={pasteMail}
              type="button"
              className={cx('btn-group', { disabled: userMail === null })}
            >
              <EnvelopeIcon className="h-5 w-5" />
              <span>信箱</span>
            </button>
            <button
              name="tel"
              onClick={pasteTel}
              type="button"
              className={cx('btn-group', { disabled: userTel === null })}
            >
              <PhoneIcon className="h-5 w-5" />
              <span>電話</span>
            </button>
            <button
              name="adr"
              onClick={pasteAdr}
              type="button"
              className={cx('btn-group', { disabled: userAdr === null })}
            >
              <MapPinIcon className="h-5 w-5" />
              <span>地址</span>
            </button>
            <button
              onClick={pasteSign}
              type="button"
              className={cx('btn-group', {
                disabled: localStorage.imgPersonal === undefined,
              })}
            >
              <img src={signIcon} alt="icon on screen" className="ml-0.5 w-4" />
              <span>簽名</span>
            </button>
            {/* <button className="btn-group">
              <img src={signIcon} alt="icon on screen" className="w-4 ml-0.5" />
              <span>簽名2</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalModal;
