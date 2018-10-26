
function _get(storeName, id) {
  return new Promise((resolve, reject) => {
    var req = this.stores[storeName].get(id);
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = reject;
  });
}

class DB {
  constructor(name, version) {
    this.DBName = name;
    this.DBVersion = version;
    this.DBFactory = undefined;
    this.connects = [];
  } 

  /**
   * 获取浏览器 IDBFactory 对象，浏览器不支持则抛出错误
   */
  init() {
    const indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      throw new Error('不支持的浏览器');
    } else {
      this.DBFactory = indexedDB;
    }
  }

  getConnect() {
    const openDBRequset = this.DBFactory.open(this.DBName, this.DBVersion);
    openDBRequset.onsuccess = {
    }
  }

  get()
}

