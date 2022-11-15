import React from "react";
import cx from "classnames";
import {Bars3Icon} from "@heroicons/react/24/outline";
import logoDark from "../../assets/logo_dark_2x.png";

const Header = ({step, setStep, showHamburger, setShowHamburger, uploadFile}) => {
	return (
		<div className="flex min-h-[72px] items-center justify-between bg-white px-3 drop-shadow-md">
			<div className={cx(!showHamburger && "hidden")} />
			<div className={cx("flex items-center gap-2", showHamburger && "hidden")}>
				<Bars3Icon onClick={() => setShowHamburger(true)} className="h-9 w-9 cursor-pointer text-[#C0D2DD]" />
				<img src={logoDark} alt="logo-dark on screen" className="h-9 w-[43.01px]" />
			</div>
			<span className="text-gray-dark">united</span>
			<div className="flex h-full items-center justify-end gap-2.5">
				{step > "1" && (
					<button type="button" className="btn-white" onClick={() => setStep(step - 1 + "")}>
						返回
					</button>
				)}
				{step === "1" && (
					<button type="button" className={cx("btn-black", {disabled: !uploadFile})} onClick={() => setStep("2")}>
						<span className="font-medium">下一步</span>
					</button>
				)}
				{step === "2" && (
					<button type="button" className="btn-black" onClick={() => setStep("3")}>
						<span className="font-medium">完成</span>
					</button>
				)}
				{step === "3" && (
					<button type="button" className="btn-black">
						<span className="font-medium">新檔案</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
