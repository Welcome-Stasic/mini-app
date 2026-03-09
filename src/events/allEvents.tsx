import { useState, useEffect, type ComponentType, useMemo } from "react";
import EventsByType from "../components/EventsByType";
import {
  IconActions,
  IconChannel,
  IconDevices,
  IconFolder,
  IconCalendar,
} from "../icon/icons";
import type { EventItem } from "../types/events";
import * as S from "../styles/styles.events";
import { bannerSlides } from "../hooks/BannerDate";
import type { IconBaseProps } from "../types/colors";
import { EventList } from "../components/EventList";
import { toTranslit } from "../utils/toTranslit";
import { useNavigate, useParams } from "react-router-dom";
import { RouteName } from "../router/routes";
import { useStore } from "../store/storeProvider";
import { observer } from "mobx-react-lite";

const AllEvents = observer(() => {
  const { eventsCatalogStore } = useStore();

  useEffect(() => {
    eventsCatalogStore.loadEvents();
  }, [eventsCatalogStore]);

  const events = eventsCatalogStore.events;

  const navigate = useNavigate();
  const { type: slug } = useParams<{ type?: string }>();

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  // const [selectedType, setSelectedType] = useState<string | null>(null);

  const extendedSlides = [
    bannerSlides[bannerSlides.length - 1],
    ...bannerSlides,
    bannerSlides[0],
  ];

  const allTypes = [
    "Олимпиада",
    "Конкурс",
    "Стажировка",
    "Вакансия",
    "События",
  ];

  const slugToType = useMemo(() => {
    return Object.fromEntries(allTypes.map((t) => [toTranslit(t), t]));
  }, []);

  const eventsByType: Record<string, EventItem[]> = {};
  allTypes.forEach((type) => {
    eventsByType[type] = events.filter((e) => e.type === type);
  });

  const iconByType: Record<string, ComponentType<IconBaseProps>> = {
    Олимпиада: IconActions,
    Конкурс: IconChannel,
    Стажировка: IconDevices,
    Вакансия: IconFolder,
    События: IconCalendar,
  };

  const originalType = slug ? slugToType[slug] : null;

  useEffect(() => {
    setIsAutoPlaying(!originalType);
  }, [originalType]);

  useEffect(() => {
    if (!isAutoPlaying || originalType) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;

        if (nextSlide === extendedSlides.length - 1) {
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentSlide(1);
            setTimeout(() => setIsTransitioning(true), 50);
          }, 500);
          return nextSlide;
        }

        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, extendedSlides.length, originalType]);

  const goToSlide = (index: number) => {
    const extendedIndex = index + 1;
    setCurrentSlide(extendedIndex);
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleShowAll = (type: string) => {
    navigate(`${RouteName.ALLEVENTS}/${toTranslit(type)}`);
    setIsAutoPlaying(false);
  };

  // const handleBackToAll = () => {
  //   setSelectedType(null);
  //   setIsAutoPlaying(true);
  // };

  if (originalType) {
    return (
      <EventsByType
        type={originalType}
        events={eventsByType[originalType] || []}
      />
    );
  }

  return (
    <S.AllEventsContainer>
      <S.Banner>
        <S.BannerCarousel
          transition={isTransitioning}
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% - ${currentSlide * 20}px))`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <S.BannerSlide key={`${slide.id}-${index}`}>
              <S.BannerContent>
                <h2>{slide.title}</h2>
                <S.SeeAllButton onClick={() => handleShowAll(slide.type)}>
                  Показать все
                </S.SeeAllButton>
              </S.BannerContent>
            </S.BannerSlide>
          ))}
        </S.BannerCarousel>

        <S.SliderDots>
          {bannerSlides.map((_, index) => {
            const isActive =
              index === currentSlide - 1 ||
              (currentSlide === 0 && index === bannerSlides.length - 1) ||
              (currentSlide === extendedSlides.length - 1 && index === 0);
            return (
              <S.Dot
                key={index}
                active={isActive}
                onClick={() => goToSlide(index)}
              />
            );
          })}
        </S.SliderDots>
      </S.Banner>

      <EventList
        eventsByType={eventsByType}
        allTypes={allTypes}
        iconByType={iconByType}
        onOpenGroup={handleShowAll}
      />
    </S.AllEventsContainer>
  );
});

export default AllEvents;
