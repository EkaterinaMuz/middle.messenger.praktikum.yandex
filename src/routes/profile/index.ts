import Handlebars from 'handlebars';

import template from './Page.hbs?raw';
import { data } from './data.ts';


export const ProfilePage = Handlebars.compile(template)(data);

