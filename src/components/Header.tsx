import { observer } from "mobx-react-lite";
import { useStore } from "../store/storeProvider";
import * as S from "../styles/styles.Header";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "../hooks/useLogOut";
import { RouteName } from "../router/routes";
import { useState } from "react";

interface HeaderProps {
  title: string;
  showClose?: boolean;
}

const Header = observer(({ title, showClose = true }: HeaderProps) => {
  const { themeStore } = useStore();
  const theme = themeStore.theme;
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const signOut = useSignOut();
  const onClickSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        navigate(RouteName.LOGIN);
      },
    });
    navigate(RouteName.LOGIN);
  };

  return (
    <S.HeaderContainer theme={theme}>
      {!themeStore.isTelegram && (
        <button onClick={themeStore.toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      )}
      {showClose && (
        <S.CloseButton theme={theme} onClick={() => navigate(-1)}>
          ×
        </S.CloseButton>
      )}
      <S.Title>{title}</S.Title>
      <S.MenuButton theme={theme} onClick={() => setIsOpenMenu(!isOpenMenu)}>
        ⋯
      </S.MenuButton>

      {isOpenMenu && (
        <S.Menu theme={theme} onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <S.MenuItem theme={theme} onClick={onClickSignOut}>
            Выйти
          </S.MenuItem>
        </S.Menu>
      )}
    </S.HeaderContainer>
  );
});

export default Header;
