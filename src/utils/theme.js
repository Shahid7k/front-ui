export const light = {
  backgroundSize: 'cover',
  // background:"white",
  // background:`url(${images})`,
  color: 'black',
};
export const dark = {
  background:"rgba(0,0,0,0.85)",
    // backgroundImage:`url(${images1})`,
  backgroundSize: 'cover',
  color: 'white',
};

export const condition = false;


export const mode=condition?dark:light;
