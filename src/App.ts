import { renderRoute } from './infrastructure/routing';
import  { RouteConfigPaths } from './infrastructure/routing/types';
import { isRouteConfigPath } from './infrastructure/utils';
import type Block from './framework/Block';
import {Footer} from "./components";

export default class App {
  constructor() {
    this.rootElement = document.getElementById('root');
  }

  public async init() {
    this.renderedPage = await renderRoute(this.currentPage);

    if (!this.renderedPage) {
      return;
    }

    this.render();
  }

  public render() {
    if(!this.rootElement || !this.renderedPage) {
      return null;
    }

    const page = this.renderedPage.element();

    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(page);

      const footer = new Footer({
          events: {
              click: (e: Event) => this.handleNavigate(e)
          }
      });

      page.appendChild(footer.element());

  }

  public handleNavigate(e: Event) {
      e.preventDefault();
      const targetElement = e.target;

      if (targetElement instanceof HTMLElement) {
          const page =  targetElement.dataset.page;

          if (isRouteConfigPath(page)) {
              this.currentPage = page;
             void this.init();
          }
      }
  }


  private readonly rootElement: HTMLElement | null;
  private currentPage: RouteConfigPaths = RouteConfigPaths.chat;
  private renderedPage:  Block | null = null;
  }
