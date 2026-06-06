// ==UserScript==
// @name CrazyParts Anti-Idle (Keep Alive)
// @namespace http://tampermonkey.net/
// @version 1.0
// @description Prevents logout by pinging the server and simulating activity every 4 minutes.
// @author Gemini
// @match https://www.crazyparts.com.au/*
// @match https://crazyparts.com.au/*
// @grant none
// ==/UserScript==

(function() {
    'use strict';

    // --- SETTINGS ---
    // How often to ping? (4 minutes = 240,000ms)
    // We choose 4 mins to be safe if the timeout is 5 mins.
    const INTERVAL_MS = 4 * 60 * 1000;

    // --- VISUAL INDICATOR ---
    // Adds a tiny green dot in the bottom corner so you know you are safe.
    const dot = document.createElement('div');
    Object.assign(dot.style, {
        position: 'fixed',
        bottom: '5px',
        left: '5px',
        width: '8px',
        height: '8px',
        backgroundColor: '#2ecc71', // Green
        borderRadius: '50%',
        zIndex: '99999',
        pointerEvents: 'none',
        opacity: '0.5',
        boxShadow: '0 0 5px #2ecc71'
    });
    document.body.appendChild(dot);

    // --- THE KEEP ALIVE FUNCTION ---
    function stayLoggedIn() {
        console.log("☕ Anti-Idle: Refreshing session...");

        // 1. VISUAL PULSE (Flash bright green)
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1.5)';
        setTimeout(() => {
            dot.style.opacity = '0.5';
            dot.style.transform = 'scale(1)';
        }, 500);

        // 2. SERVER PING (Background Request)
        // We request the CURRENT URL. This sends your cookies to the server,
        // proving you are still "there", without reloading the page visually.
        fetch(window.location.href, { method: 'HEAD' })
            .then(() => console.log("✅ Session renewed via Network Ping."))
            .catch(err => console.error("⚠️ Ping failed:", err));

        // 3. ACTIVITY SIMULATOR (Reset Local Timers)
        // Some sites have a Javascript timer looking for mouse movement.
        document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', bubbles: true }));
    }

    // Run the function every 4 minutes
    setInterval(stayLoggedIn, INTERVAL_MS);

    console.log("🛡️ CrazyParts Anti-Idle Active: Pinging every 4 mins.");

})();