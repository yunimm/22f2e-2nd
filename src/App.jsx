import { useState, useEffect } from 'react';
import cx from 'classnames';
import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { jsPDF } from 'jspdf';
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
import EmptyFile from './components/EmptyFile/EmptyFile';
import ShowUploadPdf from './components/ShowUploadPdf';
import { AlertTwoButton } from './components/Alert/Alert';
const doc = new jsPDF();
pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [showFileList, setFileList] = useState(false);
  const [focus, setFocus] = useState('1');
  const [step, setStep] = useState('1');
  // 依據狀態顯示不同彈窗： sign / text / personal //
  const [mode, setMode] = useState(null);

  // 儲存上傳的檔案 e.target.files[0]; //
  const [uploadPdf, setUploadPdf] = useState(null);
  const [fileName, setFileName] = useState('上傳簽署檔案名稱.pdf');

  // 設定完臨時簽名檔後 //
  const [signed, setSigned] = useState(false);
  // new fabric //
  const [fa, setFa] = useState(null);
  const [localSrc, setLocalSrc] = useState(null);

  useEffect(() => {
    setShowHamburger(false);
  }, [focus]);

  const onPrevStep = () => {
    const cb = () => {
      setIsUpload(false);
      setStep('1');
      setUploadPdf(null);
    };
    AlertTwoButton(
      '返回上一步',
      '確定要返回上一步驟?',
      '請注意若確認返回上一步驟，正在簽署中的文件將不會被保留。',
      cb,
    );
  };

  const onFinish = () => {
    const cb = () => {
      // 1彈窗-下載檔案成功!恭喜您完成簽屬!
      // 1-1 選擇瀏覽簽署內容->停留在step3
      // 1-2 選擇立即下載PDF-> 2 彈窗-下載檔案成功!

      //2 選擇明白了!->停留在step3
      //2 選擇立即簽署新文件->3 Alert簽署新的檔案?

      //3 Alert簽署新的檔案
      //3 選擇取消->停留在step3
      //3 選擇簽屬新檔案->回到step1

      setStep('3');
    };
    AlertTwoButton(
      '完成簽屬',
      '完成簽屬文件?',
      '請確認是否完成文件簽屬，若進入完成簽屬將無法返回編輯文件。',
      cb,
    );
  };
  const onUploadFile = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setUploadPdf(file);
    setIsUpload(true);
  };

  const onPasteSign = () => {
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

    setSigned(true);
  };

  const clear = () => {
    const cb = () => {
      while (fa._objects[0]) {
        fa.remove(fa._objects[0]);
      }
      setSigned(false);
    };
    AlertTwoButton(
      '確定清空',
      '重新簽署文件?',
      '請確認是否要清空所有已編輯資料。',
      cb,
    );
  };
  const onDownloadFile = () => {
    // 將 canvas 存為圖片
    const image = fa.toDataURL('image/png');
    // 設定背景在 PDF 中的位置及大小
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;
    doc.addImage(image, 'png', 0, 0, width, height);
    doc.save('download.pdf');
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
                onPrevStep={onPrevStep}
                onFinish={onFinish}
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
                focus={focus}
                step={step}
                setIsUpload={setIsUpload}
                setFa={setFa}
              />
            )}
            {/* 第三步：將pdf轉成圖檔,並顯示在畫面上 */}
            {isUpload && (
              <ShowUploadPdf
                step={step}
                fileName={fileName}
                uploadPdf={uploadPdf}
                isUpload={isUpload}
                onPasteSign={onPasteSign}
                setFa={setFa}
                fa={fa}
              />
            )}
            {step !== '1' && (
              <div className="absolute bottom-0 z-50 w-full">
                <Footer
                  mode={mode}
                  setMode={setMode}
                  signed={signed}
                  clear={clear}
                />
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

            {step === '3' && <DownloadBtn onDownloadFile={onDownloadFile} />}
            {/* focus === '2' */}
            {focus === '2' && <SettingSignModal focus={focus} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
