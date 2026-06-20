// --- Asset Classes Definition (Indian Focus) ---
const DEFAULT_ASSETS = [
    { id: 'nifty-large', name: 'Nifty 50 Index Fund (Large Cap)', return: 12.0, volatility: 15.0, category: 'equity', color: '#3b82f6' },
    { id: 'nifty-mid', name: 'Nifty Midcap 150 Index Fund', return: 15.0, volatility: 18.5, category: 'equity', color: '#1d4ed8' },
    { id: 'nifty-small', name: 'Nifty Smallcap 250 Index Fund', return: 17.5, volatility: 22.5, category: 'equity', color: '#1e3a8a' },
    { id: 'debt-short', name: 'Short Term Debt Fund', return: 6.5, volatility: 3.2, category: 'debt', color: '#94a3b8' },
    { id: 'debt-medium', name: 'Medium Term Corporate Bond Fund', return: 7.2, volatility: 4.8, category: 'debt', color: '#64748b' },
    { id: 'debt-gilt', name: 'Government Gilt Fund (Long Term)', return: 7.6, volatility: 6.2, category: 'debt', color: '#475569' },
    { id: 'sp500-inr', name: 'S&P 500 Index Fund (INR-Hedg)', return: 13.5, volatility: 16.0, category: 'international', color: '#7c3aed' },
    { id: 'nasdaq-inr', name: 'Nasdaq 100 Index Fund (INR-Hedg)', return: 15.5, volatility: 19.5, category: 'international', color: '#5b21b6' },
    { id: 'gold-etf', name: 'Gold ETF / Sovereign Gold', return: 10.0, volatility: 11.5, category: 'commodity', color: '#b45309' }
];

// --- Default Correlation Matrix ---
// Defined as a symmetric lookup table between assets.
// These are realistic historical correlations for the Indian market context.
const DEFAULT_CORRELATION = {
    'nifty-large': { 'nifty-large': 1.0, 'nifty-mid': 0.85, 'nifty-small': 0.76, 'debt-short': 0.12, 'debt-medium': 0.15, 'debt-gilt': 0.08, 'sp500-inr': 0.42, 'nasdaq-inr': 0.45, 'gold-etf': -0.05 },
    'nifty-mid': { 'nifty-large': 0.85, 'nifty-mid': 1.0, 'nifty-small': 0.88, 'debt-short': 0.10, 'debt-medium': 0.12, 'debt-gilt': 0.05, 'sp500-inr': 0.38, 'nasdaq-inr': 0.42, 'gold-etf': -0.08 },
    'nifty-small': { 'nifty-large': 0.76, 'nifty-mid': 0.88, 'nifty-small': 1.0, 'debt-short': 0.08, 'debt-medium': 0.10, 'debt-gilt': 0.02, 'sp500-inr': 0.32, 'nasdaq-inr': 0.38, 'gold-etf': -0.10 },
    'debt-short': { 'nifty-large': 0.12, 'nifty-mid': 0.10, 'nifty-small': 0.08, 'debt-short': 1.0, 'debt-medium': 0.78, 'debt-gilt': 0.62, 'sp500-inr': 0.05, 'nasdaq-inr': 0.02, 'gold-etf': 0.15 },
    'debt-medium': { 'nifty-large': 0.15, 'nifty-mid': 0.12, 'nifty-small': 0.10, 'debt-short': 0.78, 'debt-medium': 1.0, 'debt-gilt': 0.82, 'sp500-inr': 0.08, 'nasdaq-inr': 0.05, 'gold-etf': 0.12 },
    'debt-gilt': { 'nifty-large': 0.08, 'nifty-mid': 0.05, 'nifty-small': 0.02, 'debt-short': 0.62, 'debt-medium': 0.82, 'debt-gilt': 1.0, 'sp500-inr': 0.03, 'nasdaq-inr': -0.02, 'gold-etf': 0.18 },
    'sp500-inr': { 'nifty-large': 0.42, 'nifty-mid': 0.38, 'nifty-small': 0.32, 'debt-short': 0.05, 'debt-medium': 0.08, 'debt-gilt': 0.03, 'sp500-inr': 1.0, 'nasdaq-inr': 0.88, 'gold-etf': 0.08 },
    'nasdaq-inr': { 'nifty-large': 0.45, 'nifty-mid': 0.42, 'nifty-small': 0.38, 'debt-short': 0.02, 'debt-medium': 0.05, 'debt-gilt': -0.02, 'sp500-inr': 0.88, 'nasdaq-inr': 1.0, 'gold-etf': 0.05 },
    'gold-etf': { 'nifty-large': -0.05, 'nifty-mid': -0.08, 'nifty-small': -0.10, 'debt-short': 0.15, 'debt-medium': 0.12, 'debt-gilt': 0.18, 'sp500-inr': 0.08, 'nasdaq-inr': 0.05, 'gold-etf': 1.0 }
};

