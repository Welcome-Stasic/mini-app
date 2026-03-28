import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/styles.EventDetailPage";

import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";
import { useEvents } from "../hooks/events/useEvents";
import { useAddEventUser } from "../hooks/events/useAddEventUser";
import { useRemoveEventUser } from "../hooks/events/useRemoveEventUser";
import { Loader } from "./loader";

const EventDetail = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { myEventsStore, themeStore} = useStore();
  const theme = themeStore.theme;
  const { data: events, isLoading } = useEvents();
  const eventItem = events?.find(e => e.id === id);
  const addMutation = useAddEventUser();
  const removeMutation = useRemoveEventUser();


  const gradients: Record<string, string> = {
    События: "linear-gradient(180deg, #0099FF, #FFFFFF)",
    Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
    Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
    Стажировка: "linear-gradient(180deg, #787878, #161616)",
    Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
  };
  if (isLoading) return <Loader/>

  if (!eventItem) {
    return (
      <S.Container theme={theme} style={{ padding: 16 }}>
        <S.BackButton className="btn-event" onClick={() => navigate(-1)}>
          Назад
        </S.BackButton>
        <S.NotFound>Ивент не найден</S.NotFound>
      </S.Container>
    );
  }

  const gradient = gradients[eventItem.type] || "linear-gradient(135deg, #787878, #161616)";
  
  const isAdded = myEventsStore.isEventAdded(eventItem?.id);

  const handleToggle = () => {
    if (isAdded) {
      removeMutation.mutate(eventItem.id);
    } else {
      addMutation.mutate(eventItem.id);
    }
  };
  return (
    <S.Container theme={theme}>
      <S.Header gradient={gradient} />
      <S.Grid>
        <S.Card>
          <S.Info theme={theme}>
            <S.Title>{eventItem.title}</S.Title>
            <S.ChipsRow>
              <S.Chip theme={theme} muted>
                c {eventItem.date}
              </S.Chip>
              <S.Chip theme={theme}>{eventItem.type}</S.Chip>
              {eventItem.tags?.map((tag) => (
                <S.Chip theme={theme} key={tag} muted>
                  {tag}
                </S.Chip>
              ))}
            </S.ChipsRow>
            <S.Description>{eventItem.description}
            </S.Description>
            <S.CtaButton
              gradient={gradient}
              disabled={addMutation.isPending || removeMutation.isPending}
              onClick={handleToggle}
            >
              {isAdded
                ? "Уже участвуете"
                : "Участвовать"}
            </S.CtaButton>
          </S.Info>
        </S.Card>
      </S.Grid>
    </S.Container>
  );
});

export default EventDetail;
