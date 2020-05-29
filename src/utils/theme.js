export const light = {
  backgroundSize: 'cover',
  background:"rgb(240,240,240)",
  // background:`url(${images})`,
  color: 'black',
};
export const dark = {
  background: 'rgba(0,0,0,0.85)',
  // backgroundImage:`url(${images1})`,
  backgroundSize: 'cover',
  color: 'white',
};

export const condition = !true;

export const mode = condition ? dark : light;
