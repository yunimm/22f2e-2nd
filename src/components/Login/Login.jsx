import image from '../../assets/homepage.png';
import title from '../../assets/homeTitle.png';
const Login = ({ setStep, setFocus }) => {
  const start = () => {
    setStep('1');
    setFocus('1');
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className="login"
      >
        <div className="main">
          <h1>
            <img src={title} alt="title on screen" />
          </h1>
          <div className="flex flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-gray-dark">最便利的線上簽屬文件</h2>
            <p>三步驟輕鬆完成文件簽屬，立即上傳檔案! 體驗免費的簽署軟體。</p>
          </div>
          <button
            onClick={start}
            type="button"
            style={{ padding: '24px 40px' }}
            className="btn-black"
          >
            開始免費簽署
          </button>
          <span className="text-xs">
            Copyright ©2022 炙燒三重奏.All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
