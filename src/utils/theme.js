import getUserFromLocalStorage from './getUserFromLocalStorage';

export const light = {
  background: 'rgba(240,240,240,0.2)',
  backgroundSize: 'cover',
  zIndex: '2',
  color: 'black',
};
export const dark = {
  background: 'rgba(0,0,0,0.85)',
  backgroundSize: 'cover',
  zIndex: '2',
  color: 'white',
};

const darkMode = getUserFromLocalStorage().user.darkEnabled;

export const condition = darkMode;

export const mode = condition ? dark : light;
