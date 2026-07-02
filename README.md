# Engine Discovery Dashboard & Performance Profiler

A high-performance, responsive front-end media profiling dashboard built to analyze asynchronous execution queues, network request streams, and event bubbling mechanics. The application streams real-time data from the MyAnimeList REST API (Jikan API) completely asynchronously without blocking the primary browser rendering pipeline.

---

## Core Engineering Concepts Implemented

### 1. Asynchronous JavaScript Engine Routing
The pipeline heavily relies on `async/await` structures and the browser `fetch` engine. When a network request is initiated, execution pauses locally within the asynchronous function context, offloading the networking I/O operation to browser worker background processes. The resolving data microtasks are then queued into the high-priority **Microtask Queue**, ensuring the JavaScript single-threaded call stack remains completely unblocked for smooth UI interaction.

### 2. High-Performance Event Delegation
Instead of binding independent click listeners onto each filter button—which increases memory footprint and causes fragmentation—a single global listener is bound directly onto the parent navigation container (`#tags-filter-grid`). Using the browser's native **Event Bubbling** mechanic, the event listener captures click actions as they rise up from child nodes and uses the `event.target.closest()` method to safely parse and execute commands.

### 3. Graceful Error & Exception Boundaries
Network drops and faulty runtime server responses are caught within a tightly scoped `try...catch...finally` block. If an invalid or unauthenticated endpoint is called, the application intercepts the runtime execution throw natively and projects an explicit notification to the user layout rather than crashing the core application process.

### 4. Non-Blocking Performance Benchmarking
Using the precise `performance.now()` browser engine timer, the application calculates full execution cycle times down to the millisecond. The resetting of the user interface tracking status is explicitly wrapped inside a `setTimeout(() => {}, 1000)` callback to purposefully schedule it to resolve inside the subsequent browser **Macrotask Queue**, visually profiling the event loop mechanics directly on screen.


### HELL YEAH IDK WHAT ELSE TO SAY!
THIS IS A TESTIMONY TO THE COMPLETION OF THE FIRST PHASE ON MY FULL STACK DEVELOPMENT JOURNEY. IT TOOK ME AROUND A MONTH TO FINISH THE BASICS OF HTML, CSS, VANILLA JS, LEARN ABOUT ASYNC AND SYNC FUNCTIONS, HOW HTML WORKS AND HOW IT EVOLVED IN THE FAST 3-4 DECADES(HUSSEIN NASSER IS AN ABSOLUTE GOAT), TRY AND CATCH BLOCKS AND PROMISES(WHICH INVOLVED FETCH()).

---

## 📂 File Architecture

```text
phase1-capstone/
├── index.html       # Semantic DOM nodes & layout structure
├── styles.css       # Retro cyber-arcade design rules & pixel-art layers
├── app.js           # Async data-streams & event delegation logic
└── anime.jpg        # Local pixel-art background layer
