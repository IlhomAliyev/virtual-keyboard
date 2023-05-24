'use strict';
const wrapper = document.querySelector('.wrapper');
const contentWrapper = document.querySelector('.content-wrapper');
const keyboard = document.querySelectorAll('.keyboard');
const keyboardRus = document.querySelector('.keyboard-rus');
const keyboardEng = document.querySelector('.keyboard-eng');
const keyboardSymbols = document.querySelectorAll('.keyboard-symbols')[0];
const textArea = document.querySelector('#text-area');
const keys = document.querySelectorAll('.key');
const optionKeys = document.querySelectorAll('.option-key');
const shiftKeys = document.querySelectorAll('#shift');
const capsLockKeys = document.querySelectorAll('#capslock');

const darkTheme = document.querySelector('.dark-theme');
const darkModeIcon = document.querySelector('.icon-svg-dark-mode');

wrapper.addEventListener('click', (e) => {
  if (e.target === wrapper || e.target === contentWrapper) {
    hideKeyboards();
  }

  switch (e.target) {
    case textArea:
      showKeyboard();
      break;
    case darkTheme:
    case darkModeIcon:
      document.body.classList.toggle('_dark');
      darkModeIcon.classList.toggle('icon-svg-dark-mode_rotated');
      break;
  }
});

const ENG = 'ENG';
const RUS = 'RUS';
const SYMB = 'SYMB';
let layout = ENG;

function hideKeyboards() {
  keyboardEng.classList.remove('_active');
  keyboardRus.classList.remove('_active');
  keyboardSymbols.classList.remove('_active');
  textArea.classList.remove('_active');
}

function showKeyboard() {
  textArea.classList.add('_active');

  switch (layout) {
    case ENG:
      keyboardEng.classList.add('_active');
      layout = ENG;
      break;
    case RUS:
      keyboardRus.classList.add('_active');
      layout = RUS;
      break;
    case SYMB:
      keyboardSymbols.classList.add('_active');
      layout = SYMB;
      break;
  }
}

keyboard.forEach((kybrd) => {
  kybrd.addEventListener('click', typeIn);
});

function typeIn(e) {
  textArea.focus();

  //! LETTERS
  if (e.target.closest('.key')) {
    textArea.value += e.target.innerHTML;
    shiftKeys.forEach((shKeys) => {
      if (shKeys.matches('._active')) {
        shKeys.classList.remove('_active');

        keys.forEach((ks) => {
          ks.innerHTML = ks.innerHTML.toLowerCase();
        });
      }
    });
  }

  //! SPACEBAR
  if (e.target.closest('#space')) {
    textArea.value += ' ';
  }

  //! TAB
  if (e.target.closest('#tab')) {
    textArea.value += '\t';
  }

  //! ENTER
  if (e.target.closest('#enter')) {
    textArea.value += '\n';
  }

  //! BACKSPACE
  if (e.target.closest('#backspace')) {
    textArea.value = textArea.value.slice(0, -1);
  }

  //! CAPS LOCK
  if (e.target.closest('#capslock')) {
    capsLockKeys.forEach((c) => {
      c.classList.toggle('_active');
      keys.forEach((k) => {
        c.matches('._active')
          ? (k.innerHTML = k.innerHTML.toUpperCase())
          : (k.innerHTML = k.innerHTML.toLowerCase());
      });
    });
  }

  //! SHIFT
  if (e.target.closest('#shift')) {
    shiftKeys.forEach((sh) => {
      sh.classList.toggle('_active');
      keys.forEach((k) => {
        sh.matches('._active')
          ? (k.innerHTML = k.innerHTML.toUpperCase())
          : (k.innerHTML = k.innerHTML.toLowerCase());
      });
    });
  }

  //! LANGUAGE
  if (e.target.closest('#language')) {
    keyboard.forEach((kybrd) => kybrd.classList.remove('_active'));
    switch (layout) {
      case ENG:
        keyboardRus.classList.add('_active');
        layout = RUS;
        break;
      case RUS:
        keyboardEng.classList.add('_active');
        layout = ENG;
        break;
      case SYMB:
        keyboardEng.classList.add('_active');
        layout = ENG;
        break;
    }
  }

  //! SYMBOLS
  if (e.target.closest('#symbols')) {
    keyboard.forEach((kybrd) => kybrd.classList.remove('_active'));
    switch (layout) {
      case SYMB:
        keyboardEng.classList.add('_active');
        layout = ENG;
        break;
      case ENG:
      case RUS:
        keyboardSymbols.classList.add('_active');
        layout = SYMB;
        break;
    }
  }

  //! CLEAN
  if (e.target.closest('.clean-button')) {
    textArea.value = '';
  }

  //! ESCAPE
  if (e.target.closest('#escape')) {
    hideKeyboards();
  }
}

//! EMULATION
const langBtns = document.querySelectorAll('#language');

document.body.addEventListener('keydown', (e) => {
  keys.forEach((k) => {
    e.key.toLowerCase() === k.innerHTML.toLowerCase() &&
      k.classList.add('_active');
  });

  optionKeys.forEach((optKey) => {
    if (
      e.code.toLowerCase() === optKey.id.toLowerCase() ||
      e.key.toLowerCase() === optKey.id.toLowerCase()
    ) {
      optKey.classList.add('_active');

      switch (e.key.toLowerCase()) {
        case 'escape':
          optKey.click();
          break;
        case 'tab':
          e.preventDefault();
          break;
      }
    }
  });
});

document.body.addEventListener('keyup', (e) => {
  keys.forEach((k) => {
    e.key.toLowerCase() === k.innerHTML.toLowerCase() &&
      k.classList.remove('_active');
  });

  optionKeys.forEach((optKey) => {
    if (
      e.code.toLowerCase() === optKey.id.toLowerCase() ||
      e.key.toLowerCase() === optKey.id.toLowerCase()
    ) {
      optKey.classList.remove('_active');
    }
  });
});
