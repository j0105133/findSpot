const cityCoordinates = {
    "Seoul": { nx: 60, ny: 127 },
    "Busan": { nx: 98, ny: 76 },
    "Incheon": { nx: 55, ny: 124 },
    // 다른 도시의 좌표도 추가 가능
};

async function fetchWeatherInfo() {
    const city = document.getElementById('city').value.trim();
    if (!cityCoordinates[city]) {
        document.getElementById('result').innerText = 'City not found. Please enter a valid city name (e.g., Seoul, Busan).';
        return;
    }

    const { nx, ny } = cityCoordinates[city];
    const serviceKey = '7bm0A%2BjxL3v8E47zHKHUOlb4goUoIDAXpbNnZcjlHxw9XWDngu8OTgnVJDjMXfpN2DNwzXfb9zucjvf%2FV4GumA%3D%3D';
    const endPoint = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst';
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const params = {
        serviceKey: decodeURIComponent(serviceKey),
        numOfRows: 10,
        pageNo: 1,
        base_date: today,
        base_time: '0500',  // 05:00 AM 기준 시간으로 설정
        nx: nx,
        ny: ny,
        dataType: 'JSON'
    };
    const queryString = new URLSearchParams(params).toString();
    const url = `${endPoint}?${queryString}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('result').innerText = 'Error fetching weather information.';
    }
}
