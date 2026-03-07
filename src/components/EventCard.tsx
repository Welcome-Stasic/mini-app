import React from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "../types/events";
import * as S from "../styles/styles.eventsCard";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

interface EventCardProps extends EventItem {}

const EventCard: React.FC<EventCardProps> = observer(
  ({ id, title, type, company, date, isNew, tags, imageUrl }) => {
    const { themeStore } = useStore();
    const navigate = useNavigate();

    return (
      <S.EventCardContainer
        theme={themeStore.theme}
        onClick={() => navigate(`/events/${id}`)}
      >
        {isNew && <S.BadgeNew theme={themeStore.theme}>NEW</S.BadgeNew>}
        <S.EventImage imageUrl={imageUrl} eventType={type} />
        <S.EventInfo theme={themeStore.theme}>
          <S.EventTitle>{title}</S.EventTitle>
          <S.EventType>{type}</S.EventType>
          <S.CompanyText>{company}</S.CompanyText>
          <S.DateText>{date}</S.DateText>
          {tags && tags.length > 0 && (
            <S.TagsContainer>
              {tags.map((tag) => (
                <S.Tag theme={themeStore.theme} key={tag}>
                  {tag}
                </S.Tag>
              ))}
            </S.TagsContainer>
          )}
        </S.EventInfo>
      </S.EventCardContainer>
    );
  },
);

export default EventCard;
