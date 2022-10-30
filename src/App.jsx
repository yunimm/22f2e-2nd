import React, { useState } from 'react';
import '../src/css/App.scss';
import logo from '../src/assets/logo_2x.png';
import logoDark from '../src/assets/logo_dark_2x.png';
import signIcon from '../src/assets/createSign_2x.png';
import userImage from '../src/assets/userImage_2x.png';
import moon from '../src/assets/moon_2x.png';
import camera from '../src/assets/camera_2x.png';
import file from '../src/assets/file_2x.png';
import image from '../src/assets/image_2x.png';
import sign from '../src/assets/sign_2x.png';
import signWhite from '../src/assets/sign-white_2x.png';
import text from '../src/assets/text_2x.png';
import textWhite from '../src/assets/text-white_2x.png';
import star from '../src/assets/star_2x.png';
import starWhite from '../src/assets/star-white_2x.png';
import cx from 'classnames';
import SignModal from '../src/components/Modal/SignModal';
import TextModal from '../src/components/Modal/TextModal';
import PersonalModal from '../src/components/Modal/PersonalModal';
import {
  ArrowUturnLeftIcon,
  Squares2X2Icon,
  MoonIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import {
  TrashIcon,
  PlusCircleIcon,
  EllipsisHorizontalIcon,
  Bars3Icon,
  MinusIcon,
  PlusIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('2');
  const [uploadFile, setUploadFile] = useState(null);
  const [mode, setMode] = useState(null);
  const [showFileList, setFileList] = useState(false);
  // const [prev, setPrev] = useState(0);
  // const [redo, setRedo] = useState(null);
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
                  <img
                    src={signIcon}
                    alt="signIcon on screen"
                    className="mb-1 w-7"
                  />
                  <span className="text-white">建立簽名</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5">
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
              </div>
            </div>
          </div>
          <div className="flex h-screen w-full flex-col">
            <div className="flex h-[72px] items-center justify-between bg-white px-3 drop-shadow-md">
              <div className={cx(!showHamburger && 'hidden')} />
              <div
                className={cx(
                  'flex items-center gap-2',
                  showHamburger && 'hidden',
                )}
              >
                <Bars3Icon
                  onClick={() => setShowHamburger(true)}
                  className="h-9 w-9 cursor-pointer text-[#C0D2DD]"
                />
                <img
                  src={logoDark}
                  alt="logo-dark on screen"
                  className="h-9 w-[43.01px]"
                />
              </div>
              <span className="text-gray-dark">united</span>
              <div className="flex h-full items-center justify-end gap-2.5">
                {step > '1' && <button className="btn-white">返回</button>}
                <button className="btn-black">
                  <span className="font-medium">下一步</span>
                </button>
              </div>
            </div>
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

            {step === '1' && (
              <>
                <main className="step1-main-wrapper">
                  {uploadFile === null && (
                    <>
                      <div className="step1-main-wrapper__content">
                        {/* TODO:封裝元件 */}
                        <h4 className="text-center text-gray-dark">
                          上傳簽署檔案
                        </h4>
                        <div className="mt-3 flex h-[559px] w-full flex-col gap-5">
                          <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
                            <div className="flex flex-col items-center justify-center gap-4">
                              <img
                                src={camera}
                                alt="camera icon on screen"
                                className="h-10"
                              />
                              <button className="btn-black w-[136px]">
                                開啟相機
                              </button>
                            </div>
                          </div>
                          <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
                            <div className="flex flex-col items-center justify-center gap-4">
                              <img
                                src={image}
                                alt="image on screen"
                                className="h-10"
                              />
                              <label className="btn-black flex w-[136px] items-center justify-center">
                                <input type="file" className="hidden" />
                                <span>選擇照片</span>
                              </label>
                            </div>
                          </div>
                          <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
                            <div className="flex flex-col items-center justify-center gap-4">
                              <img
                                src={file}
                                alt="file icon on screen"
                                className="h-10"
                              />

                              <label className="btn-black flex w-[136px] items-center justify-center">
                                <input type="file" className="hidden" />
                                <span>選擇檔案</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* TODO:封裝元件 */}
                  {uploadFile && (
                    <div className="step1-main-wrapper__content">
                      <div className="relative mb-2.5 ">
                        <p className="rounded-lg border py-2.5 px-3">
                          上傳簽署檔案名稱.pdf
                        </p>
                        {/* TODO:封裝樣式 */}
                        <button className="absolute -right-0.5 top-0 translate-y-[-1px] rounded-lg bg-red py-3 px-4 text-white ring-blue-dark hover:bg-red-dark active:ring-2 disabled:bg-gray">
                          刪除檔案
                        </button>
                      </div>

                      <div className="relative h-[538px] rounded-[10px] border bg-[#E7E9EA] p-2.5">
                        <span className="absolute right-2.5 rounded-md bg-black py-1.5 px-3 font-medium text-white">
                          共三頁
                        </span>
                        <div className="absolute bottom-2.5 right-2.5 flex gap-1">
                          {/* TODO:封裝樣式 */}
                          <button className="icon-btn">
                            <MinusIcon className="h-6 w-6 text-white" />
                          </button>
                          <button className="icon-btn">
                            <PlusIcon className="h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </main>
              </>
            )}
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
