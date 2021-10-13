let subscribers = {
  messagesReceived: [] as SubscribeType[],
  statusChanged: [] as StatusChangedSubscriberType[],
};
let ws: WebSocket;

const closeHandler = () => {
  console.log('CLOSE WS');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers['messagesReceived'].forEach((s) => s(newMessages));
};

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', closeHandler);
};

const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
  ws.addEventListener('message', messageHandler);
};

export const chatApi = {
  start: () => {
    createChannel();
  },
  stop: () => {
    cleanUp();
    ws.close();
  },
  subscribe: (
    eventName: EventsNamesType,
    callback: SubscribeType | StatusChangedSubscriberType,
  ) => {
    // @ts-ignore
    subscribers[eventName].push(callback);
  },
  unsubscribe: (
    eventName: EventsNamesType,
    callback: SubscribeType | StatusChangedSubscriberType,
  ) => {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage: (message: string) => {
    ws.send(message);
  },
};

type EventsNamesType = 'messagesReceived' | 'statusChanged';
export type StatusType = 'pending' | 'ready' | 'error';
export type SubscribeType = (messages: ChatMessageType[]) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;
export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
