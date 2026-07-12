/**
 * GTD loop tour: the five workflow steps are tabs and the stage below shows
 * the app at that step. Follows the ARIA tabs pattern (roving tabindex,
 * arrow-key navigation); CSS owns the crossfade via `is-active`, so
 * `prefers-reduced-motion` is handled by the global transition reset. No
 * autoplay — like the coverflow, it stays put until the visitor acts.
 */
export function initLoopTour(): void {
  const root = document.querySelector<HTMLElement>("[data-tour]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".loop-step"));
  const shots = Array.from(root.querySelectorAll<HTMLElement>(".loop-shot"));
  const n = tabs.length;
  if (n === 0 || shots.length !== n) return;

  let active = tabs.findIndex((tab) => tab.classList.contains("is-active"));
  if (active < 0) active = 0;

  function render(moveFocus: boolean): void {
    tabs.forEach((tab, i) => {
      const on = i === active;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on && moveFocus) tab.focus();
    });
    shots.forEach((shot, i) => {
      shot.classList.toggle("is-active", i === active);
      shot.setAttribute("aria-hidden", i === active ? "false" : "true");
    });
  }

  function go(to: number, moveFocus: boolean): void {
    active = ((to % n) + n) % n;
    render(moveFocus);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => go(i, false));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        go(active + 1, true);
        event.preventDefault();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        go(active - 1, true);
        event.preventDefault();
      } else if (event.key === "Home") {
        go(0, true);
        event.preventDefault();
      } else if (event.key === "End") {
        go(n - 1, true);
        event.preventDefault();
      }
    });
  });

  render(false);
}
