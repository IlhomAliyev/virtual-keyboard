"use strict"
const keyboard = document.getElementsByClassName('keyboard');
const keyboardRus = document.getElementsByClassName('keyboard-rus')[0];
const keyboardEng = document.getElementsByClassName('keyboard-eng')[0];
const keyboardSymbols = document.getElementsByClassName('keyboard-symbols')[0];
const textArea = document.querySelector('#text-area');
const keys = document.getElementsByClassName('key');
const optionKeys = document.getElementsByClassName('option-key');
const shiftKeys = document.querySelectorAll('.shift');
const capsLockKeys = document.getElementsByClassName('caps-lock');

textArea.addEventListener("click", showKeyboard);
function showKeyboard() {
    if ((keyboardEng.classList.contains('keyboard_hidden')) && (keyboardSymbols.classList.contains('keyboard_hidden'))) {
        keyboardRus.classList.remove('keyboard_hidden');
    }
}
for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener("click", typeIn);
}
function typeIn(event) {
    if (event.target.closest('.key')) { //! LETTERS
        textArea.textContent = textArea.innerHTML + event.target.innerHTML;
        for (let i = 0; i < shiftKeys.length; i++) {
            if (shiftKeys[i].matches('.shift_focused')) {
                shiftKeys[i].classList.remove('shift_focused');
                for (let i = 0; i < keys.length; i++) {
                    keys[i].innerHTML = keys[i].innerHTML.toLowerCase();
                }
            }
        }
    } else if (event.target.closest('#spacebar')) { //! SPACEBAR
        textArea.textContent = textArea.innerHTML + ' ';
    } else if (event.target.closest('#tab')) { //! TAB
        textArea.textContent = textArea.innerHTML + '\t';
    } else if (event.target.closest('#enter')) { //! ENTER
        textArea.textContent = textArea.innerHTML + '\n';
    } else if (event.target.closest('#backspace')) { //! BACKSPACE
        textArea.textContent = textArea.innerHTML.slice(0, -1);
    } else if (event.target.closest('.caps-lock')) { //! CAPS LOCK
        for (let i = 0; i < capsLockKeys.length; i++) {
            capsLockKeys[i].classList.toggle('caps-lock_focused')
            if (capsLockKeys[i].matches('.caps-lock_focused')) {
                for (let j = 0; j < keys.length; j++) {
                    keys[j].innerHTML = keys[j].innerHTML.toUpperCase();
                }
            } else {
                for (let k = 0; k < keys.length; k++) {
                    keys[k].innerHTML = keys[k].innerHTML.toLowerCase();
                }
            }
        };
    } else if (event.target.closest('.shift')) { //! SHIFT
        for (let i = 0; i < shiftKeys.length; i++) {
            shiftKeys[i].classList.toggle('shift_focused');
            if (shiftKeys[i].matches('.shift_focused')) {
                for (let i = 0; i < keys.length; i++) {
                    keys[i].innerHTML = keys[i].innerHTML.toUpperCase();
                }
            } else {
                for (let i = 0; i < keys.length; i++) {
                    keys[i].innerHTML = keys[i].innerHTML.toLowerCase();
                }
            }
        }
    } else if (event.target.closest('#language')) { //! LANGUAGE
        if (keyboardSymbols.classList.contains('keyboard_hidden')) {
            keyboardEng.classList.toggle('keyboard_hidden');
            keyboardRus.classList.toggle('keyboard_hidden');
        } else if (!(keyboardSymbols.classList.contains('keyboard_hidden'))) {
            keyboardEng.classList.remove('keyboard_hidden');
            keyboardSymbols.classList.add('keyboard_hidden');
        }
    } else if (event.target.closest('#symbols')) { //! SYMBOLS
        if (keyboardSymbols.classList.contains('keyboard_hidden')) {
            keyboardEng.classList.add('keyboard_hidden');
            keyboardRus.classList.add('keyboard_hidden');
            keyboardSymbols.classList.remove('keyboard_hidden');
        } else if (!(keyboardSymbols.classList.contains('keyboard_hidden'))) {
            keyboardSymbols.classList.add('keyboard_hidden');
            keyboardEng.classList.remove('keyboard_hidden');
        }
    } else if (event.target.closest('.clean-button')) { //! CLEAN
        textArea.innerHTML = "";
    } else if (event.target.closest('#escape')) { //! ESCAPE
        keyboardEng.classList.add('keyboard_hidden');
        keyboardRus.classList.add('keyboard_hidden');
        keyboardSymbols.classList.add('keyboard_hidden');
    }
}









//! ==========DARK MODE==========
const darkTheme = document.querySelector('.dark-theme');
const darkModeIcon = document.querySelector('.icon-svg-dark-mode');
const darkModeGlobe = document.querySelector('.icon-svg-globe');
const wrapper = document.querySelector('.wrapper');

darkTheme.addEventListener("click", setDarkMode);
function setDarkMode() {
    for (let i = 0; i < keyboard.length; i++) {
        keyboard[i].classList.toggle('_dark');
    }
    for (let j = 0; j < keys.length; j++) {
        keys[j].classList.toggle('_dark');
    }
    for (let k = 0; k < optionKeys.length; k++) {
        optionKeys[k].classList.toggle('_dark');
    }
    textArea.classList.toggle('_dark');
    darkTheme.classList.toggle('_dark');
    darkModeIcon.classList.toggle('icon-svg-dark-mode_rotated');
    darkModeGlobe.classList.toggle('_dark');
    wrapper.classList.toggle('_dark');
}
//!=============================