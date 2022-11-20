import React from 'react';
import cx from 'classnames';
import text from '../../assets/text_2x.png';
import star from '../../assets/star_2x.png';
import sign from '../../assets/sign_2x.png';
import textWhite from '../../assets/text-white_2x.png';
import starWhite from '../../assets/star-white_2x.png';
import signWhite from '../../assets/sign-white_2x.png';
import { TrashIcon } from '@heroicons/react/24/outline';

const Footer = ({ mode, setMode, signed, clear, fa, focus }) => {
  const SignBtn = () => {
    return mode === 'sign' ? (
      <button className="footer-icon-btn--active">
        <img src={signWhite} alt="icon on screen" className="w-5" />
        <span className="text-white">簽名</span>
      </button>
    ) : (
      <button onClick={() => setMode('sign')} className="footer-icon-btn">
        <img src={sign} alt="icon on screen" className="w-5" />
        <span>簽名</span>
      </button>
    );
  };
  const TextBtn = () => {
    return mode === 'text' ? (
      <button className="footer-icon-btn--active">
        <img src={textWhite} alt="icon on screen" className="w-5" />
        <span className="text-white">文字</span>
      </button>
    ) : (
      <button onClick={() => setMode('text')} className="footer-icon-btn">
        <img src={text} alt="icon on screen" className="w-5" />
        <span>文字</span>
      </button>
    );
  };
  const PersonalBtn = () => {
    return mode === 'personal' ? (
      <button className="footer-icon-btn--active">
        <img src={starWhite} alt="icon on screen" className="w-5" />
        <span className="text-white">個人化</span>
      </button>
    ) : (
      <button className="footer-icon-btn" onClick={() => setMode('personal')}>
        <img src={star} alt="icon on screen" className="w-5" />
        <span>個人化</span>
      </button>
    );
  };
  const textToFaImg = (info) => {
    const text = new fabric.IText(info, {
      left: 200,
      top: 200,
    });
    fa.add(text).renderAll();
  };
  return (
    <footer className={cx({ hidden: focus === '2' })}>
      <SignBtn />
      <TextBtn fa={fa} textToFaImg={textToFaImg} />
      <PersonalBtn textToFaImg={textToFaImg} />
      <button
        onClick={clear}
        className={cx('footer-icon-btn', { disabled: signed === false })}
      >
        <TrashIcon className="w-5" />
        <span>重新簽署</span>
      </button>
    </footer>
  );
};
export default Footer;
