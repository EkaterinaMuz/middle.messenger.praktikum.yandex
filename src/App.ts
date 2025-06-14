import  Handlebars from 'handlebars';

import { renderRoute } from './infrastructure/routing';
import { FormItem, InfoCell, ProfileHeader , Button, Footer } from './components';
import { RouteConfigPaths } from './infrastructure/routing/types';
import { isRouteConfigPath } from './infrastructure/utils';

Handlebars.registerPartial('FormItem', FormItem);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('ProfileHeader', ProfileHeader);
Handlebars.registerPartial('InfoCell', InfoCell);
Handlebars.registerPartial('Footer', Footer);

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

    this.rootElement.innerHTML =  this.renderedPage;

    this.attachEventListeners();
  }

  public  attachEventListeners() {
    const links = document.querySelectorAll('[data-page]');

    links.forEach(link =>link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetElement = e.target;

      if (targetElement instanceof HTMLElement) {
        const page =  targetElement.dataset.page;

        if (isRouteConfigPath(page)) {
          this.navigate(page);
        }
      }
    }));
  }

  public navigate(page: RouteConfigPaths) {
    this.currentPage = page;
    this.init();
  }

  private readonly rootElement: HTMLElement | null;
  private currentPage: RouteConfigPaths = RouteConfigPaths.edit;
  private renderedPage: string | null = null;
  }
