function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

class Timer {
  _state = {
    hours: 0,
    minutes: 0,
    save: false,
  };

  constructor() {
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="timer">
        <header class="timer__header">
          <span class="timer__field" data-field-hours>${this._state.hours}</span>
          <span class="timer__separator">:</span>
          <span class="timer__field" data-field-minutes>${this._state.minutes}</span>
        </header>
        
        <div class="timer__scale">
            <span class="timer__scale-title">Hours:</span>
            <input class="timer__range" data-range-hours type="range" min="0" max="24" value="${this._state.hours}" step="1">
        </div>

         <div class="timer__scale">
            <span class="timer__scale-title">Minutes:</span>
            <input class="timer__range" data-range-minutes type="range" min="0" max="60" value="${this._state.minutes}" step="1">
        </div>

        <button class="btn btn--save">save</button>
        
      </div>`;
  }

  _addListeners() {
    this._element.querySelector("[data-range-hours]").addEventListener("input", (event) => {
      this._setStateHours(event.target.value);
      this._render();
    });

    this._element.querySelector("[data-range-minutes]").addEventListener("input", (event) => {
      this._setStateMinutes(event.target.value);
      this._render();
    });
    
    this._element.querySelector(".btn--save").addEventListener("click", () => {
      this._setStateSave(true);
      this._setStateHours(0)
      this._setStateMinutes(0)
      this._render()
    });
  }

  _setStateSave(save) {
    this._state.save = save;
  }
  
  _setStateHours(hours) {
    this._state.hours = hours;
  }

  _setStateMinutes(minutes) {
    this._state.minutes = minutes;
  }

  _render() {
    this._element.querySelector("[data-field-hours]").textContent = this._state.hours;
    this._element.querySelector("[data-field-minutes]").textContent = this._state.minutes;

    this._element.querySelector("[data-range-hours]").value = this._state.hours;
    this._element.querySelector("[data-range-minutes]").value = this._state.minutes;
    
    if (this._state.save === true) {
        this._element.querySelector(".btn--save").classList.add("btn--active")
    } else {
        this._element.querySelector(".btn--save").classList.remove("btn--active")
    }
  }

  get element() {
    return this._element;
  }
}

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new Timer().element);
