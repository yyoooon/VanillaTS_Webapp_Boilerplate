const storage = window.sessionStorage;

export const setItem = <T>(key:string, value:T) => {
  try {
    storage.setItem(key, JSON.stringify(value));
    console.log(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getItem = <T>(key:string, defaultValue:T) => {
  try {
    const storedValue = storage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const removeItem = (key:string) => {
  storage.removeItem(key);
};
