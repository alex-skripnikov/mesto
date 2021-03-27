export class UserInfo {
    constructor({ userNameSelector, userProfessionSelector }) {
      this._userName = document.querySelector(userNameSelector);
      this._userProfession = document.querySelector(userProfessionSelector);
    }

    //публичный метод - возвращает объект с данными пользователя
    getUserInfo() {
      const userName = this._userName.textContent;
      const userProfession = this._userProfession.textContent;
      return { userName, userProfession };
    }

    //публичный метод - принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(userName, userProfession) {
        this._userName.textContent = userName;
        this._userProfession.textContent = userProfession;
    }
  }