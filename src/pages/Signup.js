import { useNavigate } from "react-router-dom";
import { Broccoli } from "../assets/icons/Broccoli";
import { TextInputField } from "../components/TextInputField";
import { GreenButton } from "../components/GreenButton";
import { useInput } from "../hooks/useInput";
import { ClickableTextHighlight } from "../components/ClickableTextHighlight";

export const Signup = () => {
  const navigate = useNavigate();
  const onLoginHandler = () => {};

  const [username, handleUsernameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [nickname, handleNicknameChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [passwordChecker, handlePasswordCheckerChange] = useInput("");

  return (
    <div className="flex  items-center h-screen justify-between">
      <div className="flex justify-center items-center w-full h-full bg-green-100">
        <Broccoli height="400px" width="400px" />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full max-w-xl bg-[#f1ffe9] py-16 parent text-commonTextColor shadow-sm">
        <div className="text-4xl mb-5 text-commonTextColor font-bold">SIGNUP</div>

        <TextInputField
          autofocus={true}
          inputLabel="Username"
          inputType="text"
          placeholderText="아이디"
          value={username}
          handleInputChange={handleUsernameChange}
        />
        <TextInputField
          inputLabel="Password"
          inputType="password"
          placeholderText="비밀번호"
          value={password}
          handleInputChange={handlePasswordChange}
        />
        <TextInputField
          inputLabel="Confirm Password"
          inputType="password"
          placeholderText="비밀번호 확인"
          value={passwordChecker}
          handleInputChange={handlePasswordCheckerChange}
        />

        <TextInputField inputLabel="Nickname" inputType="text" placeholderText="닉네임" value={nickname} handleInputChange={handleNicknameChange} />
        <TextInputField inputLabel="Email" inputType="email" placeholderText="이메일" value={email} handleInputChange={handleEmailChange} />

        <div className="mt-5 w-2/3 p-3 px-4 rounded-md">
          <GreenButton buttonText="Login" clickHandler={onLoginHandler} />
        </div>

        <div className="flex items-center">
          <div className="text-lg my-2 mr-2">이미 회원이신가요?</div>
          <ClickableTextHighlight onClickHandler={() => navigate("/login")}>로그인</ClickableTextHighlight>
        </div>
      </div>
    </div>
  );
};
