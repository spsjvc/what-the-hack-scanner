import * as _ from 'lodash';

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export class User {
  constructor(data) {
    _.assignWith(this, data);
  }

  static get USER_ROLES() {
    return USER_ROLES;
  }

  isAdmin() {
    return this.role === USER_ROLES.ADMIN;
  }
}
