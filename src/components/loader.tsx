import { observer } from "mobx-react-lite";
import * as S from "../styles/styles.loader";
import { useStore } from "../store/storeProvider";

export const Loader = observer(() => {
  const { themeStore } = useStore();
  return (
    <S.ContainerLoader theme={themeStore.theme}>
      <S.SVGLoader viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" />
      </S.SVGLoader>
    </S.ContainerLoader>
  );
});
