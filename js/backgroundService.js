
// Local MP4 (looped & muted by the video element).
const LOCAL_VIDEO_BY_GROUP = {
  sun: ["constants/backgrounds/sun/sun.mp4"],
  clear: ["constants/backgrounds/clear/clear.mp4"],
  rain: ["constants/backgrounds/rain/rain.mp4"],
  fog: ["constants/backgrounds/fog/fog.mp4"],
  thunder: ["constants/backgrounds/thunder/thunder.mp4"],
  snow: ["constants/backgrounds/snow/snow.mp4"],
  cloudy: ["constants/backgrounds/cloudy/cloudy.mp4"],
  hail: ["constants/backgrounds/hail/hail.mp4"],
  fallback: ["constants/backgrounds/fallback/fallback.mp4"],
};

// Local WEBP backgrounds to use if video is unavailable.
const LOCAL_WEBP_BY_GROUP = {
  sun: [
    "constants/backgrounds/sun/sun.webp",
  ],
  clear: [
    "constants/backgrounds/clear/clear.webp",
  ],
  rain: [
    "constants/backgrounds/rain/rain.webp",
  ],
  fog: [
    "constants/backgrounds/fog/fog.webp",
  ],
  thunder: [
    "constants/backgrounds/thunder/thunder.webp",
  ],
  snow: [
    "constants/backgrounds/snow/snow.webp",
  ],
  cloudy: [
    "constants/backgrounds/cloudy/cloudy.webp",
  ],
  hail: [
    "constants/backgrounds/hail/hail.webp",
  ],
  fallback: [
    "constants/backgrounds/fallback/fallback.webp",
  ],
};

let backgroundVideoEl = null;

function getLocalVideoForGroup(group) {
  const list = LOCAL_VIDEO_BY_GROUP[group] || [];
  if (!list.length) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

function getLocalWebpForGroup(group) {
  const list = LOCAL_WEBP_BY_GROUP[group] || [];
  if (!list.length) return null;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

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

function setBodyVideo(videoUrl, fallbackImageUrl) {
  document.body.style.backgroundImage = "none";
  const video = ensureBackgroundVideoElement();

  // If the current source differs, swap it and reload.
  if (video.src !== videoUrl) {
    video.onerror = null;
    video.onstalled = null;
    video.src = videoUrl;
    video.load();
  }

  if (fallbackImageUrl) {
    video.onerror = () => {
      console.warn("Background video failed to load; falling back to image.");
      setBodyImage(fallbackImageUrl);
    };
    video.onstalled = () => {
      console.warn("Background video stalled; falling back to image.");
      setBodyImage(fallbackImageUrl);
    };
  }
  video
    .play()
    .catch(() => {
      // Autoplay might fail; caller already cleared image so just log quietly.
      console.warn("Background video autoplay blocked; consider user interaction.");
    });
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
    case 96:
    case 99:
      return "thunder";
    default:
      return "clear";
  }
}

/**
 * Sets background using local media mapped from weather code.
 * @param {number} weatherCode - The WMO weather code.
 */
export async function setBackgroundFromWeatherCode(weatherCode) {
  const group = mapWeatherCodeToConditionGroup(weatherCode);
  const localVideo = getLocalVideoForGroup(group) || getLocalVideoForGroup("fallback");
  const localWebp = getLocalWebpForGroup(group) || getLocalWebpForGroup("fallback");

  if (localVideo) {
    setBodyVideo(localVideo, localWebp || null);
    return;
  }

  if (localWebp) {
    setBodyImage(localWebp);
    return;
  }

  // Nothing to show; clear any existing video.
  clearBackgroundVideo();
}

