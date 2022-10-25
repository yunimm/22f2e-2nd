import React, { useState } from 'react';
import '../src/css/App.scss';
import logo from '../src/assets/logo_2x.png';
import logoDark from '../src/assets/logo_dark_2x.png';
import signIcon from '../src/assets/createSign_2x.png';
import userImage from '../src/assets/userImage_2x.png';
import moon from '../src/assets/moon_2x.png';
import cx from 'classnames';

function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  return (
    <div className="App">
      <div className="h-screen bg-gray-200">
        <div className="flex relative">
          <div
            className={cx('h-screen flex absolute z-10', !showHamburger && 'hidden')}
          >
            <div className="w-[86px] bg-black flex flex-col justify-between h-full py-5 md:bg-red-600 xl:bg-green-500">
              <div className="flex flex-col justify-center items-center gap-[18px]">
                <svg
                  onClick={() => setShowHamburger(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-9 h-9 text-[#C0D2DD] cursor-pointer"
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
                    className="w-9 h-9 text-white"
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
              <div className="flex flex-col justify-center items-center gap-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 bg-white rounded-[10px]"
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
                  className="w-8 h-8 bg-white rounded-[10px]"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clipRule="evenodd"
                  />
                </svg>
                <img
                  className="w-[42px] h[42px]"
                  src={userImage}
                  alt="user's image"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="w-full h-[72px] bg-white px-3 flex items-center justify-between drop-shadow-md">
              <div className={cx(!showHamburger && 'hidden')} />
              <div
                className={cx(
                  'items-center gap-2 flex',
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
                  className="w-9 h-9 text-[#C0D2DD] cursor-pointer"
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
                  className="w-[43.01px] h-9"
                />
              </div>
              <span className="text-gray-dark">united</span>
              <div className="flex justify-end items-center h-full gap-2.5">
                {/* <button className="rounded-[10px] bg-white py-2 px-3 text-black border">
                  返回
                </button> */}
                <button className="btn-black">
                  <span className="font-medium">下一步</span>
                </button>
              </div>
            </div>
            <ul className="flex justify-between">
              <li className="bg-[#DEE1E3] w-1/3 text-center border-b-[6px] border-gray-dark py-2.5">
                <span>1</span>
                <span>上傳簽屬檔案</span>
              </li>
              <li className="bg-red-300 w-1/3 text-center">2</li>
              <li className="bg-red-700 w-1/3 text-center">3</li>
            </ul>
            <div>
              <h1>123456</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
