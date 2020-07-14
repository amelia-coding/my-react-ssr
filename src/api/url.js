const prefix = process.env.URL_PREFIX;

const URL = {
  USER: {
    GET: prefix + "user/getUserInfo",
    ADD: prefix + "user/addUserInfo",
  },
  HOME: {},
};

export default URL;
