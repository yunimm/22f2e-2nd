import React from 'react';
const SettingSignModal = () => {
  return (
    <div className="h-full w-full bg-gray py-10 px-[18px]">
      <div className="h-[549px] w-full rounded-[10px] bg-white drop-shadow-md">
        <form className="flex flex-col gap-4 p-5">
          <label>
            <h5 className="ml-3">信箱</h5>
            <input
              type="text"
              className="h-9 w-full rounded-md border py-2.5 px-3"
              placeholder="請輸入欲使用的個人信箱"
            />
          </label>
          <label>
            <h5 className="ml-3">信箱</h5>
            <input
              type="text"
              className="h-9 w-full rounded-md border py-2.5 px-3"
              placeholder="請輸入欲使用的個人信箱"
            />
          </label>
          <label>
            <h5 className="ml-3">信箱</h5>
            <input
              type="text"
              className="h-9 w-full rounded-md border py-2.5 px-3"
              placeholder="請輸入欲使用的個人地址"
            />
          </label>
          <div>
            <ul className="flex gap-3 pl-3 text-lg">
              <li>
                <a className="text-blue">簽名1</a>
              </li>
              <span className="text-md text-gray">|</span>
              <li>
                <a>簽名2</a>
              </li>
            </ul>
            <div className="rounded-md border">
              <div className="draw h-[138px] rounded-t-md border-b border-blue-dark bg-[#EBF3FC]" />
              <div className="flex gap-2.5 border-b border-gray py-2.5 px-[14px]">
                <span>顏色</span>
                <span className="btn-color bg-black" />
                <span className="btn-color bg-[#0272A1]" />
                <span className="btn-color bg-[#DA2F2F]" />
                <span>大小</span>
                <div className="flex items-center gap-2.5">
                  <span className="btn-size h-3 w-3" />
                  <span className="btn-size h-[18px] w-[18px]" />
                  <span className="btn-size h-6 w-6" />
                </div>
              </div>
              <div className="flex justify-end gap-2.5 p-2.5">
                <button type="button" className="btn-white border">
                  清除
                </button>
                <button type="button" className="btn-black">
                  完成
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SettingSignModal;
