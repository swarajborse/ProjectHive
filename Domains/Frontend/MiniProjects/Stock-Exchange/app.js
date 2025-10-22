/**
 * FinFlow - Advanced Stock Analysis App
 * JavaScript for Interactivity and Data Visualization
 */

// --- 1. MOCK DATA SETUP ---
const MOCK_DATA = {
    marketStatus: [
        { name: "Nifty 50", value: "22,501.80", change: "+125.40", percent: "0.56%", isPositive: true },
        { name: "Sensex", value: "74,085.99", change: "-88.20", percent: "0.12%", isPositive: false },
        { name: "Bank Nifty", value: "48,510.15", change: "+410.30", percent: "0.85%", isPositive: true },
        { name: "USD/INR", value: "83.45", change: "+0.02", percent: "0.02%", isPositive: false },
    ],
    watchlist: [
        { symbol: "TCS", price: 3412.00, change: 0.70, chartData: [3400, 3405, 3412, 3410, 3415, 3420, 3412] },
        { symbol: "RELIANCE", price: 2950.50, change: -1.25, chartData: [2980, 2975, 2960, 2955, 2950, 2948, 2950], isNegative: true },
        { symbol: "HDFCBANK", price: 1530.20, change: 2.10, chartData: [1500, 1515, 1520, 1530, 1525, 1535, 1530] },
        { symbol: "INFY", price: 1475.10, change: -0.55, chartData: [1480, 1478, 1475, 1470, 1472, 1476, 1475], isNegative: true },
    ],
    holdings: [
        { symbol: "TCS", name: "Tata Consultancy Services", qty: 10, avgPrice: 3200.00, currentPrice: 3412.00, sector: "IT" },
        { symbol: "SBIN", name: "State Bank of India", qty: 25, avgPrice: 700.00, currentPrice: 755.50, sector: "Finance" },
        { symbol: "ASIANPAINT", name: "Asian Paints Ltd.", qty: 5, avgPrice: 3000.00, currentPrice: 2850.10, sector: "Chemicals" },
    ],
    movers: [
        { symbol: "BAJFINANCE", change: 5.10, isPositive: true },
        { symbol: "HCLTECH", change: 4.85, isPositive: true },
        { symbol: "SUNPHARMA", change: 4.12, isPositive: true },
        { symbol: "ULTRACEMCO", change: -3.55, isPositive: false },
        { symbol: "ADANIPORTS", change: -3.20, isPositive: false },
        { symbol: "TITAN", change: -2.90, isPositive: false },
    ],
    news: [
        "RBI holds interest rates steady; forecasts strong economic growth.",
        "Tata Motors stock surges 4% after robust Q4 earnings report.",
        "Global chip shortage concerns ease, boosting IT sector outlook.",
        "Crude oil prices drop, providing relief for airline and paint stocks.",
    ],
    tradeData: {
        'TCS': {
            symbol: 'TCS', price: 3412.00, change: 0.70, open: 3400, high: 3445, low: 3380, volume: '2.4M',
            candlestick: {
                x: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-06', '2025-01-07'],
                open: [3400, 3420, 3410, 3435, 3450], high: [3425, 3440, 3430, 3460, 3470], low: [3380, 3400, 3400, 3430, 3440], close: [3420, 3410, 3435, 3450, 3465]
            },
            indicators: { x: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-06', '2025-01-07'], rsi: [65.2, 60.5, 68.9, 72.1, 75.0] }
        },
        'RELIANCE': {
            symbol: 'RELIANCE', price: 2950.50, change: -1.25, open: 2980, high: 2990, low: 2945, volume: '1.8M',
            candlestick: {
                x: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-06', '2025-01-07'],
                open: [2980, 2960, 2970, 2955, 2940], high: [2985, 2970, 2980, 2965, 2950], low: [2950, 2950, 2960, 2940, 2930], close: [2960, 2970, 2955, 2940, 2935]
            },
            indicators: { x: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-06', '2025-01-07'], rsi: [45.2, 40.5, 38.9, 32.1, 28.0] }
        }
    }
};

// --- 2. GLOBAL STATE ---
let currentState = {
    activeScreen: 'dashboard',
    selectedStock: 'TCS' 
};

// --- 3. CORE FUNCTIONS ---

/** Utility to format currency */
const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/** Switches the active screen and updates the bottom navigation. */
function goTo(screenId, symbol = null) {
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });

    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.style.display = 'block';
        currentState.activeScreen = screenId;
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        // Use a more robust check for the correct nav item
        const onclickAttr = item.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`goTo('${screenId}')`)) {
            item.classList.add('active');
        }
    });

    if (screenId === 'trade' && symbol) {
        loadTradeScreen(symbol);
    } else if (screenId === 'trade' && !symbol) {
        loadTradeScreen(currentState.selectedStock);
    } else if (screenId === 'portfolio') {
        renderPortfolioCharts();
    } else if (screenId === 'analytics') {
        renderAnalyticsCharts();
    }
}

