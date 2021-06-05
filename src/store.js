import { writable } from "svelte/store";

export const launchables = writable([], (set) => {
  try {
    const initial = JSON.parse(localStorage.getItem("launchables"));
    set(initial || []);
  } catch (err) {
    set([]);
  }
  return launchables.subscribe((changed) => {
    localStorage.setItem("launchables", JSON.stringify(changed));
  });
});
