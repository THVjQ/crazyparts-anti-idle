# CrazyParts Anti-Idle

**Version:** 1.0 · **Site:** crazyparts.com.au

Prevents automatic logout on Crazyparts by keeping the session alive in the background. Log in once at the start of the day and stay logged in.

---

## What It Does

- Pings the server every **4 minutes** to keep the session alive (safely under the ~5-minute idle timeout)
- Simulates activity so the site does not detect an idle session
- Shows a small **green dot** in the bottom-left corner — visible confirmation that the script is active

---

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Chrome
2. Click **Raw** on the `.user.js` file in this repo
3. Tampermonkey will prompt to install — click **Install**
4. Open Crazyparts — the green dot appears immediately confirming it is active

---

## Notes

- No login credentials are stored or sent — the script only pings the page you are already on
- The ping interval is 4 minutes (`INTERVAL_MS = 4 * 60 * 1000`) — edit the script if your session timeout differs
- No configuration required

---

## Using Multiple Scripts

If you are using several of the THVjQ Tampermonkey scripts, check the **Issues** tab — a multi-script addon with live updates across all scripts is in progress. Leave a comment and it will be prioritised.
