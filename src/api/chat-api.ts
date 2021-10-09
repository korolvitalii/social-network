let subscribers = [] as SubscribeType[];
let ws: WebSocket;

const closeHandler = () => {
  console.log('CLOSE WS');
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
};

const createChannel = () => {
  ws.removeEventListener('close', closeHandler);
  ws.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler);
};

export const chatApi = {
  subscribe: (callback: SubscribeType) => {
    subscribers.push(callback);
  },
  unsubscribe: (callback: SubscribeType) => {
    subscribers = subscribers.filter((s) => s !== callback);
  },
};

type SubscribeType = (messages: ChatMessageType[]) => void;

type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
