const axios = require("axios");

module.exports.axiosApi = (city) => {
  return new Promise((resolve, reject) => {
    const API_KEY = "23eab637186e59b5ac56c0aef6f46898";

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        //console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
