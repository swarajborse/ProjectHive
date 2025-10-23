"use client";
import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords } from "@/utils/fetchWeather";

const Card3 = ({ className }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSuggestion = (temp) => {
        if (temp >= 35) return "It’s extremely hot - drink extra water!";
        if (temp >= 28) return "Stay hydrated and wear light clothes.";
        if (temp >= 20) return "Perfect weather. Keep sipping regularly.";
        if (temp >= 10) return "A bit cool - remember to hydrate still.";
        return "Cold outside - warm drinks count toward your goal!";
    };

    // This is to check if browser supports sharing location
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported.");
            setLoading(false);
            return;
        }

    // This triggers location request - the syntax is success callback, error callback

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    const data = await fetchWeatherByCoords(
                        coords.latitude,
                        coords.longitude
                    );
                    setWeather(data);
                } catch {
                    setError("Failed to fetch weather.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                setError("Location permission denied.");
                setLoading(false);
            }
        );
    }, []);

    return (
        //look at api structure to understand better
        <main className={className}>
            {loading && <p className="text-white">Loading weather...</p>}
            {error && <p className="text-red-400">{error}</p>}

            {weather && (
                <div className="text-white flex flex-col items-center">
                    <h2 className="text-lg font-semibold">{weather.name}</h2>

                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        className="size-16"
                    />

                    <p className="text-xl">
                        {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="capitalize mb-2 text-white/75">
                        {weather.weather[0].description}
                    </p>

                    <p className="text-base text-center text-blue-300 font-semibold">
                        {getSuggestion(Math.round(weather.main.temp))}
                    </p>
                </div>
            )}
        </main>
    );
};

export default Card3;
