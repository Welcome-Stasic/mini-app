import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "../styles/styles.EventDetailPage";

import type { EventItem } from "../types/events";
import { fetchEventById } from "../api/events";
import { fallbackEvents } from "../hooks/FallBackEvents";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

const EventDetail = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { myEventsStore } = useStore();
  const { themeStore } = useStore();
  const theme = themeStore.theme;

  const [eventItem, setEventItem] = useState<EventItem | undefined>(() =>
    fallbackEvents.find((e) => e.id === id),
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      try {
        const data = await fetchEventById(id);
        if (!cancelled && data) setEventItem(data);
      } catch (_err) {
        // фолбэк остаётся
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const gradients: Record<string, string> = {
    События: "linear-gradient(180deg, #0099FF, #FFFFFF)",
    Олимпиада: "linear-gradient(180deg, #FF9500, #FFBD61)",
    Конкурс: "linear-gradient(180deg, #7378FF, #ACAFFF)",
    Стажировка: "linear-gradient(180deg, #787878, #161616)",
    Вакансия: "linear-gradient(135deg, #87C0FF, #007AFF)",
  };

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

  const gradient =
    gradients[eventItem.type] || "linear-gradient(135deg, #787878, #161616)";

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
            <S.Description>
              Приглашаем вас на уникальное мероприятие, организованное компанией
              "Инфотех". В этот день мы представим новейшие технологии и решения
              в области информационных технологий. Участники смогут посетить
              мастер-классы, где эксперты поделятся своими знаниями и опытом.
              Также будет возможность пообщаться с представителями ведущих
              компаний отрасли. Не упустите шанс расширить свои горизонты и
              завести полезные знакомства. Ждем вас на нашем мероприятии!
            </S.Description>
            <S.CtaButton
              gradient={gradient}
              disabled={myEventsStore.isEventAdded(eventItem.id)}
              onClick={() => {
                if (!myEventsStore.isEventAdded(eventItem.id)) {
                  myEventsStore.addEvent(eventItem);
                  alert('Событие добавлено в "Мои события"!');
                } else {
                  alert("Вы уже участвуете в этом событии!");
                }
              }}
            >
              {myEventsStore.isEventAdded(eventItem.id)
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
