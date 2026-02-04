import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

const MarketRatesWidget = () => {
  const [fiatRates, setFiatRates] = useState({ USD: '---', INR: '---', GBP: '---' });
  const [cryptoRates, setCryptoRates] = useState({ bitcoin: '---', ethereum: '---', solana: '---' });
  const [status, setStatus] = useState('Initializing...');
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

    const fetchData = async () => {
      setStatus("Fetching data...");
      try {
        // Fetch Fiat
        const fiatReq = fetch('https://api.frankfurter.app/latest?amount=1&from=CAD&to=USD,INR,GBP');
        // Fetch Crypto
        const cryptoReqUSD = fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');

        const [fiatRes, cryptoRes] = await Promise.all([fiatReq, cryptoReqUSD]);

        if (fiatRes.ok) {
            const fiatData = await fiatRes.json();
            setFiatRates({
                USD: '$' + fiatData.rates.USD.toFixed(3),
                INR: '₹' + fiatData.rates.INR.toFixed(2),
                GBP: '£' + fiatData.rates.GBP.toFixed(3)
            });
        }

        if (cryptoRes.ok) {
            const cryptoData = await cryptoRes.json();
            setCryptoRates({
                bitcoin: '$' + cryptoData.bitcoin.usd.toLocaleString(),
                ethereum: '$' + cryptoData.ethereum.usd.toLocaleString(),
                solana: '$' + cryptoData.solana.usd.toLocaleString()
            });
        }

        setStatus("Live Market Data");

      } catch (error) {
        console.error("Market Data Error:", error);
        setStatus("⚠️ Partial Data");
      }
    };

    fetchData();
    // Refresh every 60s
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="market-card" ref={containerRef}>
      <div className="market-header">
        <span className="market-title"> <Activity size={16} style={{marginRight: '8px', verticalAlign: 'text-bottom'}}/> Live Markets</span>
        <span className="market-status" style={{ color: status.includes("⚠️") ? 'red' : '#888' }}>{status}</span>
      </div>

      <div className="currency-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>

        {/* Fiat Section */}
        <div className="currency-item">
          <span className="pair-label">USD / CAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{fiatRates.USD}</span>
            <span className="trend-indicator">🇺🇸</span>
          </div>
          <span className="rate-sub">1 CAD</span>
        </div>

        <div className="currency-item">
          <span className="pair-label">INR / CAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{fiatRates.INR}</span>
            <span className="trend-indicator">🇮🇳</span>
          </div>
          <span className="rate-sub">1 CAD</span>
        </div>

        <div className="currency-item">
          <span className="pair-label">GBP / CAD</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{fiatRates.GBP}</span>
            <span className="trend-indicator">🇬🇧</span>
          </div>
          <span className="rate-sub">1 CAD</span>
        </div>

        {/* Crypto Section */}
        <div className="currency-item crypto">
          <span className="pair-label">Bitcoin</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{cryptoRates.bitcoin}</span>
          </div>
          <span className="rate-sub">USD</span>
        </div>

        <div className="currency-item crypto">
          <span className="pair-label">Ethereum</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{cryptoRates.ethereum}</span>
          </div>
          <span className="rate-sub">USD</span>
        </div>

        <div className="currency-item crypto">
          <span className="pair-label">Solana</span>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="exchange-rate">{cryptoRates.solana}</span>
          </div>
          <span className="rate-sub">USD</span>
        </div>

      </div>
    </div>
  );
};

export default MarketRatesWidget;