// --- Portfolio Presets Definition ---
const PRESETS = {
    balanced: {
        'nifty-large': 30,
        'nifty-mid': 15,
        'debt-medium': 20,
        'debt-gilt': 15,
        'sp500-inr': 10,
        'gold-etf': 10
    },
    aggressive: {
        'nifty-large': 30,
        'nifty-mid': 25,
        'nifty-small': 20,
        'nasdaq-inr': 15,
        'gold-etf': 5,
        'debt-medium': 5
    },
    conservative: {
        'nifty-large': 15,
        'debt-short': 35,
        'debt-medium': 25,
        'debt-gilt': 15,
        'gold-etf': 10
    },
    'all-weather': {
        'nifty-large': 25,
        'sp500-inr': 10,
        'debt-gilt': 30,
        'debt-medium': 15,
        'gold-etf': 20
    }
};

// --- Historical Annual Returns (2016-2025) for Backtesting ---
// These approximate the historical index returns in India + currency-hedged US index fund returns.
const HISTORICAL_YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const HISTORICAL_RETURNS = {
    'nifty-large': [4.4, 30.3, 4.6, 13.5, 16.1, 25.6, 5.7, 21.3, 20.1, 12.5],
    'nifty-mid': [6.5, 41.2, -12.4, -1.2, 24.5, 46.2, 3.1, 43.6, 36.4, 16.2],
    'nifty-small': [2.1, 55.4, -26.1, -8.5, 31.2, 58.7, -2.8, 48.9, 39.5, 18.0],
    'debt-short': [8.2, 6.8, 6.2, 7.5, 7.8, 4.5, 5.1, 6.8, 7.2, 6.9],
    'debt-medium': [9.1, 7.2, 6.0, 8.5, 8.9, 4.1, 4.8, 7.1, 7.6, 7.2],
    'debt-gilt': [12.4, 4.5, 5.8, 10.2, 11.5, 3.2, 3.5, 7.5, 8.2, 7.5],
    'sp500-inr': [14.5, 18.2, 8.6, 32.5, 22.1, 26.5, -12.5, 26.2, 28.5, 18.5],
    'nasdaq-inr': [16.2, 23.4, 4.2, 38.1, 48.5, 28.2, -28.4, 54.8, 32.2, 22.4],
    'gold-etf': [11.2, 5.1, 8.5, 23.8, 28.0, -4.2, 14.2, 13.5, 18.5, 12.0]
};

// --- Application State ---
let assets = [...DEFAULT_ASSETS];
let correlation = JSON.parse(JSON.stringify(DEFAULT_CORRELATION));
let activeAssetIds = ['nifty-large', 'nifty-mid', 'debt-medium', 'debt-gilt', 'sp500-inr', 'gold-etf'];
let customWeights = {};
let maxSharpePortfolio = null;
let minVolPortfolio = null;

// Chart Instances
let frontierChart = null;
let allocationChart = null;
let backtestChart = null;

// --- Initialize Application ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial configuration
    initializeUI();
    loadPreset('balanced');
    runOptimization();
    
    // 2. Setup event listeners
    document.getElementById('preset-select').addEventListener('change', handlePresetChange);
    document.getElementById('rf-rate').addEventListener('input', updateRfRate);
    document.getElementById('sim-count').addEventListener('input', updateSimCount);
    document.getElementById('run-sim-btn').addEventListener('click', runOptimization);
    document.getElementById('rebalance-btn').addEventListener('click', autoBalanceCustomWeights);
    
    // Tabs for allocation chart
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateAllocationChart(e.target.dataset.portfolio);
        });
    });

    // Modal Events
    const addAssetModal = document.getElementById('add-asset-modal');
    document.getElementById('add-asset-btn').addEventListener('click', () => addAssetModal.classList.add('active'));
    document.getElementById('close-modal-btn').addEventListener('click', () => addAssetModal.classList.remove('active'));
    document.getElementById('cancel-modal-btn').addEventListener('click', () => addAssetModal.classList.remove('active'));
    document.getElementById('add-asset-form').addEventListener('submit', handleAddCustomAsset);

    // Live clock
    setInterval(() => {
        const timeSpan = document.getElementById('current-time');
        const now = new Date();
        timeSpan.textContent = now.toTimeString().split(' ')[0];
    }, 1000);
});

