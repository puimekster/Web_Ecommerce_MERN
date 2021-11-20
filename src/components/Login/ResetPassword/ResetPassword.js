import React, { useState } from "react";
import iconShow from "../../../../src/images/Show.png";
import iconHide from "../../../../src/images/Hide.png";
import ArrowRight from "../../../images/ArrowRight.png";

const ResetPassword = () => {
	// const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isShowPassword, setIsShowPassWord] = useState(false);
	const onSubmit = () => {};
	const handleShowHidePassword = () => {
		console.log(password);
		setIsShowPassWord(!isShowPassword);
	};
	return (
		<div className="login">
			<form className="login-form">
				<div className="login-header">
					<h1 className="login-title">Create New Password</h1>
					<span className="login-info">
						Create a new password to log into your account
					</span>
				</div>
				<div className="login-content">
					<div className="fill-password padding-bottom">
						<span className="title-password">New Password</span>
						<div className="custom-input-password">
							<input
								className="input-password"
								type={isShowPassword ? "text" : "password"}
								placeholder="Password... "
								onChange={(e) => setPassword(e.target.value)}
							></input>
							<span onClick={() => handleShowHidePassword()}>
								<img
									className="show-password"
									alt=""
									src={isShowPassword ? iconShow : iconHide}
								/>
							</span>
						</div>
					</div>

					<div className="fill-password ">
						<span className="title-password">Confirm Password</span>
						<div className="custom-input-password">
							<input
								className="input-password"
								type="password"
								placeholder="Password... "
								onChange={(e) => setPassword(e.target.value)}
							></input>
						</div>
					</div>
				</div>
				<button className="btn-login" onClick={onSubmit}>
					Login
					<img className="icon-resgister" src={ArrowRight} alt=" " />
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
