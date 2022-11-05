import React, { useState } from 'react';
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
function App() {
  const [focus, setFocus] = useState('1');
  const [showHamburger, setShowHamburger] = useState(false);
  const [step, setStep] = useState('1');
  const [uploadFile, setUploadFile] = useState(null);
  const [mode, setMode] = useState(null);
  const [showFileList, setFileList] = useState(false);

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
              setStep={setStep}
              step={step}
              setShowHamburger={setShowHamburger}
              showHamburger={showHamburger}
            />
            <Stepper step={step} />
            {focus === '1' && (
              <>
                {step === '1' ? (
                  <Step1 step={step} uploadFile={uploadFile} />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
