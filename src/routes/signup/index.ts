import Handlebars from 'handlebars';

import template from './Page.hbs?raw';
import { data } from './data.ts';


Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});



export const SignPage = Handlebars.compile(template)(data);

