export const getStore = (key) => {
  if (!key) {
    return false;
  }
  const data = window.localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return false;
};

export const setStore = (key, value) => {
  if (!key || !value) {
    return;
  }
  const data = JSON.stringify(value);
  window.localStorage.setItem(key, data);
};

export const removeStore = (key) => {
  if (!key) {
    return;
  }
  window.localStorage.removeItem(key);
};
