import './scss/index.scss';

import Users from './js/users.component';

const users = [...document.querySelectorAll('[data-component="users"]')].map(n => new Users(n));
