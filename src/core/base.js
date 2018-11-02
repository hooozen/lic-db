function createStore(db, storeNames) {
}

function getStore(storeName) {
  if (this.stores[storeName]) return this.stores[storeName];
  const store = this.base.transcation[storeName, 'readwrite'].objectStore(storeName);
  this.stores[storeName] = store;
  return store;
}

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
  constructor() {
    this.DBFactory = undefined;
    this.connects = {};
    this.init();
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

  /**
   * 
   * @param {String} DBName 数据库名
   * @param {[String]} stores objectStores
   */
  createDB(DBName, stores) {
    console.log("TODO", DBName, stores);
  }

  /**
   * 获取数据库连接
   * @param {String} DBName 数据库名称
   * @param {[String]} stores 要新建的 object store
   */
  getConnect(DBName, storeName) {
    return new Promise((resolve, reject) => {
      if (this.connects[DBName]) {
        resolve(this.connects[DBName]);
      }
      const openDBRequset = this.DBFactory.open(DBName);
      openDBRequset.onsuccess = () => {
        this.connects[DBName] = {
          base: openDBRequset.result,
          stores: {},
          getStore,
        };
        resolve(openDBRequset.result);
      };
      openDBRequset.onerror = () => {
        reject(openDBRequset.error);
      }
      openDBRequset.onupgradeneeded = () => {
        storeName = [].concat(storeName);
        storeName.forEach(s => {
          openDBRequset.result.createObjectStore(s);
        });
      }
    });
  }
}

export default DB;
