import tippy from 'tippy.js';
import cloneDeep from 'lodash/cloneDeep';
import dataService from '../../../general/js/data-service';
import validators from '../../../general/js/validators';
import { getUserTemplate, getUserEditTemplate } from './templates';

export default class Users {
  constructor(el) {
    this.el = el;

    this.filterState = {
      filterByZeroState: false,
      filterByOneState: false,
      filterByTwoState: false,
    };

    this.form = this.el.querySelector('[data-users-ref="form"]');
    this.name = this.el.querySelector('[data-users-ref="name"]');
    this.type = this.el.querySelector('[data-users-ref="type"]');
    this.userNumber = this.el.querySelector('[data-users-ref="user-number"]');
    this.usersTbody = this.el.querySelector('[data-users-ref="users-tbody"]');
    this.selectFilter = this.el.querySelector('[data-users-ref="filter"]');

    this.init();
  }

  init() {
    this.el.addEventListener('click', this.userHandler);
    this.form.addEventListener('submit', this.createAd);
    this.selectFilter.addEventListener('change', this.selectFilterHandler);

    this.data = null;

    this.fetchAds();
  }

  selectFilterHandler = (event) => {
    if (event.target.value === '0') {
      this.filterByZero();
    }

    if (event.target.value === '1') {
      this.filterByOne();
    }

    if (event.target.value === '2') {
      this.filterByTwo();
    }
  }

  filterByZero = () => {
    this.filterState.filterByOneState = false;
    this.filterState.filterByTwoState = false;
    this.render(this.data);
  }

  filterByOne = () => {
    this.filterState.filterByOneState = true;
    this.filterState.filterByTwoState = false;
    this.render(this.data);
  }

  filterByTwo = () => {
    this.filterState.filterByOneState = false;
    this.filterState.filterByTwoState = true;
    this.render(this.data);
  }

  fetchAds = () => {
    dataService.fetchAds()
      .then((users) => {
        this.data = cloneDeep(users);
        this.render(this.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render = (data, mode = null, id = null) => {
    let users = data;

    users = users.sort((a, b) => {
      const nameA = a.firstName.toLowerCase();
      const nameB = b.firstName.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    if (this.filterState.filterByOneState) {
      users = users.filter((user) => {
        return user.type === '1';
      });
    }

    if (this.filterState.filterByTwoState) {
      users = users.filter((user) => {
        return user.type === '2';
      });
    }

    this.usersTbody.innerHTML = '';

    if (mode === 'edit') {
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          this.usersTbody.innerHTML += getUserEditTemplate(users[i]);
        } else {
          this.usersTbody.innerHTML += getUserTemplate(users[i]);
        }
      }

    } else {
      for (let i = 0; i < users.length; i++) {
        this.usersTbody.innerHTML += getUserTemplate(users[i]);
      }
    }

    this.tooltipInit();
  }

  tooltipInit = () => {
    this.tooltipElements = this.el.querySelectorAll('[data-users-ref="tooltip"]');

    this.tooltip = tippy(this.tooltipElements);
  }

  createAd = (event) => {
    event.preventDefault();

    const values = {
      name: this.name.value,
      userNumber: this.userNumber.value
    };

    const nodes = {
      name: this.name,
      userNumber: this.userNumber
    };

    const isValid = validators.required(this.el, values, nodes);

    if (!isValid) return false;

    const payload = {
      firstName: this.name.value,
      type: this.type.value,
      userNumber: this.userNumber.value
    };

    dataService.createAd(payload);

    this.name.value = '';
    this.userNumber.value = '';

    this.fetchAds();
  }

  deleteAd = (id) => {
    dataService.deleteAd(id)
      .then(() => {
        this.fetchAds();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  updateAd = (id) => {
    const firstName = this.el.querySelector('[data-users-ref="first-name-update"]');
    const type = this.el.querySelector('[data-users-ref="type-update"]');
    const userNumber = this.el.querySelector('[data-users-ref="user-number-update"]');

    const values = {
      name: firstName.value,
      userNumber: userNumber.value
    };

    const nodes = {
      name: firstName,
      userNumber: userNumber
    };

    const isValid = validators.required(this.el, values, nodes);

    if (!isValid) return false;

    const payload = {
      firstName: firstName.value,
      type: type.value,
      userNumber: userNumber.value
    };

    dataService.updateAd(id, payload)
      .then(() => {
        this.fetchAds();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  editAd = (id) => {
    this.render(this.data, 'edit', id);
  }

  closeAd = () => {
    this.render(this.data);
  }

  userHandler = (event) => {
    const dataSet = event.target.getAttribute('data-users-ref');
    const id = event.target.getAttribute('data-users-options');

    if (dataSet === 'delete') {
      this.deleteAd(id);
    }

    if (dataSet === 'edit') {
      this.editAd(id);
    }

    if (dataSet === 'close') {
      this.closeAd(id);
    }

    if (dataSet === 'update') {
      this.updateAd(id);
    }

    // if (event.target.dataset.usersRef === 'edit') {
    //   this.editUser(event.target.dataset.usersOptions);
    // }
    //
    // if (event.target.dataset.usersRef === 'update') {
    //   this.updateUser(event.target.dataset.usersOptions);
    // }
  }

}
