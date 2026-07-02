// 1. Core DOM Reference Mappings (Fixed Selectors with '#' or '.')
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn"); // Matched to HTML ID
const filterContainer = document.querySelector("#tags-filter-grid");
const displayMatrix = document.querySelector("#results-display-matrix");
const latencyLabel = document.querySelector("#latency-metric");
const queueLabel = document.querySelector("#queue-metric");

async function streamMediaPipeline(searchToken) {
    queueLabel.innerText = "processing microtask run...";
    queueLabel.className = "status-active";
    displayMatrix.innerHTML = "<p>Awaiting Data Stream Resolution...</p>";

    const startTime = performance.now();

    const targetUrl = searchToken === "invalid_endpoint_test"
        ? "https://api.jikan.moe/v4/broken-route-test"
        : `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchToken)}&limit=8`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            // Fixed: Converted to backticks for template string interpolation
            throw new Error(`return status ${response.status}`);
        }
        
        
        const payload = await response.json();
      
        renderMatrixDOM(payload.data);

    } catch (error) {
        displayMatrix.innerHTML = `
            <div class="error-box">
                <h3>network trapped execution exception</h3>
                <p>${error.message}</p>
                <small>check your browser console network tab, the fetch microtask caught this error</small>
            </div>
        `;
    } finally {
        setTimeout(() => {
            const endTime = performance.now();
            // Fixed: Subtraction arithmetic assignment operator
            const executionDelta = Math.round(endTime - startTime);
            
            // Fixed: Converted to backticks for interpolation
            latencyLabel.innerText = `${executionDelta} ms`;
            queueLabel.innerText = "Idle";
            queueLabel.className = "status-idle";
        }, 0);
    }
}

function renderMatrixDOM(dataArray) {
    displayMatrix.innerHTML = ""; 
    
    if (!dataArray || dataArray.length === 0) {
        displayMatrix.innerHTML = "<p>No stream sequences matched the query token.</p>";
        return;
    }

    dataArray.forEach(item => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
            <img src="${item.images.jpg.image_url}" alt="Cover Image" loading="lazy">
            <div class="card-info">
                <h3>${item.title}</h3>
                <p>Rating: ${item.score || 'N/A'}</p>
            </div>
        `;
        displayMatrix.appendChild(cardElement);
    });
}


searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value) streamMediaPipeline(value);
});


filterContainer.addEventListener("click", (event) => {
    const targetButton = event.target.closest(".tag-btn");
    if (!targetButton) return;

    document.querySelectorAll(".tag-btn").forEach(btn => btn.classList.remove("active"));
    targetButton.classList.add("active");

    const queryToken = targetButton.dataset.query;
    streamMediaPipeline(queryToken);
});

// Bootstrapping initial sequence run
streamMediaPipeline("naruto");