// --- 4. RENDER FUNCTIONS (Dashboard) ---

/** Renders the market status bar. */
function renderMarketStatus() {
    const container = document.getElementById('marketStatus');
    container.innerHTML = MOCK_DATA.marketStatus.map(item => `
        <div class="index-item">
            <span class="index-name">${item.name}</span>
            <span class="index-value">${item.value}</span>
            <span class="index-change ${item.isPositive ? 'positive' : 'negative'}">
                ${item.isPositive ? '▲' : '▼'} ${item.percent}
            </span>
        </div>
    `).join('');
}

/** Renders the watchlist carousel. */
function renderWatchlist() {
    const container = document.getElementById('watchlist');
    container.innerHTML = MOCK_DATA.watchlist.map(stock => {
        const changeClass = stock.change > 0 ? 'positive' : 'negative';
        const changeText = `${stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}%`;
        const cardClass = stock.change > 0 ? '' : 'negative';

        // Set a timeout to ensure the DOM elements are ready before plotting charts
        setTimeout(() => plotMiniChart(stock.symbol, stock.chartData, stock.change > 0 ? 'var(--success)' : 'var(--danger)'), 0);

        return `
            <div class="stock-card ${cardClass}" onclick="goTo('trade', '${stock.symbol}')">
                <div class="stock-symbol">${stock.symbol}</div>
                <div class="stock-price">${formatCurrency(stock.price)}</div>
                <div class="stock-change ${changeClass}">${changeText}</div>
                <div class="mini-chart" id="mini-chart-${stock.symbol}"></div>
            </div>
        `;
    }).join('');
}

/** Plots a simple line mini-chart for a stock. */
function plotMiniChart(symbol, data, color) {
    const chartDiv = document.getElementById(`mini-chart-${symbol}`);
    if (!chartDiv) return;

    const trace = {
        y: data,
        mode: 'lines',
        line: { color: color, width: 2 },
        fill: 'tozeroy',
        // Convert CSS variable to RGBA for Plotly fill color
        fillcolor: color.replace(')', ', 0.2)').replace('var(', 'rgba('), 
    };

    const layout = {
        margin: { l: 0, r: 0, t: 0, b: 0 }, height: 30, width: 140,
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false },
        paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', hovermode: false
    };

    Plotly.newPlot(chartDiv, [trace], layout, { displayModeBar: false });
}

/** Renders top movers. */
function renderMovers() {
    const container = document.getElementById('movers');
    container.innerHTML = MOCK_DATA.movers.slice(0, 3).map(mover => {
        const changeClass = mover.isPositive ? 'positive' : 'negative';
        const changeText = `${mover.isPositive ? '+' : ''}${mover.change.toFixed(2)}%`;
        return `
            <div class="mover-card" onclick="goTo('trade', '${mover.symbol}')">
                <div class="mover-symbol">${mover.symbol}</div>
                <div class="mover-change ${changeClass}">${changeText}</div>
            </div>
        `;
    }).join('');
}

/** Renders the market news list. */
function renderNews() {
    const container = document.getElementById('news');
    container.innerHTML = MOCK_DATA.news.map(item => `
        <div class="news-item" onclick="alert('Reading: ${item}')">
            ${item}
        </div>
    `).join('');
}

/** Renders the dashboard performance chart (Line Chart). */
function renderPerformanceChart() {
    const chartDiv = document.getElementById('performanceChart');
    const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const portfolioValue = [100000, 105000, 112000, 110500, 118000, 124832];
    const benchmark = [100000, 102000, 108000, 109000, 115000, 120500];

    const trace1 = { x: dates, y: portfolioValue, mode: 'lines', name: 'My Portfolio', line: { color: 'var(--primary)', width: 3 } };
    const trace2 = { x: dates, y: benchmark, mode: 'lines', name: 'Benchmark (Nifty)', line: { color: 'var(--text-light)', dash: 'dash', width: 2 } };

    const layout = {
        margin: { l: 40, r: 10, t: 10, b: 40 }, xaxis: { showgrid: false, zeroline: false }, yaxis: { showgrid: true, zeroline: false },
        showlegend: true, legend: { x: 0, y: 1.15, orientation: 'h' },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    };

    Plotly.newPlot(chartDiv, [trace1, trace2], layout, { displayModeBar: false });
}

