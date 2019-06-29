class NavigateServise {
  constructor() {
    this.init();
  }

  init() {
    console.log("init");
  }

  setData = (id, arr) => {
    arr = arr.includes(id) ? arr.filter(n => n !== id) : [...arr, id];

    const listM = JSON.stringify(arr);

    window.localStorage.setItem("data", listM);
  };

  getData = () => {
    return window.localStorage.getItem("data");
  };
}

const navigateServise = new NavigateServise();
export {navigateServise};
