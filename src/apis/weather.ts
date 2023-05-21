import axios from "axios";
import moment from "moment";

type RealTimeWeatherType = {
	category: string;
	obsrValue: string;
}

type TodayWeatherType = {
	category: string;
	fcstValue: string;
	fcstDate: string;
	fcstTime: string;
}

const DATE = moment().subtract(1, 'hour');

const BASE_DATE = DATE.format('YYYYMMDD');
const BASE_TIME = DATE.format('HH');

const client = axios.create({
	baseURL: process.env.VUE_APP_SERVICE_URL,
	params: {
		serviceKey: process.env.VUE_APP_SERVICE_KEY,
		dataType: 'JSON'
	}
})

export function getRealTimeWeather() {
	return client
		.get('/getUltraSrtNcst', {
			params: {
				base_date: BASE_DATE,
				base_time: `${BASE_TIME}30`,
				nx: localStorage.getItem('lat'),
				ny: localStorage.getItem('lng'),
				numOfRows: 100
			}
		})
		.then(({data}) => data.response.body.items.item)
		.then((item) => item.reduce((items: { [key: string]: RealTimeWeatherType }, current: RealTimeWeatherType) => {
			const {category} = current;
			items[category] = {...current};
			return items;
		}, {}))
		.catch((res) => console.error(res))
	;
}

export function getCurrentWeather() {
	const base_time = moment().format('HH');
	return client
		.get('/getUltraSrtFcst', {
			params: {
				base_date: BASE_DATE,
				base_time: `${BASE_TIME}30`,
				nx: localStorage.getItem('lat'),
				ny: localStorage.getItem('lng'),
				numOfRows: 100
			}
		})
		.then(({data}) => data.response.body.items.item)
		.then((item) => item.reduce((items: { [key: string]: TodayWeatherType }, current: TodayWeatherType) => {
			const {category} = current;
			if(current.fcstTime === `${base_time}00`) {
				items[category] = {...current};
			}
			return {...items};
		}, {}))
		.catch((res) => console.error(res))
	;
}

export function getTodayWeather() {
	const { base_date, base_time } = todayReportDateTime();
	return client
		.get('/getVilageFcst', {
			params: {
				base_date,
				base_time,
				nx: localStorage.getItem('lat'),
				ny: localStorage.getItem('lng'),
				numOfRows: 500
			}
		})
		.then(({data}) => data.response.body.items.item)
		.then((item) => item.reduce((items: { [key: string]: { [key: string]: TodayWeatherType } }, current: TodayWeatherType) => {
			const {fcstDate, fcstTime, category} = current;
			if(`${fcstDate}${fcstTime}` <= moment().add(1, 'day').format(`YYYYMMDD${BASE_TIME}00`))
				items[`${fcstDate}${fcstTime}`] = {...items[`${fcstDate}${fcstTime}`], [category === 'TMP' ? 'T1H' : category]: {...current}};
			return {...items};
		}, {}))
		.catch((res) => console.error(res))
	;
}

function todayReportDateTime() {
	const hour = Number(BASE_TIME);
	const base_time = hour < 2 ? '2300' : `${(Math.floor(hour / 3) * 3 - 1).toString().padStart(2, '0')}00`;
	const base_date = hour < 2 ? DATE.subtract(1, 'day').format('YYYYMMDD') : BASE_DATE;
	return {
		base_date, base_time
	}
}