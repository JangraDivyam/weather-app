const API_KEY = 'cba21d49f5d0f018b99e8ce36967db33'; // ← replace this

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const card  = document.getElementById('weatherCard');
  const error = document.getElementById('error');
  card.style.display  = 'none';
  error.style.display = 'none';

  try {
    const res  = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    document.getElementById('cityName').textContent    = `${data.name}, ${data.sys.country}`;
    document.getElementById('date').textContent        = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    document.getElementById('temp').textContent        = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent   = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent    = `${data.main.humidity}%`;
    document.getElementById('wind').textContent        = `${Math.round(data.wind.speed * 3.6)} km/h`;
    document.getElementById('visibility').textContent  = `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('weatherIcon').src         = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    card.style.display = 'block';
  } catch {
    error.style.display = 'block';
  }
}

// Search on Enter key
document.getElementById('cityInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') getWeather();
});