// --- 5. RENDER FUNCTIONS (Trade) ---

/** Loads and renders the trade screen data for a specific stock. */
function loadTradeScreen(symbol) {
    currentState.selectedStock = symbol;
    const stockData = MOCK_DATA.tradeData[symbol] || MOCK_DATA.tradeData['TCS'];
    const isPositive = stockData.change > 0;
    const changeClass = isPositive ? 'text-success' : 'text-danger';
    const changeText = `${isPositive ? '+' : ''}${stockData.change.toFixed(2)}%`;

    document.getElementById('tradeSymbol').textContent = stockData.symbol;
    document.getElementById('tradePrice').innerHTML = `${formatCurrency(stockData.price)} <span class="${changeClass}" style="font-size:16px" id="tradePriceChange">${changeText}</span>`;

    // Update stock details
    document.querySelector('#screen-trade .stats-grid .stat-card:nth-child(1) .stat-value').textContent = formatCurrency(stockData.open);
    document.querySelector('#screen-trade .stats-grid .stat-card:nth-child(2) .stat-value').textContent = formatCurrency(stockData.high);
    document.querySelector('#screen-trade .stats-grid .stat-card:nth-child(3) .stat-value').textContent = formatCurrency(stockData.low);
    document.querySelector('#screen-trade .stats-grid .stat-card:nth-child(4) .stat-value').textContent = stockData.volume;

    changeTimeframe('1D'); // Render the default '1D' chart
}

/** Renders the Candlestick and Indicator charts. */
function plotTradeCharts(data) {
    const chartDiv = document.getElementById('chart1');
    const indicatorsDiv = document.getElementById('indicatorsChart');

    // 1. Candlestick Chart
    const traceCandle = {
        x: data.candlestick.x, open: data.candlestick.open, high: data.candlestick.high,
        low: data.candlestick.low, close: data.candlestick.close, type: 'candlestick',
        name: 'Price', 
        increasing: { line: { color: 'var(--success)' }, fillcolor: 'var(--success)' },
        decreasing: { line: { color: 'var(--danger)' }, fillcolor: 'var(--danger)' }
    };

    const layoutCandle = {
        margin: { l: 40, r: 10, t: 10, b: 20 }, height: 320,
        xaxis: { showgrid: false, zeroline: false, rangeslider: { visible: false } }, yaxis: { showgrid: true, zeroline: false },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }, hovermode: 'x unified',
    };

    Plotly.newPlot(chartDiv, [traceCandle], layoutCandle, { displayModeBar: false });

    // 2. RSI Indicator Chart
    const traceRSI = {
        x: data.indicators.x, y: data.indicators.rsi, mode: 'lines', name: 'RSI (14)',
        line: { color: 'var(--primary)', width: 2 },
    };

    const layoutRSI = {
        margin: { l: 40, r: 10, t: 10, b: 40 }, height: 200,
        xaxis: { showgrid: false, zeroline: false }, yaxis: { showgrid: true, zeroline: false, range: [20, 80], title: 'RSI' },
        shapes: [ 
            // Overbought line (70)
            { type: 'line', xref: 'paper', yref: 'y', x0: 0, y0: 70, x1: 1, y1: 70, line: { color: 'var(--danger)', width: 1, dash: 'dot' } },
            // Oversold line (30)
            { type: 'line', xref: 'paper', yref: 'y', x0: 0, y0: 30, x1: 1, y1: 30, line: { color: 'var(--success)', width: 1, dash: 'dot' } }
        ],
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    };

    Plotly.newPlot(indicatorsDiv, [traceRSI], layoutRSI, { displayModeBar: false });
}


/** Changes the active timeframe for the trade chart. */
function changeTimeframe(timeframe) {
    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    // Find the correct button using its text content or attribute
    const activeTab = Array.from(document.querySelectorAll('.chart-tab')).find(tab => tab.textContent.trim() === timeframe);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    const stockData = MOCK_DATA.tradeData[currentState.selectedStock] || MOCK_DATA.tradeData['TCS'];
    plotTradeCharts(stockData); // Chart plotting uses the same mock data regardless of timeframe for this example
}

// --- 6. RENDER FUNCTIONS (Portfolio) ---

