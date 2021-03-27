export class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    //публичный метод - проходим по каждому элементу входящего массива и создаем нужный элемент входящей функцией renderer
    renderItems() {
      this._renderedItems.forEach(item => this._renderer(item));
    }

    //публичный метод - добавляем в начало входящего контейнера элемент переданный функции
    addItem(element) {
      this._container.prepend(element);
    }
  }