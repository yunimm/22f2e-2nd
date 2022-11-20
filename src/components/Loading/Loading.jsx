import { useEffect } from 'react';
import ani from '../../json/logo.json';
import lottie from 'lottie-web';
const Loading = () => {
  useEffect(() => {
    const logoAni = lottie.loadAnimation({
      container: document.querySelector('.ani'),
      animationData: ani,
      renderer: 'svg',
      loop: 3,
      autoplay: true,
    });
    return () => logoAni.destroy();
  }, []);
  return (
    <div className="loading-wrapper">
      <div className="ani"></div>
      <span className="text-white">文件上傳中請稍後...</span>
    </div>
  );
};

export default Loading;