/** Renders the list of user holdings. */
function renderHoldings() {
    const container = document.getElementById('holdings');
    container.innerHTML = MOCK_DATA.holdings.map(holding => {
        const value = holding.currentPrice * holding.qty;
        const invested = holding.avgPrice * holding.qty;
        const pnl = value - invested;
        const pnlPercent = (pnl / invested) * 100;
        const pnlClass = pnl > 0 ? 'text-success' : 'text-danger';
        const pnlText = `${pnl > 0 ? '+' : ''}${formatCurrency(pnl)} (${pnlPercent.toFixed(2)}%)`;

        return `
            <div class="holding-item" onclick="goTo('trade', '${holding.symbol}')">
                <div class="holding-info">
                    <div class="holding-name">${holding.symbol} - ${holding.name}</div>
                    <div class="holding-qty">${holding.qty} Shares @ ${formatCurrency(holding.avgPrice)}</div>
                </div>
                <div class="holding-values">
                    <div class="holding-value">${formatCurrency(value)}</div>
                    <div class="holding-pnl ${pnlClass}">${pnlText}</div>
                </div>
            </div>
        `;
    }).join('');
}

/** Renders the Portfolio and Sector Allocation charts. */
function renderPortfolioCharts() {
    let totalPortfolioValue = 0;
    const allocationData = MOCK_DATA.holdings.map(h => {
        const value = h.currentPrice * h.qty;
        totalPortfolioValue += value;
        return { symbol: h.symbol, value, sector: h.sector };
    });

    // 1. Asset Allocation (Donut/Pie Chart)
    const portfolioChartDiv = document.getElementById('portfolio-chart');
    const assetLabels = allocationData.map(d => d.symbol);
    const assetValues = allocationData.map(d => d.value);

    const traceAsset = {
        labels: assetLabels, values: assetValues, type: 'pie', hole: .4,
        marker: { colors: ['#5367FF', '#00C48C', '#FF4B55', '#FFC107', '#9C27B0'] }
    };

    Plotly.newPlot(portfolioChartDiv, [traceAsset], {
        margin: { t: 20, b: 20, l: 20, r: 20 }, showlegend: true, paper_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    }, { displayModeBar: false });

    // 2. Sector Distribution (Bar Chart)
    const sectorChartDiv = document.getElementById('sector-chart');
    const sectorMap = allocationData.reduce((acc, curr) => {
        acc[curr.sector] = (acc[curr.sector] || 0) + curr.value;
        return acc;
    }, {});

    const sectorLabels = Object.keys(sectorMap);
    const sectorValues = Object.values(sectorMap);

    const traceSector = { x: sectorLabels, y: sectorValues, type: 'bar', marker: { color: 'var(--primary)' } };

    Plotly.newPlot(sectorChartDiv, [traceSector], {
        margin: { t: 20, b: 40, l: 40, r: 10 }, xaxis: { automargin: true }, yaxis: { title: 'Value (₹)' },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    }, { displayModeBar: false });
}

// --- 7. RENDER FUNCTIONS (Analytics) ---

/** Renders the Analytics screen charts. */
function renderAnalyticsCharts() {
    // 1. Portfolio Growth (Area Chart)
    const growthChartDiv = document.getElementById('growthChart');
    const dates = ['2024-01', '2024-03', '2024-05', '2024-07', '2024-09', '2024-11'];
    const growthData = [95000, 105000, 115000, 110000, 120000, 124832];

    const traceGrowth = {
        x: dates, y: growthData, mode: 'lines', fill: 'tozeroy', name: 'Portfolio Value',
        line: { color: 'var(--primary)', width: 2 }, fillcolor: 'rgba(83,103,255,0.2)',
        hovertemplate: '<b>%{x}</b><br>Value: %{y:$,.0f}<extra></extra>'
    };

    Plotly.newPlot(growthChartDiv, [traceGrowth], {
        margin: { l: 40, r: 10, t: 10, b: 40 }, height: 260,
        xaxis: { showgrid: false, zeroline: false }, yaxis: { showgrid: true, zeroline: false, tickprefix: '₹' },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    }, { displayModeBar: false });

    // 2. Monthly Returns (Bar Chart)
    const returnsChartDiv = document.getElementById('returnsChart');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const returns = [2.5, 4.1, -1.5, 0.8, 3.2, 1.1]; 

    const traceReturns = {
        x: months, y: returns, type: 'bar',
        marker: { color: returns.map(r => r > 0 ? 'var(--success)' : 'var(--danger)') },
        hovertemplate: '<b>%{x}</b><br>Return: %{y:.2f}%<extra></extra>'
    };

    Plotly.newPlot(returnsChartDiv, [traceReturns], {
        margin: { l: 40, r: 10, t: 10, b: 40 }, height: 240,
        xaxis: { automargin: true }, yaxis: { title: 'Return (%)' },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    }, { displayModeBar: false });

    // 3. Risk Analysis (Bar Chart)
    const riskChartDiv = document.getElementById('riskChart');
    const riskMetrics = ['Volatility', 'Sharpe Ratio', 'Beta', 'Max Drawdown'];
    const metricValues = [15.2, 1.25, 1.1, -8.5]; 

    const traceRisk = {
        x: riskMetrics, y: metricValues, type: 'bar', name: 'Risk Metrics',
        marker: { color: ['var(--danger)', 'var(--success)', 'var(--danger)', 'var(--danger)'] }
    };

    Plotly.newPlot(riskChartDiv, [traceRisk], {
        margin: { l: 40, r: 10, t: 10, b: 40 }, height: 240,
        xaxis: { automargin: true }, yaxis: { title: 'Value' },
        paper_bgcolor: 'var(--card)', plot_bgcolor: 'var(--card)', font: { family: 'Inter', color: 'var(--text)' }
    }, { displayModeBar: false });
}

