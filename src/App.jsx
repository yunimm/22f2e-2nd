import React, { useState } from 'react';
import cx from 'classnames';
import sign from '../src/assets/sign_2x.png';
import signWhite from '../src/assets/sign-white_2x.png';
import text from '../src/assets/text_2x.png';
import textWhite from '../src/assets/text-white_2x.png';
import star from '../src/assets/star_2x.png';
import starWhite from '../src/assets/star-white_2x.png';
import SignModal from '../src/components/Modal/SignModal';
import TextModal from '../src/components/Modal/TextModal';
import PersonalModal from '../src/components/Modal/PersonalModal';
import { Squares2X2Icon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

import SideBar from '../src/components/SideBar/SideBar';
import Header from './components/Header/Header';
import Step1 from '../src/components/Step1/Step1';
// import '../src/css/App.scss';

function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('1');
  const [uploadFile, setUploadFile] = useState(null);
  const [mode, setMode] = useState(null);
  const [showFileList, setFileList] = useState(false);

  return (
    <div className="App">
      <div className="bg-gray-200 h-screen">
        <div className="relative flex">
          <div
            className={cx(
              'absolute z-10 flex h-screen',
              !showHamburger && 'hidden',
            )}
          >
            <SideBar
              focus={focus}
              setFocus={setFocus}
              setShowHamburger={setShowHamburger}
            />
          </div>
          <div className="flex h-screen w-full flex-col">
            <Header
              setStep={setStep}
              step={step}
              setShowHamburger={setShowHamburger}
              showHamburger={showHamburger}
            />
            {/* 進度條 */}
            <ul className="flex justify-between">
              <li className="w-1/3 border-b-[6px] border-gray-dark bg-[#DEE1E3] py-2.5 text-center">
                <span className="step1circle" />
                <span>上傳簽屬檔案</span>
              </li>
              <li className="step2bg" data-active={step >= '2'}>
                <span className="step2circle" data-active={step >= '2'} />
                <span>進行簽署</span>
              </li>
              <li className="step3bg" data-active={step === '3'}>
                <span className="step3circle" data-active={step === '3'} />
                <span>簽署完成</span>
              </li>
            </ul>
            <Step1 step={step} uploadFile={uploadFile} />
            {step > '1' && (
              <>
                <div className="relative h-full bg-gray py-2.5 px-5">
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
                  {step === '3' && (
                    <button
                      type="button"
                      className="icon-btn absolute bottom-2.5 right-5 h-8 w-8 text-white"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <ArrowDownTrayIcon className="w-6" />
                    </button>
                  )}
                </div>
                <footer className="flex h-[58px] w-full items-center justify-between bg-white py-[9px]">
                  {/* TODO:封裝樣式 */}

                  {/* default type */}
                  {mode !== 'sign' && (
                    <button
                      onClick={() => setMode('sign')}
                      className="footer-icon-btn"
                    >
                      <img src={sign} alt="icon on screen" className="w-5" />
                      <span>簽名</span>
                    </button>
                  )}
                  {/* mode = sign */}
                  {mode === 'sign' && (
                    <button className="footer-icon-btn--active">
                      <img
                        src={signWhite}
                        alt="icon on screen"
                        className="w-5"
                      />
                      <span className="text-white">簽名</span>
                    </button>
                  )}
                  {/* default type */}
                  {mode !== 'text' && (
                    <button
                      onClick={() => setMode('text')}
                      className="footer-icon-btn"
                    >
                      <img src={text} alt="icon on screen" className="w-5" />
                      <span>文字</span>
                    </button>
                  )}
                  {/* mode = text */}
                  {mode === 'text' && (
                    <button className="footer-icon-btn--active">
                      <img
                        src={textWhite}
                        alt="icon on screen"
                        className="w-5"
                      />
                      <span className="text-white">文字</span>
                    </button>
                  )}
                  {/* default type */}
                  {mode !== 'personal' && (
                    <button
                      className="footer-icon-btn"
                      onClick={() => setMode('personal')}
                    >
                      <img src={star} alt="icon on screen" className="w-5" />
                      <span>個人化</span>
                    </button>
                  )}
                  {/* mode = style */}

                  {mode === 'personal' && (
                    <button className="footer-icon-btn--active">
                      <img
                        src={starWhite}
                        alt="icon on screen"
                        className="w-5"
                      />
                      <span className="text-white">個人化</span>
                    </button>
                  )}
                  {/* FIXME:和UI確認規格 */}
                  {/* <button className="footer-icon-btn" disabled={prev === 0}>
                    <ArrowUturnLeftIcon
                      className="footer-icon-btn__svgIcon"
                      disabled={prev === 0}
                    />
                    <span>復原</span>
                  </button>
                  <button className="footer-icon-btn bg-red-dark">
                    <img src={next} alt="icon on screen" className="w-5" />
                    <span>重作</span>
                  </button> */}

                  {/* TODO: 綁定狀態，當使用者正在貼簽名時才會變成enabled */}
                  <button className="footer-icon-btn" disabled>
                    <TrashIcon className="w-5" />
                    <span>重新簽署</span>
                  </button>
                </footer>
                <SignModal setMode={setMode} show={mode === 'sign'} />
                <TextModal setMode={setMode} show={mode === 'text'} />
                <PersonalModal setMode={setMode} show={mode === 'personal'} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
