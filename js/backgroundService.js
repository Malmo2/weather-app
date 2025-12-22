
// Get your key at https://www.pexels.com/api/
// TODO: Optionally move this to an env-backed config in production builds.
const PEXELS_API_KEY = "RE42uUXexu7YwR4D8vodhK1CxHBwi43bCsR7Ti6dRnOipUEGQzELifZM";

// TODO: Plug in your own Pexels media per condition group below.
// Use direct MP4 URLs from Pexels (video_files.link) or image URLs (src.original/large2x).
// Leave fields empty to fall back to the Pexels Images search API.
const CUSTOM_PEXELS_MEDIA_BY_GROUP = {
    sun: { videoUrl: "", imageUrl: "" },
    clear: { videoUrl: "", imageUrl: "" },
    rain: { videoUrl: "https://www.pexels.com/download/video/5197762/", imageUrl: "" },
    fog: { videoUrl: "", imageUrl: "" },
    thunder: { videoUrl: "", imageUrl: "" },
    snow: { videoUrl: "https://www.pexels.com/download/video/855614/", imageUrl: "" },
    cloudy: { videoUrl: "", imageUrl: "" },
    hail: { videoUrl: "", imageUrl: "" },
    fallback: { videoUrl: "", imageUrl: "" },
};

let backgroundVideoEl = null;
const PEXELS_DOWNLOAD_RE = /pexels\.com\/download\/video\/(\d+)/i;

function ensureBackgroundVideoElement() {
    if (backgroundVideoEl) return backgroundVideoEl;
    const video = document.createElement("video");
    video.setAttribute("aria-hidden", "true");
    video.autoplay = true;
    video.muted = true; // Required for autoplay policies
    video.loop = true;
    video.playsInline = true;
    video.style.position = "fixed";
    video.style.inset = "0"; // full viewport
    video.style.width = "100vw";
    video.style.height = "100vh";
    video.style.minWidth = "100vw";
    video.style.minHeight = "100vh";
    video.style.maxWidth = "100vw";
    video.style.maxHeight = "100vh";
    video.style.objectFit = "cover";
    video.style.margin = "0";
    video.style.padding = "0";
    video.style.zIndex = "-1";
    video.style.pointerEvents = "none";
    backgroundVideoEl = video;
    document.body.prepend(video);
    return video;
}

function clearBackgroundVideo() {
    if (backgroundVideoEl) {
        backgroundVideoEl.pause();
        backgroundVideoEl.remove();
        backgroundVideoEl = null;
    }
}

function setBodyImage(imageUrl) {
    clearBackgroundVideo();
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.transition = "background-image 0.5s ease-in-out";
}

function setBodyVideo(videoUrl) {
    document.body.style.backgroundImage = "none";
    const video = ensureBackgroundVideoElement();
    if (video.src !== videoUrl) {
        video.src = videoUrl;
        video.load();
    }
    video
        .play()
        .catch(() => {
            // Autoplay might fail; caller already cleared image so just log quietly.
            console.warn("Background video autoplay blocked; consider user interaction.");
        });
}

async function resolvePexelsDownloadUrl(videoUrl) {
    const match = videoUrl && videoUrl.match(PEXELS_DOWNLOAD_RE);
    if (!match) return videoUrl;

    // If a Pexels download URL is provided, resolve to the actual MP4 via the Pexels Video API.
    if (!PEXELS_API_KEY || PEXELS_API_KEY === "YOUR_PEXELS_API_KEY") {
        console.warn("Pexels API Key is missing; cannot resolve Pexels download URL. Falling back to provided URL.");
        return videoUrl;
    }

    const videoId = match[1];
    const apiUrl = `https://api.pexels.com/videos/videos/${videoId}`;

    try {
        const res = await fetch(apiUrl, { headers: { Authorization: PEXELS_API_KEY } });
        if (!res.ok) {
            console.warn(`Could not resolve Pexels video ${videoId}: ${res.statusText}`);
            return videoUrl;
        }
        const data = await res.json();
        const files = data.video_files || [];
        const best =
            files.find((f) => f.quality === "hd" && f.link.endsWith(".mp4")) ||
            files.find((f) => f.link && f.link.endsWith(".mp4")) ||
            null;
        return best?.link || videoUrl;
    } catch (err) {
        console.warn(`Failed to resolve Pexels video ${videoId}:`, err);
        return videoUrl;
    }
}

/**
 * Maps Open-Meteo weather codes to a high-level condition group.
 * Groups are kept small so you can easily assign your own Pexels media.
 */
export function mapWeatherCodeToConditionGroup(code) {
    const numericCode = Number(code);
    switch (numericCode) {
        case 0:
            return "sun";
        case 1:
        case 2:
        case 3:
            return "cloudy";
        case 45:
        case 48:
            return "fog";
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            return "rain";
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "snow";
        case 95:
            return "thunder";
        case 96:
        case 99:
            return "hail";
        default:
            return "clear";
    }
}

/**
 * Maps Open-Meteo weather codes to a Pexels search query.
 * @param {number} code - The WMO weather code from Open-Meteo.
 * @returns {string} - A search query string for Pexels.
 */
export function mapWeatherCodeToPexelsQuery(code) {
    const group = mapWeatherCodeToConditionGroup(code);
    switch (group) {
        case "sun":
            return "sunny blue sky";
        case "clear":
            return "clear sky";
        case "cloudy":
            return "cloudy overcast sky";
        case "fog":
            return "fog mist haze";
        case "rain":
            return "rainy weather";
        case "snow":
            return "snowy winter";
        case "thunder":
            return "thunderstorm lightning";
        case "hail":
            return "hail storm";
        default:
            return "nature sky";
    }
}

/**
 * Fetches an image from Pexels based on the weather code and sets the document body background.
 * @param {number} weatherCode - The WMO weather code.
 */
export async function setPexelsBackgroundFromWeatherCode(weatherCode) {
    const group = mapWeatherCodeToConditionGroup(weatherCode);
    const custom = CUSTOM_PEXELS_MEDIA_BY_GROUP[group] || {};

    // Custom media takes precedence.
    if (custom.videoUrl) {
        const playableUrl = await resolvePexelsDownloadUrl(custom.videoUrl);
        setBodyVideo(playableUrl);
        return;
    }
    if (custom.imageUrl) {
        setBodyImage(custom.imageUrl);
        return;
    }

    // No custom media; fall back to Pexels Images search.
    if (!PEXELS_API_KEY || PEXELS_API_KEY === "YOUR_PEXELS_API_KEY") {
        console.warn("Pexels API Key is missing. Please add it in js/backgroundService.js");
        return;
    }

    const query = mapWeatherCodeToPexelsQuery(weatherCode);
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
    )}&per_page=1&orientation=landscape`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Pexels API Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.original; // Or .large2x, .large depending on preference
            setBodyImage(imageUrl);
        } else {
            console.warn(`No photos found for query: ${query}`);
        }
    } catch (error) {
        console.error("Failed to fetch background image:", error);
    }
}

