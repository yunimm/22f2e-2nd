import React, { useState } from 'react';
import '../src/css/App.scss';
import logo from '../src/assets/logo_2x.png';
import signIcon from '../src/assets/createSign_2x.png';
import cx from 'classnames';

function App() {
  const [focus, setFocus] = useState('1');
  return (
    <div className="App">
      <div className="h-screen bg-gray-200">
        <div className="flex w-full">
          <div className="w-[86px] h-screen bg-black">
            <div className="flex flex-col justify-center items-center pt-[18px] gap-[18px]">
              <svg
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
              {/* <h1>
                <img src={logo} alt="logo on screen" />
              </h1> */}

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
          </div>
          <div className="w-full h-[72px] bg-green-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[#C0D2DD]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <button className="rounded-[10px] bg-[#C0D2DD] py-2 px-3 text-white">
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
