export type EventItem = {
  id: string;
  title: string;
  type: string;
  company: string;
  date: string;
  description?: string;
  eventType?: eventType;
  isNew?: boolean;
  tags?: string[];
  imageUrl?: string;
  createdAt: string;
};
type eventType = number | undefined;

export const eventTypeMap: Record<number, string> = {
  0: "События",
  1: "Конкурс",
  2: "Олимпиада",
  3: "Стажировка",
  4: "Вакансия",
};

export const mapEventType = (type: eventType): string => {
  if (type === undefined) return "События";
  return eventTypeMap[type] || "События";
};
