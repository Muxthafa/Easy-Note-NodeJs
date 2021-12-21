const redis = require("redis");

var client;
class RedisHelper {
  constructor() {
    client = redis.createClient();
  }
  getUser = async (key) => {
    try {
      await client.connect();
      const res = await client.get(key);
      return res;
    } catch (error) {
      throw error;
    }
  };
  setUser = async (key, value) => {
    try {
      return await client.set(key, value);
    } catch (error) {
      throw error;
    }
  };
  closeConnection = async () => {
    await client.disconnect();
  };
}
module.exports = new RedisHelper();