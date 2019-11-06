const PREFIX = 'swx';
const _getKey = (key) => {
  return `${PREFIX}-${key}`;
};

export default class LocalStorage {

  static getItem = (key) => {
    const item = localStorage.getItem(_getKey(key));
    if (!item) {
      return null;
    }
    try {
      const { data } = JSON.parse(item);
      return data;
    } catch (e) {
      return null;
    }
  };

  static removeItem = (key) => {
    localStorage.removeItem(_getKey(key))
  };

  static setItem = (key, data) => {
    localStorage.setItem(_getKey(key), JSON.stringify({ data: data }));
  };

  static hasItem = (key) => {
    return !!LocalStorage.getItem(key);
  }
}