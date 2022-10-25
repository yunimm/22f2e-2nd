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
import cx from 'classnames';

function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('1');
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
                <svg
                  onClick={() => setShowHamburger(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-9 w-9 cursor-pointer text-[#C0D2DD]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <button
                  className={cx('sidebarBtn', { focus: focus === '1' })}
                  onClick={() => setFocus('1')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-9 w-9 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span className="text-white">開始簽署</span>
                </button>
                <button
                  className={cx('sidebarBtn', { focus: focus === '2' })}
                  onClick={() => setFocus('2')}
                >
                  <img src={signIcon} alt="signIcon on screen" />
                  <span className="text-white">開始簽署</span>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 rounded-[10px] bg-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 rounded-[10px] bg-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
                <img
                  className="h[42px] w-[42px]"
                  src={userImage}
                  alt="user's image"
                />
              </div>
            </div>
          </div>
          <div className="flex h-screen w-full flex-col">
            <div className="flex h-[72px] w-full items-center justify-between bg-white px-3 drop-shadow-md">
              <div className={cx(!showHamburger && 'hidden')} />
              <div
                className={cx(
                  'flex items-center gap-2',
                  showHamburger && 'hidden',
                )}
              >
                <svg
                  onClick={() => setShowHamburger(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-9 w-9 cursor-pointer text-[#C0D2DD]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <img
                  src={logoDark}
                  alt="logo-dark on screen"
                  className="h-9 w-[43.01px]"
                />
              </div>
              <span className="text-gray-dark">united</span>
              <div className="flex h-full items-center justify-end gap-2.5">
                {/* <button className="rounded-[10px] bg-white py-2 px-3 text-black border">
                  返回
                </button> */}
                <button className="btn-black">
                  <span className="font-medium">下一步</span>
                </button>
              </div>
            </div>
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
            <main className="main-wrapper">
              <div className="main-wrapper__content">
                <h4 className="text-center text-gray-dark">上傳簽署檔案</h4>
                <div className="mt-3 flex h-[559px] w-full flex-col gap-5">
                  <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <img
                        src={camera}
                        alt="camera icon on screen"
                        className="h-10"
                      />
                      <button className="btn-black w-[136px]">開啟相機</button>
                    </div>
                  </div>
                  <div className="flex h-1/3 items-center justify-center rounded-[10px] border-2 border-dashed border-blue-dark bg-white">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <img src={image} alt="image on screen" className="h-10" />
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