// --- UI Construction ---
function initializeUI() {
    renderAssetsChecklist();
    renderSliders();
    renderCorrelationMatrix();
}

function renderAssetsChecklist() {
    const container = document.getElementById('assets-checklist');
    container.innerHTML = '';
    
    assets.forEach(asset => {
        const isChecked = activeAssetIds.includes(asset.id);
        const item = document.createElement('div');
        item.className = 'asset-check-item';
        
        // Disable removal for default assets
        const isDefault = DEFAULT_ASSETS.some(d => d.id === asset.id);
        const deleteBtnHtml = isDefault ? '' : `
            <button class="remove-asset-btn" data-id="${asset.id}" title="Remove Asset">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;

        item.innerHTML = `
            <div class="asset-info" data-id="${asset.id}">
                <input type="checkbox" class="asset-checkbox" ${isChecked ? 'checked' : ''} data-id="${asset.id}">
                <span class="asset-label">${asset.name}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="asset-type-badge badge-${asset.category}">${asset.category}</span>
                ${deleteBtnHtml}
            </div>
        `;
        
        container.appendChild(item);
    });

    // Add checkbox toggle event
    const checkboxes = container.querySelectorAll('.asset-checkbox');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', handleAssetToggle);
    });

    // Add delete event
    const deleteBtns = container.querySelectorAll('.remove-asset-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const assetId = btn.dataset.id;
            removeCustomAsset(assetId);
        });
    });
}

function renderSliders() {
    const container = document.getElementById('sliders-container');
    container.innerHTML = '';
    
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    
    activeAssets.forEach(asset => {
        const weight = customWeights[asset.id] || 0;
        const card = document.createElement('div');
        card.className = 'slider-card';
        card.innerHTML = `
            <div class="slider-card-header">
                <span class="slider-card-title">${asset.name}</span>
                <span class="slider-card-value" id="val-${asset.id}">${weight}%</span>
            </div>
            <input type="range" class="slider asset-weight-slider" data-id="${asset.id}" min="0" max="100" value="${weight}">
            <div class="slider-details">
                <span>Exp. Return: ${asset.return}%</span>
                <span>Volatility: ${asset.volatility}%</span>
            </div>
        `;
        container.appendChild(card);
    });

    // Add slider input events
    const sliders = container.querySelectorAll('.asset-weight-slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', handleWeightSliderChange);
    });
}

function renderCorrelationMatrix() {
    const container = document.getElementById('correlation-matrix-container');
    container.innerHTML = '';

    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    const size = activeAssets.length;
    
    // Set grid layout dynamically
    container.style.gridTemplateColumns = `repeat(${size + 1}, minmax(40px, auto))`;

    // Row 0 Header: Empty corner cell followed by asset shortcodes
    const corner = document.createElement('div');
    corner.className = 'matrix-header-cell';
    corner.innerHTML = '<i class="fa-solid fa-right-left" style="transform: rotate(45deg); opacity: 0.3;"></i>';
    container.appendChild(corner);

    activeAssets.forEach((asset, idx) => {
        const header = document.createElement('div');
        header.className = 'matrix-header-cell';
        const label = asset.name.split(' ')[0].substring(0, 4).toUpperCase();
        header.textContent = label;
        header.title = asset.name;
        container.appendChild(header);
    });

    // Render cells
    activeAssets.forEach((rowAsset, rIdx) => {
        // Row header label
        const rowHeader = document.createElement('div');
        rowHeader.className = 'matrix-header-cell';
        const label = rowAsset.name.split(' ')[0].substring(0, 4).toUpperCase();
        rowHeader.textContent = label;
        rowHeader.title = rowAsset.name;
        container.appendChild(rowHeader);

        activeAssets.forEach((colAsset, cIdx) => {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-input-cell';
            input.step = '0.05';
            input.min = '-1';
            input.max = '1';
            
            // Check diagonal or symmetric cells
            if (rIdx === cIdx) {
                input.value = '1.0';
                input.disabled = true;
                input.classList.add('diagonal');
            } else {
                const val = correlation[rowAsset.id]?.[colAsset.id] ?? 0;
                input.value = val.toFixed(2);
                input.addEventListener('change', (e) => {
                    handleCorrelationChange(rowAsset.id, colAsset.id, parseFloat(e.target.value));
                });
            }
            container.appendChild(input);
        });
    });
}

// --- Handler Functions ---
function handlePresetChange(e) {
    const presetName = e.target.value;
    if (presetName !== 'custom') {
        loadPreset(presetName);
        runOptimization();
    }
}

function loadPreset(presetName) {
    const preset = PRESETS[presetName];
    if (!preset) return;

    // Set active assets
    activeAssetIds = Object.keys(preset);
    
    // Set custom weights
    customWeights = {};
    assets.forEach(asset => {
        customWeights[asset.id] = preset[asset.id] || 0;
    });

    // Synchronize UI elements
    document.getElementById('preset-select').value = presetName;
    initializeUI();
    validateWeights();
}

function handleAssetToggle(e) {
    const assetId = e.target.dataset.id;
    const isChecked = e.target.checked;
    
    if (isChecked) {
        if (!activeAssetIds.includes(assetId)) {
            activeAssetIds.push(assetId);
        }
    } else {
        // Prevent disabling all assets
        if (activeAssetIds.length <= 2) {
            e.target.checked = true;
            alert("At least 2 asset classes must remain active for portfolio optimization.");
            return;
        }
        activeAssetIds = activeAssetIds.filter(id => id !== assetId);
    }
    
    // Set presets select to Custom
    document.getElementById('preset-select').value = 'custom';
    
    // Rebalance custom weights to accommodate new changes
    autoBalanceCustomWeights();
    
    // Refresh interfaces
    initializeUI();
    runOptimization();
}

function handleWeightSliderChange(e) {
    const assetId = e.target.dataset.id;
    const weight = parseInt(e.target.value);
    
    customWeights[assetId] = weight;
    document.getElementById(`val-${assetId}`).textContent = `${weight}%`;
    document.getElementById('preset-select').value = 'custom';
    
    validateWeights();
    updateCustomPortfolioKPI();
}

function handleCorrelationChange(assetId1, assetId2, value) {
    // Restrict values
    if (isNaN(value)) value = 0;
    if (value > 1.0) value = 1.0;
    if (value < -1.0) value = -1.0;

    // Symmetric updates
    if (!correlation[assetId1]) correlation[assetId1] = {};
    if (!correlation[assetId2]) correlation[assetId2] = {};
    
    correlation[assetId1][assetId2] = value;
    correlation[assetId2][assetId1] = value;
    
    renderCorrelationMatrix();
    runOptimization();
}

function updateRfRate(e) {
    const val = parseFloat(e.target.value);
    document.getElementById('rf-value').textContent = `${val.toFixed(1)}%`;
    runOptimization();
}

function updateSimCount(e) {
    const val = parseInt(e.target.value);
    document.getElementById('sim-value').textContent = val.toLocaleString();
}

function handleAddCustomAsset(e) {
    e.preventDefault();
    const name = document.getElementById('asset-name').value;
    const ret = parseFloat(document.getElementById('asset-return').value);
    const vol = parseFloat(document.getElementById('asset-volatility').value);
    const cat = document.getElementById('asset-category').value;
    const id = 'custom-' + Date.now();
    
    // Pick a distinct color
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#8b5cf6', '#3b82f6', '#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#eab308'];
    const color = colors[assets.length % colors.length];

    const newAsset = { id, name, return: ret, volatility: vol, category: cat, color };
    assets.push(newAsset);
    
    // Add to correlation dictionary with moderate correlation to others
    correlation[id] = { [id]: 1.0 };
    assets.forEach(a => {
        if (a.id !== id) {
            // Give standard correlation based on categories
            let corr = 0.25; // Default modest positive correlation
            if (a.category === cat) corr = 0.70; // Higher correlation for same asset class
            if (cat === 'debt' && a.category === 'equity') corr = 0.10;
            if (cat === 'equity' && a.category === 'debt') corr = 0.10;
            if (cat === 'commodity' || a.category === 'commodity') corr = 0.05;
            
            correlation[id][a.id] = corr;
            if (!correlation[a.id]) correlation[a.id] = {};
            correlation[a.id][id] = corr;
        }
    });

    // For backtesting, create simulated return history
    HISTORICAL_RETURNS[id] = HISTORICAL_YEARS.map(y => {
        // Generate a random return matching the expected parameters
        const stdDev = vol / 100;
        const mean = ret / 100;
        // Box-Muller transform for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const randNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        return parseFloat(((mean + stdDev * randNormal) * 100).toFixed(1));
    });

    activeAssetIds.push(id);
    customWeights[id] = 0;
    
    // Close modal & reset form
    document.getElementById('add-asset-modal').classList.remove('active');
    document.getElementById('add-asset-form').reset();
    
    autoBalanceCustomWeights();
    initializeUI();
    runOptimization();
}

function removeCustomAsset(id) {
    assets = assets.filter(a => a.id !== id);
    activeAssetIds = activeAssetIds.filter(activeId => activeId !== id);
    delete customWeights[id];
    delete correlation[id];
    assets.forEach(a => {
        if (correlation[a.id]) {
            delete correlation[a.id][id];
        }
    });
    delete HISTORICAL_RETURNS[id];

    autoBalanceCustomWeights();
    initializeUI();
    runOptimization();
}

// --- Analytical Engine (Math Calculations) ---

function validateWeights() {
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    const total = activeAssets.reduce((sum, a) => sum + (customWeights[a.id] || 0), 0);
    const badge = document.getElementById('weight-total');
    
    badge.textContent = `Total: ${total}%`;
    if (total === 100) {
        badge.classList.remove('error-badge');
        document.getElementById('custom-status-badge').textContent = "Allocated";
        document.getElementById('custom-status-badge').className = "badge badge-emerald";
        return true;
    } else {
        badge.classList.add('error-badge');
        document.getElementById('custom-status-badge').textContent = `Needs Balance (${total}%)`;
        document.getElementById('custom-status-badge').className = "badge badge-cyan";
        return false;
    }
}

function autoBalanceCustomWeights() {
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    const count = activeAssets.length;
    if (count === 0) return;

    // Distribute equally
    const baseWeight = Math.floor(100 / count);
    let remainder = 100 - (baseWeight * count);

    customWeights = {};
    activeAssets.forEach((asset, index) => {
        let weight = baseWeight;
        if (index < remainder) weight += 1;
        customWeights[asset.id] = weight;
    });

    assets.forEach(asset => {
        if (!activeAssetIds.includes(asset.id)) {
            customWeights[asset.id] = 0;
        }
    });

    renderSliders();
    validateWeights();
    updateCustomPortfolioKPI();
}

// Compute expected portfolio metrics: Return, Volatility, Sharpe
function calculatePortfolioMetrics(weightsArr, activeAssets, rf) {
    // 1. Expected Return: Sum of weight_i * return_i
    let expectedReturn = 0;
    activeAssets.forEach((asset, idx) => {
        expectedReturn += weightsArr[idx] * asset.return;
    });

    // 2. Expected Volatility: sqrt(w^T * Sigma * w)
    let varianceSum = 0;
    activeAssets.forEach((assetI, i) => {
        activeAssets.forEach((assetJ, j) => {
            const weightI = weightsArr[i];
            const weightJ = weightsArr[j];
            const volI = assetI.volatility;
            const volJ = assetJ.volatility;
            const corr = correlation[assetI.id]?.[assetJ.id] ?? 0;
            
            // Covariance = vol_i * vol_j * correlation_ij
            const covar = (volI / 100) * (volJ / 100) * corr;
            varianceSum += weightI * weightJ * covar;
        });
    });

    const expectedVolatility = Math.sqrt(varianceSum) * 100;
    
    // 3. Sharpe Ratio: (Return - Rf) / Volatility
    let sharpeRatio = 0;
    if (expectedVolatility > 0) {
        sharpeRatio = (expectedReturn - rf) / expectedVolatility;
    }

    return {
        return: expectedReturn,
        volatility: expectedVolatility,
        sharpe: sharpeRatio,
        weights: [...weightsArr]
    };
}

function runOptimization() {
    const rf = parseFloat(document.getElementById('rf-rate').value);
    const numSimulations = parseInt(document.getElementById('sim-count').value);
    
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    const numAssets = activeAssets.length;
    
    if (numAssets < 2) return;

    // Run Monte Carlo simulations
    const simulatedPortfolios = [];
    maxSharpePortfolio = null;
    minVolPortfolio = null;

    for (let sim = 0; sim < numSimulations; sim++) {
        // Generate random weight weights
        let rawWeights = [];
        let sum = 0;
        for (let i = 0; i < numAssets; i++) {
            const w = Math.random();
            rawWeights.push(w);
            sum += w;
        }
        
        // Normalize weights to sum to 1.0
        const weights = rawWeights.map(w => w / sum);
        const p = calculatePortfolioMetrics(weights, activeAssets, rf);
        simulatedPortfolios.push(p);

        // Track Max Sharpe Ratio Portfolio
        if (!maxSharpePortfolio || p.sharpe > maxSharpePortfolio.sharpe) {
            maxSharpePortfolio = p;
        }

        // Track Min Volatility Portfolio
        if (!minVolPortfolio || p.volatility < minVolPortfolio.volatility) {
            minVolPortfolio = p;
        }
    }

    // Update KPI panels for optimal portfolios
    document.getElementById('ms-return').textContent = `${maxSharpePortfolio.return.toFixed(2)}%`;
    document.getElementById('ms-volatility').textContent = `${maxSharpePortfolio.volatility.toFixed(2)}%`;
    document.getElementById('ms-sharpe').textContent = maxSharpePortfolio.sharpe.toFixed(2);

    document.getElementById('mv-return').textContent = `${minVolPortfolio.return.toFixed(2)}%`;
    document.getElementById('mv-volatility').textContent = `${minVolPortfolio.volatility.toFixed(2)}%`;
    document.getElementById('mv-sharpe').textContent = minVolPortfolio.sharpe.toFixed(2);

    // Update custom portfolio metrics
    updateCustomPortfolioKPI();

    // Render Charts
    renderFrontierChart(simulatedPortfolios, maxSharpePortfolio, minVolPortfolio);
    
    // Render current active allocation chart
    const activeTab = document.querySelector('.tab-btn.active').dataset.portfolio;
    updateAllocationChart(activeTab);

    // Run backtest simulation
    runHistoricalBacktest();
}

function updateCustomPortfolioKPI() {
    const rf = parseFloat(document.getElementById('rf-rate').value);
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    
    // Map custom weights into array format aligned with activeAssets
    const weightsArr = activeAssets.map(asset => (customWeights[asset.id] || 0) / 100);
    const customPort = calculatePortfolioMetrics(weightsArr, activeAssets, rf);

    document.getElementById('cust-return').textContent = `${customPort.return.toFixed(2)}%`;
    document.getElementById('cust-volatility').textContent = `${customPort.volatility.toFixed(2)}%`;
    document.getElementById('cust-sharpe').textContent = customPort.sharpe.toFixed(2);
}

// --- Backtest Simulation Math ---
function runHistoricalBacktest() {
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    
    // Set weights configurations (normalized to sum to 1.0)
    const msWeights = activeAssets.map((asset, idx) => maxSharpePortfolio.weights[idx]);
    const mvWeights = activeAssets.map((asset, idx) => minVolPortfolio.weights[idx]);
    
    const totalCustomWeight = activeAssets.reduce((sum, a) => sum + (customWeights[a.id] || 0), 0);
    const custWeights = activeAssets.map(asset => {
        if (totalCustomWeight === 0) return 1 / activeAssets.length; // Equal fallback
        return (customWeights[asset.id] || 0) / totalCustomWeight;
    });

    let msBalance = 10000;
    let mvBalance = 10000;
    let custBalance = 10000;
    
    const msGrowth = [10000];
    const mvGrowth = [10000];
    const custGrowth = [10000];
    
    const msMinVal = 10000;
    const mvMinVal = 10000;
    const custMinVal = 10000;

    let msPeak = 10000;
    let mvPeak = 10000;
    let custPeak = 10000;
    
    let msMaxDD = 0;
    let mvMaxDD = 0;
    let custMaxDD = 0;

    // Simulate annual returns and compounding (rebalanced annually)
    HISTORICAL_YEARS.forEach((year, yIdx) => {
        let msYearReturn = 0;
        let mvYearReturn = 0;
        let custYearReturn = 0;

        activeAssets.forEach((asset, aIdx) => {
            const assetHistory = HISTORICAL_RETURNS[asset.id] || [];
            const returnVal = (assetHistory[yIdx] ?? asset.return) / 100;
            
            msYearReturn += msWeights[aIdx] * returnVal;
            mvYearReturn += mvWeights[aIdx] * returnVal;
            custYearReturn += custWeights[aIdx] * returnVal;
        });

        // Update balances
        msBalance *= (1 + msYearReturn);
        mvBalance *= (1 + mvYearReturn);
        custBalance *= (1 + custYearReturn);

        // Record yearly balance
        msGrowth.push(msBalance);
        mvGrowth.push(mvBalance);
        custGrowth.push(custBalance);

        // Drawdown tracking (simplified annual peak-trough metric)
        if (msBalance > msPeak) msPeak = msBalance;
        else msMaxDD = Math.max(msMaxDD, (msPeak - msBalance) / msPeak);

        if (mvBalance > mvPeak) mvPeak = mvBalance;
        else mvMaxDD = Math.max(mvMaxDD, (mvPeak - mvBalance) / mvPeak);

        if (custBalance > custPeak) custPeak = custBalance;
        else custMaxDD = Math.max(custMaxDD, (custPeak - custBalance) / custPeak);
    });

    // Populate performance stats in table
    const yearsNum = HISTORICAL_YEARS.length;
    
    const msCAGR = (Math.pow(msBalance / 10000, 1 / yearsNum) - 1) * 100;
    const mvCAGR = (Math.pow(mvBalance / 10000, 1 / yearsNum) - 1) * 100;
    const custCAGR = (Math.pow(custBalance / 10000, 1 / yearsNum) - 1) * 100;

    document.getElementById('stat-ms-cagr').textContent = `${msCAGR.toFixed(2)}%`;
    document.getElementById('stat-ms-mdd').textContent = `-${(msMaxDD * 100).toFixed(1)}%`;
    document.getElementById('stat-ms-val').textContent = `₹${Math.round(msBalance).toLocaleString()}`;

    document.getElementById('stat-mv-cagr').textContent = `${mvCAGR.toFixed(2)}%`;
    document.getElementById('stat-mv-mdd').textContent = `-${(mvMaxDD * 100).toFixed(1)}%`;
    document.getElementById('stat-mv-val').textContent = `₹${Math.round(mvBalance).toLocaleString()}`;

    document.getElementById('stat-cust-cagr').textContent = `${custCAGR.toFixed(2)}%`;
    document.getElementById('stat-cust-mdd').textContent = `-${(custMaxDD * 100).toFixed(1)}%`;
    document.getElementById('stat-cust-val').textContent = `₹${Math.round(custBalance).toLocaleString()}`;

    renderBacktestChart(msGrowth, mvGrowth, custGrowth);
}

// --- Chart.js Implementations ---

function renderFrontierChart(simulations, maxSharpe, minVol) {
    const ctx = document.getElementById('frontierChart').getContext('2d');
    
    // Extract current custom portfolio data
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    const rf = parseFloat(document.getElementById('rf-rate').value);
    const weightsArr = activeAssets.map(asset => (customWeights[asset.id] || 0) / 100);
    const custom = calculatePortfolioMetrics(weightsArr, activeAssets, rf);

    // Format Monte Carlo scatter points
    const scatterPoints = simulations.map(p => ({
        x: p.volatility,
        y: p.return,
        sharpe: p.sharpe
    }));

    if (frontierChart) {
        frontierChart.destroy();
    }

    frontierChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Simulated Portfolios',
                    data: scatterPoints,
                    backgroundColor: (context) => {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        if (!value) return 'rgba(148, 163, 184, 0.2)';
                        
                        // Dynamic professional coloring: Slate (low Sharpe) to Royal Blue (high Sharpe)
                        const maxS = maxSharpe.sharpe;
                        const minS = minVol.sharpe;
                        const ratio = Math.max(0, Math.min(1, (value.sharpe - minS) / (maxS - minS || 1)));
                        const r = Math.floor(148 + ratio * (37 - 148));
                        const g = Math.floor(163 + ratio * (99 - 163));
                        const b = Math.floor(184 + ratio * (235 - 184));
                        return `rgba(${r}, ${g}, ${b}, 0.35)`;
                    },
                    pointRadius: 3,
                    order: 3
                },
                {
                    label: 'Max Sharpe Portfolio',
                    data: [{ x: maxSharpe.volatility, y: maxSharpe.return }],
                    backgroundColor: '#d97706',
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    pointRadius: 9,
                    pointStyle: 'star',
                    order: 1
                },
                {
                    label: 'Min Volatility Portfolio',
                    data: [{ x: minVol.volatility, y: minVol.return }],
                    backgroundColor: '#0284c7',
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    pointRadius: 9,
                    pointStyle: 'rectRot',
                    order: 1
                },
                {
                    label: 'Your Custom Portfolio',
                    data: [{ x: custom.volatility, y: custom.return }],
                    backgroundColor: '#059669',
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    pointRadius: 9,
                    pointStyle: 'triangle',
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f3f4f6',
                        font: { family: 'Outfit', size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            if (context.datasetIndex === 0) {
                                return `Return: ${context.raw.y.toFixed(2)}%, Risk: ${context.raw.x.toFixed(2)}%, Sharpe: ${context.raw.sharpe.toFixed(2)}`;
                            }
                            return `${context.dataset.label} - Return: ${context.raw.y.toFixed(2)}%, Risk: ${context.raw.x.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Expected Volatility / Risk (%)', color: '#9ca3af', font: { weight: 'bold' } },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#9ca3af' }
                },
                y: {
                    title: { display: true, text: 'Expected Annual Return (%)', color: '#9ca3af', font: { weight: 'bold' } },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#9ca3af' }
                }
            }
        }
    });
}

