const getStringType = (type, tooltip = false) => {

  if (tooltip) {
    if (type === '1') {
      return "Физическое лицо";
    }
    else if (type === '2') {
      return "Юридическое лицо";
    }
    else {
      return null;
    }
  }

  if (type === '1') {
    return "Ф";
  }
  else if (type === '2') {
    return "Ю";
  }
  else {
    return null;
  }
};

export const getUserTemplate = (user) => {
  return `
      <tr class="users__row">
        <td class="users__cell users__cell--name">
            ${user.firstName}
        </td>
        <td class="users__cell">
          <button
            class="users__button-tooltip"
            type="button"
            data-users-ref="tooltip"
            data-tippy-content="${getStringType(user.type, true)}"
          >
            ${getStringType(user.type)}
          </button>
        </td>
        <td class="users__cell">
            ${user.userNumber}
        </td>
        <td class="users__cell">
            <button
                class="users__button-edit button"
                type="button"
                data-users-ref="edit"
                data-users-options=${user.id}
            />
                Редактировать
            </button>
        </td>
        <td class="users__cell">
            <button
                class="users__button-delete button"
                type="button"
                data-users-ref="delete"
                data-users-options=${user.id}
            >
                Удалить
            </button>
        </td>
      </tr>
  `;
};

export const getUserEditTemplate = (user) => {
  return `
      <tr class="users__row">
        <td class="users__cell users__cell--name">
            <div class="users__cell-element">
              <input
                class="users__cell-input"
                type="text"
                value="${user.firstName}"
                data-users-ref="first-name-update"
              />
              <div class="users__message" data-users-ref="message"></div>
            </div>
        </td>
        <td class="users__cell">
          <select class="users__select-update" data-users-ref="type-update">
            <option value="1">Физическое лицо</option>
            <option value="2">Юридическое лицо</option>
          </select>
        </td>
        <td class="users__cell">
            <div class="users__cell-element">
              <input
                  class="users__cell-input"
                  type="text"
                  value="${user.userNumber}"
                  data-users-ref="user-number-update"
              />
              <div class="users__message" data-users-ref="message"></div>
           </div>
        </td>
        <td class="users__cell">
            <button
                class="users__button-edit button"
                type="button"
                data-users-ref="update"
                data-users-options=${user.id}
            />
                Обновить
            </button>
        </td>
        <td class="users__cell">
            <button
                class="users__button-delete button"
                type="button"
                data-users-ref="close"
                data-users-options=${user.id}
            >
                Закрыть
            </button>
        </td>
      </tr>
  `;
};
