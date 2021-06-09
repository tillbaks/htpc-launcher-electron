import { writable } from "svelte/store";

const exampleData = [
  {
    "name": "YouTube",
    "icon": "mdiYoutube",
    "show": true,
    "cmd": "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "args": [
      "--user-data-dir=C:\\Users\\johan\\AppData\\Roaming\\htpc-launcher\\brave-data",
      "--profile-directory=Default",
      "--start-fullscreen",
      "--user-agent=\"Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/092754\"",
      "https://youtube.com/tv"
    ]
  },
  {
    "name": "Twitch",
    "icon": "mdiTwitch",
    "show": true,
    "cmd": "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "args": [
      "--user-data-dir=C:\\Users\\johan\\AppData\\Roaming\\htpc-launcher\\brave-data",
      "--profile-directory=Default",
      "--start-fullscreen",
      "https://twitch.tv"
    ]
  },
  {
    "name": "Kodi",
    "icon": "mdiKodi",
    "show": true,
    "cmd": "explorer.exe",
    "args": [
      "shell:appsFolder\\XBMCFoundation.Kodi_4n2hpmxwrvr6p!Kodi"
    ]
  },
  {
    "name": "Steam",
    "icon": "mdiSteam",
    "show": true,
    "cmd": "C:\\Program Files (x86)\\Steam\\steam.exe",
    "args": [
      "steam://open/bigpicture",
      "-fulldesktopres"
    ]
  },
  {
    "name": "RetroArch",
    "icon": "mdiGamepadVariantOutline",
    "show": true,
    "cmd": "C:\\RetroArch-Win64\\retroarch.exe"
  },
  {
    "name": "Browser",
    "icon": "mdiGoogleChrome",
    "show": true,
    "cmd": "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    "args": [
      "--user-data-dir=C:\\Users\\johan\\AppData\\Roaming\\htpc-launcher\\brave-data",
      "--profile-directory=Default",
      "--start-fullscreen"
    ]
  }
];

export const launchables = writable(exampleData, (set) => {
  try {
    const initial = JSON.parse(localStorage.getItem("launchables"));
    set(initial || exampleData);
  } catch (err) {
    set(exampleData);
  }
  return launchables.subscribe((changed) => {
    localStorage.setItem("launchables", JSON.stringify(changed));
  });
});
