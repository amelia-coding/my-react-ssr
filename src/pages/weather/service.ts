import request from '../../api/request';
const KEY = '26be256aca2c43a7bb7f9a72e0f99a6b';

const APIs = {
  fetchCity: 'https://search.heweather.net/find?',
  fetchTemperature: 'https://free-api.heweather.net/s6/weather/forecast?',
  fetchQuality: 'https://free-api.heweather.net/s6/air/now?',
};

export async function fetchCityList(location = 'beijing'): Promise<any> {
  const res = await request({
    url: `${APIs.fetchCity}key=${KEY}&location=${location}`,
  });
  const data = res.HeWeather6[0].basic;
  return data;
}

export async function fetchTemperature(location = 'beijing'): Promise<any> {
  return await fetch(`${APIs.fetchTemperature}key=${KEY}&location=${encodeURIComponent(location)}`)
    .then((res) => res.json())
    .then((res) => {
      const data = res.HeWeather6[0];
      return data;
    });
}

export async function fetchQuality(location = 'beijing'): Promise<any> {
  return await fetch(`${APIs.fetchQuality}key=${KEY}&location=${encodeURIComponent(location)}`)
    .then((res) => res.json())
    .then((res) => {
      const data = res.HeWeather6[0].air_now_city;
      return data;
    });
}
