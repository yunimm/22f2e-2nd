import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
const DownloadBtn = ({ onDownloadFile }) => {
  return (
    <button
      onClick={onDownloadFile}
      type="button"
      className="icon-btn absolute bottom-16 right-5 h-8 w-8 text-white"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
    >
      <ArrowDownTrayIcon className="w-6" />
    </button>
  );
};

export default DownloadBtn;
