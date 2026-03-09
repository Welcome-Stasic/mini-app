import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "../icon/icons";
import * as S from "../styles/styles.LoginFormPage";
import { MOCK_USERID, MOCK_LOGIN, MOCK_PASSWORD } from "../hooks/Authorizade";
import { RouteName } from "../router/routes";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{6,}$/;

const LoginPage: React.FC = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const navigate = useNavigate();
  const { userStore } = useStore();

  const isFormFilled = login.trim() !== "" && password.trim() !== "";

  // Валидация полей
  const validate = () => {
    let valid = true;

    // Сброс ошибок при новой попытке
    setLoginError(false);
    setPasswordError(false);
    setIsAuthError(false);
    setAuthMessage("");

    if (!emailRegex.test(login)) {
      setLoginError(true);
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      valid = false;
    }

    return valid;
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    // Сначала проверяем валидацию
    if (!validate()) return;

    // Если валидация прошла, проверяем авторизацию
    if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
      await userStore.fetchUserProfile(MOCK_USERID);
      navigate(RouteName.ACCOUNT);
    } else {
      setIsAuthError(true);
      setAuthMessage("Неверный логин или пароль");
    }
  };

  // Обработчики изменения полей
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    if (loginError) setLoginError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage("");
    }
  };

  return (
    <S.LoginContainer>
      <S.Form id="login-form" onSubmit={handleSubmit}>
        {/* ловушки для автозаполнения — не мешают сабмиту и не совпадают по name */}
        <input
          type="text"
          autoComplete="username"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />
        <input
          type="password"
          autoComplete="current-password"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            height: 0,
            width: 0,
            opacity: 0,
          }}
        />

        {/* Логин */}
        <div className="form-group">
          <S.InputWrapper error={loginError}>
            <input
              type="email"
              id="login"
              name="login"
              autoComplete="off"
              value={login}
              onChange={handleLoginChange}
              required
              placeholder=" "
            />
            <label htmlFor="login">Логин</label>
          </S.InputWrapper>
        </div>

        {/* Пароль */}
        <div className="form-group">
          <S.InputWrapper error={passwordError}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder=" "
            />
            <label htmlFor="password">Пароль</label>
            {/* Кнопка-глаз */}
            <S.EyeButton
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <IconEye /> : <IconEyeOff />}
            </S.EyeButton>
          </S.InputWrapper>
        </div>

        {/* Сообщение об ошибке авторизации */}
        {authMessage && <S.InputHint>{authMessage}</S.InputHint>}

        {/* Кнопка входа */}
        <S.SubmitButton type="submit" disabled={!isFormFilled}>
          Войти
        </S.SubmitButton>
      </S.Form>
    </S.LoginContainer>
  );
});

export default LoginPage;
