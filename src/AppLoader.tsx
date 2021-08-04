import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  text: string;
};

export type PostType = {
  id: number;
  message: string;
  likeCount: number;
};

const dialogsData: Array<DialogType> = [
  { id: 1, name: 'Roksi' },
  { id: 2, name: 'Max' },
  { id: 3, name: 'John' },
  { id: 4, name: 'Andrey' },
  { id: 5, name: 'Tom' },
  { id: 6, name: 'Jerry' },
  { id: 7, name: 'Ben' },
];
const messagesData: Array<MessageType> = [
  { id: 1, text: 'hello' },
  { id: 2, text: 'hi' },
  { id: 3, text: 'yo' },
  { id: 4, text: 'bye' },
];

const postsData: Array<PostType> = [
  { id: 1, message: 'Hi, how are you?', likeCount: 12 },
  { id: 1, message: "It's my post!", likeCount: 10 },
  { id: 1, message: 'Some news', likeCount: 1 },
  { id: 1, message: 'SomePost', likeCount: 5 },
];

export const render = (element: HTMLElement): void => {
  ReactDOM.render(<App dialogs={dialogsData} messages={messagesData} posts={postsData} />, element);
};