function updateAllocationChart(portfolioType) {
    const ctx = document.getElementById('allocationChart').getContext('2d');
    const activeAssets = assets.filter(a => activeAssetIds.includes(a.id));
    
    let chartWeights = [];
    let title = "";

    if (portfolioType === 'max-sharpe' && maxSharpePortfolio) {
        chartWeights = maxSharpePortfolio.weights.map(w => w * 100);
        title = "Maximum Sharpe Allocation";
    } else if (portfolioType === 'min-variance' && minVolPortfolio) {
        chartWeights = minVolPortfolio.weights.map(w => w * 100);
        title = "Minimum Volatility Allocation";
    } else {
        const total = activeAssets.reduce((sum, a) => sum + (customWeights[a.id] || 0), 0);
        chartWeights = activeAssets.map(asset => {
            if (total === 0) return 0;
            return ((customWeights[asset.id] || 0) / total) * 100;
        });
        title = "Your Custom Allocation";
    }

    const labels = activeAssets.map(a => a.name.split(' ')[0]);
    const colors = activeAssets.map(a => a.color);

    if (allocationChart) {
        allocationChart.destroy();
    }

    allocationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: chartWeights.map(w => parseFloat(w.toFixed(1))),
                backgroundColor: colors,
                borderWidth: 1,
                borderColor: '#111827'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#f3f4f6',
                        font: { family: 'Outfit', size: 10 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.raw}%`
                    }
                }
            },
            cutout: '60%'
        }
    });
}

function renderBacktestChart(msData, mvData, custData) {
    const ctx = document.getElementById('backtestChart').getContext('2d');
    const labels = ['Start', ...HISTORICAL_YEARS.map(String)];

    if (backtestChart) {
        backtestChart.destroy();
    }

    backtestChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Max Sharpe Strategy',
                    data: msData,
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(217, 119, 6, 0.05)',
                    borderWidth: 3,
                    tension: 0.15,
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'Min Volatility Strategy',
                    data: mvData,
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.05)',
                    borderWidth: 3,
                    tension: 0.15,
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'Custom Strategy',
                    data: custData,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    borderWidth: 3,
                    tension: 0.15,
                    fill: false,
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f3f4f6',
                        font: { family: 'Outfit', size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ₹${Math.round(context.raw).toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#9ca3af' }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: {
                        color: '#9ca3af',
                        callback: (value) => '₹' + value.toLocaleString()
                    }
                }
            }
        }
    });
}
