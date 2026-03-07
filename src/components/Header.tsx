import { observer } from "mobx-react-lite";
import { useStore } from "../store/storeProvider";
import * as S from "../styles/styles.Header";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  showClose?: boolean;
}

const Header = observer(
  ({ title, onMenuClick, showClose = true }: HeaderProps) => {
    const { themeStore } = useStore();
    const theme = themeStore.theme;
    const navigate = useNavigate();

    return (
      <S.HeaderContainer theme={theme}>
        <button onClick={themeStore.toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {showClose && (
          <S.CloseButton theme={theme} onClick={() => navigate(-1)}>
            ×
          </S.CloseButton>
        )}
        <S.Title>{title}</S.Title>
        <S.MenuButton theme={theme} onClick={onMenuClick}>
          ⋯
        </S.MenuButton>
      </S.HeaderContainer>
    );
  },
);

export default Header;
