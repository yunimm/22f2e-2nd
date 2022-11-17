import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

import * as pdf from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.js?url';

pdf.GlobalWorkerOptions.workerSrc = pdfWorker;

function App() {
  const [focus, setFocus] = useState('2');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('1');

  const [isUpload, setIsUpload] = useState(false);
  const [mode, setMode] = useState(null);
  const [showFileList, setFileList] = useState(false);

  useEffect(() => {
    setShowHamburger(false);
  }, [focus]);

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
            <Header
              isUpload={isUpload}
              setStep={setStep}
              step={step}
              setShowHamburger={setShowHamburger}
              showHamburger={showHamburger}
            />
            <Stepper step={step} />
            {focus === '1' && (
              <>
                {step === '1' ? (
                  <Step1
                    step={step}
                    setIsUpload={setIsUpload}
                    isUpload={isUpload}
                  />
                ) : (
                  <>
                    <div className="relative h-full bg-gray py-2.5 px-5">
                      <FileList
                        showFileList={showFileList}
                        setFileList={setFileList}
                      />
                      {step === '3' && <DownloadBtn />}
                    </div>
                    <Footer mode={mode} setMode={setMode} />
                    <SignModal setMode={setMode} show={mode === 'sign'} />
                    <TextModal setMode={setMode} show={mode === 'text'} />
                    <PersonalModal
                      setMode={setMode}
                      show={mode === 'personal'}
                    />
                  </>
                )}
              </>
            )}
            {/* focus === '2' */}
            {focus === '2' && <SettingSignModal />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
