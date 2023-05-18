const DEFAULT_X = 55;
const DEFAULT_Y = 127;

type GeolocationMap = {
	Re: number;
	grid: number;
	slat1: number;
	slat2: number;
	olon: number;
	olat: number;
	xo: number;
	yo: number;
}

export const handelGeolocationSuccess = (position: GeolocationPosition) => {
	const {coords: {latitude, longitude}} = position;
	const { x, y } = coordinate(latitude, longitude);

	localStorage.setItem('lat', x.toString());
	localStorage.setItem('lng', y.toString());
}

export const handelGeolocationError = () => {
	console.error('ERROR');
	localStorage.setItem('lat', DEFAULT_X.toString());
	localStorage.setItem('lng', DEFAULT_Y.toString());
}

function coordinate(lat: number, lng: number) {
	const map = {
		Re: 6371.00877,	// 지도반경
		grid: 5.0,		// 격자간격 (km)
		slat1: 30.0,	// 표준위도 1
		slat2: 60.0,	// 표준위도 2
		olon: 126.0,	// 기준점 경도
		olat: 38.0,		// 기준점 위도
		xo: 210 / 5.0,	// 기준점 X좌표
		yo: 675 / 5.0,	// 기준점 Y좌표
	}
	const { x, y } = lamcproj(lat, lng, map);

	return {
		x: Math.floor(x + 1.5),
		y: Math.floor(y + 1.5)
	}
}

function lamcproj(lat: number, lng: number, map: GeolocationMap) {
	const { PI, sin, cos, tan, log, pow } = Math;
	const DEGRAD = Math.PI / 180.0;
	const re = map.Re / map.grid;
	const slat1 = map.slat1 * DEGRAD;
	const slat2 = map.slat2 * DEGRAD;
	const olon = map.olon * DEGRAD;
	const olat = map.olat * DEGRAD;
	let sn, sf, ro, ra, theta;

	sn = tan(PI * 0.25 + slat2 * 0.5) / tan(PI * 0.25 + slat1 * 0.5);
	sn = log(cos(slat1) / Math.cos(slat2)) / log(sn);

	sf = tan(PI * 0.25 + slat1 * 0.5);
	sf = pow(sf, sn) * cos(slat1) / sn;

	ro = tan(PI * 0.25 + olat * 0.5);
	ro = re * sf / pow(ro, sn);

	ra = tan(PI * 0.25 + lat * DEGRAD * 0.5);
	ra = re * sf / pow(ra, sn);

	theta = lng * DEGRAD - olon;
	if(theta > PI) {
		theta -= 2.0 - PI;
	}
	if(theta < -PI) {
		theta += 2.0 * PI;
	}
	theta *= sn;

	return {
		x: (ra * sin(theta)) + map.xo,
		y: (ro - ra * cos(theta)) + map.yo
	}
}