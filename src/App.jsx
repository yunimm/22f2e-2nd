import { useState, useEffect } from 'react';
import cx from 'classnames';
import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import SignModal from '../src/components/Modal/SignModal';
import TextModal from '../src/components/Modal/TextModal';
import PersonalModal from '../src/components/Modal/PersonalModal';
import SideBar from '../src/components/SideBar/SideBar';
import Header from './components/Header/Header';
import Step1 from '../src/components/Step1/Step1';
import Footer from './components/Footer/Footer';
// import FileList from './components/FileList/FileList';
import DownloadBtn from './components/DownloadBtn/DownloadBtn';
import Stepper from './components/Stepper/Stepper';
import SettingSignModal from './components/Modal/SettingSignModal';
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

  // 設定完簽名檔後 //
  const [signed, setSigned] = useState(false);
  // new fabric //
  const [fa, setFa] = useState(null);
  //個人化設定
  const [userMail, setUserMail] = useState(null);
  const [userTel, setUserTel] = useState(null);
  const [userAdr, setUserAdr] = useState(null);

  useEffect(() => {
    setShowHamburger(false);
  }, [focus]);

  const backToStep2 = () => {
    setStep('2');
    clearFabric();
  };

  const backToStep1 = () => {
    setIsUpload(false);
    setStep('1');
    setUploadPdf(null);
    setSigned(false);
  };
  const onPrevStep = () => {
    if (step === '2') {
      AlertTwoButton(
        '返回上一步',
        '確定要返回上一步驟?',
        '請注意若確認返回上一步驟，正在簽署中的文件將不會被保留。',
        backToStep1,
      );
    } else if (step === '3') {
      AlertTwoButton(
        '返回上一步',
        '確定要返回上一步驟?',
        '請注意若確認返回上一步驟，已完成簽署的簽名及文字將被清除，還原至原檔。',
        backToStep2,
      );
    }
  };
  const alertCompletedSign = () => {
    setStep('3');
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 500,
      imageAlt: 'A tall image',
      title: '恭喜您完成簽屬!',
      showCancelButton: true,
      // 取消
      confirmButtonText: '瀏覽簽署內容',
      // 確認
      cancelButtonText: '立即下載PDF檔',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDismissed) {
        onDownloadFile();
      } else {
        alert('停留在step3');
      }
    });
  };
  const alertDownloadedSuccess = () => {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 500,
      imageAlt: 'A tall image',
      title: '下載檔案成功!',
      showCancelButton: true,
      // 取消
      confirmButtonText: '明白了!',
      // 確認
      cancelButtonText: '立即簽署新文件',
    }).then((result) => {
      if (result.isDismissed) {
        AlertTwoButton(
          '簽屬新檔案',
          '簽署新的檔案?',
          '請確認此簽署檔案是否已下載或儲存，若開始簽屬新文件，此檔案將不被保留。',
          backToStep1,
        );
        //
      } else {
        setStep('3');
      }
    });
  };
  const onFinish = () => {
    // 1彈窗-下載檔案成功!恭喜您完成簽屬!
    // 1-1 選擇瀏覽簽署內容->停留在step3
    // 1-2 選擇立即下載PDF-> 2 彈窗-下載檔案成功!

    //2 選擇明白了!->停留在step3
    //2 選擇立即簽署新文件->3 Alert簽署新的檔案?

    //3 Alert簽署新的檔案
    //3 選擇取消->停留在step3
    //3 選擇簽屬新檔案->回到step2->清除簽名

    AlertTwoButton(
      '完成簽屬',
      '完成簽屬文件?',
      '請確認是否完成文件簽屬，若進入完成簽屬將無法返回編輯文件。',
      alertCompletedSign,
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

  const clearFabric = () => {
    while (fa._objects[0]) {
      fa.remove(fa._objects[0]);
    }
    setSigned(false);
  };

  const clear = () => {
    AlertTwoButton(
      '確定清空',
      '重新簽署文件?',
      '請確認是否要清空所有已編輯資料。',
      clearFabric,
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

    alertDownloadedSuccess();
  };

  return (
    <div className="App">
      <div className="h-screen bg-gray">
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
                backToStep1={backToStep1}
              />
              <Stepper step={step} />
            </div>

            {/* 第一步：上傳檔案 */}
            {!isUpload && focus === '1' && (
              <EmptyFile onUploadFile={onUploadFile} />
            )}

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
                focus={focus}
              />
            )}
            {step === '2' && (
              <div className="absolute bottom-0 z-50 w-full">
                <Footer
                  fa={fa}
                  mode={mode}
                  setMode={setMode}
                  signed={signed}
                  clear={clear}
                  focus={focus}
                />
              </div>
            )}

            {mode === 'sign' ? (
              <SignModal
                onPasteSign={onPasteSign}
                setMode={setMode}
                show={mode === 'sign'}
              />
            ) : null}

            <TextModal fa={fa} setMode={setMode} show={mode === 'text'} />
            <PersonalModal
              fa={fa}
              setMode={setMode}
              show={mode === 'personal'}
              userMail={userMail}
              userTel={userTel}
              userAdr={userAdr}
              setSigned={setSigned}
            />

            {step === '3' && <DownloadBtn onDownloadFile={onDownloadFile} />}
            <SettingSignModal
              setMode={setMode}
              setSigned={setSigned}
              onPasteSign={onPasteSign}
              setUserMail={setUserMail}
              setUserAdr={setUserAdr}
              setUserTel={setUserTel}
              focus={focus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