// --- 8. INTERACTIVE LOGIC (Modals & Actions) ---

/** Shows the generic modal. */
function showModal() {
    document.getElementById('searchModal').classList.add('active');
    document.getElementById('searchInput').focus();
}

/** Hides the generic modal. */
function hideModal() {
    document.getElementById('searchModal').classList.remove('active');
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

/** Simple stock search function. */
function searchStocks() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    if (input.length < 2) return;

    // Aggregate all unique symbols from mock data
    const allSymbols = [
        ...MOCK_DATA.watchlist, ...MOCK_DATA.holdings,
        ...MOCK_DATA.movers.map(m => ({ symbol: m.symbol })),
        ...Object.values(MOCK_DATA.tradeData)
    ].filter((v, i, a) => a.findIndex(t => t.symbol === v.symbol) === i); 

    const filtered = allSymbols.filter(stock => stock.symbol.includes(input));

    if (filtered.length === 0) {
        resultsDiv.innerHTML = '<div style="padding:10px; color:var(--text-light);">No results found.</div>';
        return;
    }

    resultsDiv.innerHTML = filtered.map(stock => `
        <div class="holding-item" style="margin-top:10px" onclick="hideModal(); goTo('trade', '${stock.symbol}')">
            <div class="holding-info">
                <div class="holding-name">${stock.symbol}</div>
                <div class="holding-qty">${stock.name || 'Equity'}</div>
            </div>
            <div class="holding-values">
                <div class="holding-value">View Chart</div>
            </div>
        </div>
    `).join('');
}

/** Shows the Top Movers modal. */
function showMoversModal() {
    document.getElementById('moversModal').classList.add('active');
    const container = document.getElementById('allMovers');
    container.innerHTML = MOCK_DATA.movers.map(mover => {
        const changeClass = mover.isPositive ? 'positive' : 'negative';
        const changeText = `${mover.isPositive ? '+' : ''}${mover.change.toFixed(2)}%`;
        return `
            <div class="mover-card" onclick="hideMoversModal(); goTo('trade', '${mover.symbol}')">
                <div class="mover-symbol">${mover.symbol}</div>
                <div class="mover-change ${changeClass}">${changeText}</div>
            </div>
        `;
    }).join('');
}

/** Hides the Top Movers modal. */
function hideMoversModal() {
    document.getElementById('moversModal').classList.remove('active');
}

/** Simulates placing a buy/sell order. */
function place(type) {
    const qtyInput = document.getElementById('qty');
    const qty = qtyInput.value;
    const symbol = currentState.selectedStock;

    if (qty <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    if (confirm(`Confirm ${type.toUpperCase()} ${qty} shares of ${symbol}?`)) {
        alert(`${type.toUpperCase()} order placed successfully for ${qty} shares of ${symbol}!`);
        qtyInput.value = 1; 
    }
}


// --- 9. INITIALIZATION ---

/** Runs on page load to initialize the app. */
function init() {
    renderMarketStatus();
    renderWatchlist();
    renderPerformanceChart();
    renderMovers();
    renderNews();
    renderHoldings(); 
    loadTradeScreen('TCS'); // Load trade data initially for TCS
    // Go to dashboard to ensure correct display, nav, and chart visibility
    goTo('dashboard');
}

// Initial application load
window.onload = init;