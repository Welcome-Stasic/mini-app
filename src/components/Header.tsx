import { useTheme } from "../context/ThemeContext";
import * as S from "../styles/styles.Header";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  showClose?: boolean;
}

export default function Header({
  title,
  onMenuClick,
  showClose = true,
}: HeaderProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const { theme, toggleTheme } = useTheme();

  return (
    <S.HeaderContainer theme={theme}>
      {/* <button onClick={toggleTheme}>
        {theme === "light" ? "тёмная" : "светлая"}
      </button> */}
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
}

