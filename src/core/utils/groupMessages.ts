import { ObjectId, UserMessage } from '@nc-core/interfaces/api';
import {
  addMinutes,
  differenceInDays,
  format,
  isAfter,
  isBefore,
  isEqual,
  set,
  subMinutes,
} from 'date-fns';
import { es } from 'date-fns/locale';

export function groupMessages(
  messages: UserMessage[],
): { title: string; messages: UserMessage[][] }[] {
  const groupedByDate = messages.reduce<
    { date: Date; messages: UserMessage[] }[]
  >((prev, cur) => {
    const date = set(new Date(cur.createdAt), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    const index = prev.findIndex((p) => isEqual(p.date, date));
    if (index > -1) {
      prev[index].messages.push(cur);
      return prev;
    }

    return [...prev, { date, messages: [cur] }];
  }, []);

  const grouped = groupedByDate.map((cur) => {
    const messages = cur.messages.reduce<
      {
        closed: boolean;
        content: UserMessage[];
        read: boolean;
        senderId: ObjectId;
        since: Date;
        to: Date;
      }[]
    >((prevMessages, curMessage) => {
      const createdAt = new Date(curMessage.createdAt);

      const index = prevMessages.findIndex(
        (p) =>
          !p.closed &&
          p.read === curMessage.read &&
          p.senderId === curMessage.senderId &&
          isAfter(createdAt, p.since) &&
          isBefore(createdAt, p.to),
      );

      if (index > -1) {
        prevMessages[index].content.push(curMessage);
        return prevMessages;
      }

      if (prevMessages.length > 0) {
        prevMessages[prevMessages.length - 1].closed = true;
      }

      return [
        ...prevMessages,
        {
          closed: false,
          content: [curMessage],
          read: curMessage.read,
          senderId: curMessage.senderId,
          since: subMinutes(createdAt, 5),
          to: addMinutes(createdAt, 5),
        },
      ];
    }, []);

    const diff = differenceInDays(cur.date, new Date());

    return {
      messages,
      title:
        diff === 0
          ? 'Hoy'
          : diff === -1
          ? 'Ayer'
          : format(cur.date, 'dd MMMM/yyyy', { locale: es }),
    };
  });

  return grouped.map(({ messages, title }) => ({
    messages: messages.map(({ content }) => content),
    title,
  }));
}
