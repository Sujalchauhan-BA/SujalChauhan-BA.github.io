import { useState, useEffect, useRef } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, CloudLightning } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ temp: '--', condition: 'Loading...', code: null });
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=43.70&longitude=-79.42&current=temperature_2m,weather_code&timezone=America%2FToronto'
        );
        const data = await response.json();

        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code
          });
        }
      } catch (error) {
        console.error("Weather data fetch error:", error);
        setWeather(prev => ({ ...prev, condition: 'Unavailable' }));
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const getWeatherIcon = (code) => {
    if (code === null) return <Cloud size={32} color="#888" />;
    if (code === 0) return <Sun size={32} color="#f59e0b" />;
    if (code >= 1 && code <= 3) return <Cloud size={32} color="#64748b" />;
    if (code >= 45 && code <= 48) return <CloudFog size={32} color="#94a3b8" />;
    if (code >= 51 && code <= 67) return <CloudRain size={32} color="#3b82f6" />;
    if (code >= 71 && code <= 77) return <CloudSnow size={32} color="#cbd5e1" />;
    if (code >= 80 && code <= 82) return <CloudRain size={32} color="#3b82f6" />;
    if (code >= 95) return <CloudLightning size={32} color="#eab308" />;
    return <Cloud size={32} color="#64748b" />;
  };

  const getWeatherLabel = (code) => {
    if (code === null) return '--';
    if (code === 0) return 'Clear Sky';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 95) return 'Stormy';
    return 'Cloudy';
  };

  return (
    <div className="market-card" ref={containerRef} style={{ marginBottom: '20px', marginTop: '0' }}>
      <div className="market-header">
        <span className="market-title">
            <Cloud size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/>
            Toronto Weather
        </span>
        <span className="market-status">Live</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
            background: 'rgba(0,0,0,0.03)',
            padding: '15px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {getWeatherIcon(weather.code)}
        </div>

        <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--widget-text)', lineHeight: '1' }}>
                {weather.temp}°C
            </div>
            <div style={{ fontSize: '1rem', color: '#666', marginTop: '5px' }}>
                {getWeatherLabel(weather.code)}
            </div>
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right', color: '#888', fontSize: '0.8rem' }}>
            <div style={{ marginBottom: '4px' }}>Location</div>
            <strong style={{ color: '#444' }}>Toronto, ON</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
