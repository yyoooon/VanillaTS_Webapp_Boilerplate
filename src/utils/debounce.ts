let time: NodeJS.Timeout | null = null;

const debounce = (callback: () => void, delay: number) => {
  if (time) clearTimeout(time);
  time = setTimeout(callback, delay);
};

export default debounce;
