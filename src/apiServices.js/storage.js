
//import { EncryptStorage } from "encrypt-storage";

// const STORAGE_KEY = "@ibztool";

// const getStorageKey = (key) => {
//   return `${STORAGE_KEY}:${key}`;
// };

const storeData = async (key, value) => {
  try {
    await localStorage.setItem(key, value.toString());
  } catch (e) {
    // saving error
  }
};

const storeJsonData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    // console.log('jsonValue', jsonValue);
    await localStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async (key) => {
  try {
    const value = await localStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
  }
};



const getJsonData = async (key) => {
  try {
    const jsonValue = await localStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const deleteData = async (key) => {
  try {
    await localStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};

const clearAll = async () => {
  try {
    await localStorage.clear();
    console.log("clearAll()");
  } catch (e) {
    // error reading value
  }
};

 const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};


//checks the jwt token
 const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('homerentuser')) {
        return JSON.parse(localStorage.getItem('homerentuser'));
    } else {
        return false;
    }
};

const storage = {
  storeData: storeData,
  storeJsonData: storeJsonData,
  getData: getData,
  isAuthenticated:isAuthenticated,
  authenticate:authenticate,
  getJsonData: getJsonData,
  deleteData: deleteData,
  clearAll: clearAll
};

export default storage;
