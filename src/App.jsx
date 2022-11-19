import { useState, useEffect } from 'react';
import cx from 'classnames';
import SignModal from '../src/components/Modal/SignModal';
import TextModal from '../src/components/Modal/TextModal';
import PersonalModal from '../src/components/Modal/PersonalModal';
import SideBar from '../src/components/SideBar/SideBar';
import Header from './components/Header/Header';
import Step1 from '../src/components/Step1/Step1';
import Footer from './components/Footer/Footer';
import FileList from './components/FileList/FileList';
import DownloadBtn from './components/DownloadBtn/DownloadBtn';
import Stepper from './components/Stepper/Stepper';
import SettingSignModal from './components/Modal/SettingSignModal';
import Test from './components/TEST';
// import Output from './components/Output';
// import Sign from './components/Sign';
// import UploadFile2 from './components/UploadFile2';

import EmptyFile from './components/EmptyFile/EmptyFile';
import ShowUploadPdf from './components/ShowUploadPdf';
import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('1');

  const [isUpload, setIsUpload] = useState(false);
  const [mode, setMode] = useState(null);
  const [showFileList, setFileList] = useState(false);

  const [cached, setCached] = useState(null);

  useEffect(() => {
    setShowHamburger(false);
  }, [focus]);

  const [fileName, setFileName] = useState('上傳簽署檔案名稱.pdf');
  const [uploadPdf, setUploadPdf] = useState(null);
  // 設定完臨時簽名檔後
  const [signed, setSigned] = useState(false);
  const [fa, setFa] = useState(null);

  const onUploadFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setUploadPdf(file);
    setIsUpload(true);
  };

  const onPasteSign = () => {
    // const sign = document.querySelector('.sign');
    const src = localStorage.getItem('img');
    if (fa) {
      fabric.Image.fromURL(src, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        fa.add(image).renderAll();
      });
    }
  };

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
            <div>
              <Header
                isUpload={isUpload}
                setStep={setStep}
                step={step}
                setShowHamburger={setShowHamburger}
                showHamburger={showHamburger}
              />
              <Stepper step={step} />
            </div>
            {/* <Test /> */}
            {/* <Sign />
            <UploadFile2 />
            <Output /> */}

            {/* 第一步：上傳檔案 */}
            {!isUpload && <EmptyFile onUploadFile={onUploadFile} />}

            {/* 第二步：預覽上傳資料(pdf=image) */}
            {step === '1' && (
              <Step1
                fileName={fileName}
                uploadPdf={uploadPdf}
                isUpload={isUpload}
                setCached={setCached}
                focus={focus}
                step={step}
                setIsUpload={setIsUpload}
                setFa={setFa}
              />
            )}
            {/* 第三步：將pdf轉成圖檔 */}
            {isUpload && (
              <ShowUploadPdf
                step={step}
                fileName={fileName}
                uploadPdf={uploadPdf}
                isUpload={isUpload}
                signed={signed}
                onPasteSign={onPasteSign}
                setFa={setFa}
                fa={fa}
              />
            )}

            {/* <div className="relative h-full bg-gray py-2.5 px-5">
							<FileList showFileList={showFileList} setFileList={setFileList} />
						</div> */}
            {step !== '1' && (
              <div className="absolute bottom-0 z-50 w-full">
                <Footer mode={mode} setMode={setMode} />
              </div>
            )}
            {mode === 'sign' ? (
              <SignModal
                setMode={setMode}
                show={mode === 'sign'}
                setSigned={setSigned}
                onPasteSign={onPasteSign}
              />
            ) : null}
            <TextModal setMode={setMode} show={mode === 'text'} />
            <PersonalModal setMode={setMode} show={mode === 'personal'} />

            {step === '3' && <DownloadBtn />}
            {/* focus === '2' */}
            {focus === '2' && <SettingSignModal focus={focus} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
