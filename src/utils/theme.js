import getUserFromLocalStorage from './getUserFromLocalStorage';

export const light = {
  backgroundSize: 'cover',
  background: 'rgba(240,240,240,0.2)',
  zIndex: '2',
  // background:`url(${images})`,
  color: 'black',
};
export const dark = {
  background: 'rgba(0,0,0,0.85)',
  zIndex: '2',
  // backgroundImage:`url(${images1})`,
  backgroundSize: 'cover',
  color: 'white',
};

const darkMode = getUserFromLocalStorage().user.darkEnabled;
console.log('DarkMode: ', darkMode);

export const condition = darkMode;

export const mode = condition ? dark : light;
