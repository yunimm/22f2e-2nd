const Stepper = ({ step }) => {
  return (
    <ul className="flex justify-between">
      <li className="w-1/3 border-b-[6px] border-gray-dark bg-[#DEE1E3] py-2.5 text-center">
        <span className="step1circle" />
        <span>上傳簽屬檔案</span>
      </li>
      <li className="step2bg" data-active={step >= '2'}>
        <span className="step2circle" data-active={step >= '2'} />
        <span>進行簽署</span>
      </li>
      <li className="step3bg" data-active={step === '3'}>
        <span className="step3circle" data-active={step === '3'} />
        <span>簽署完成</span>
      </li>
    </ul>
  );
};

export default Stepper;
