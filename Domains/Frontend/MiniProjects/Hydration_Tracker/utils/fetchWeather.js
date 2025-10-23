export async function fetchWeatherByCoords(lat, lon) {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch weather");
    }

    return res.json();
}
