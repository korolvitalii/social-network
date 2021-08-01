import { render } from './AppLoader';

const element: HTMLElement | null = document.getElementById('container');

if (element) {
  render(element);
}

export {};
