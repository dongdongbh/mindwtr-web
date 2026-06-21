/**
 * Platforms coverflow: one screenshot featured large and centered, the others
 * scaled down and dimmed peeking behind it. Switchable by clicking a side
 * screenshot, the prev/next arrows, the dots, ←/→ keys, or a swipe. No
 * autoplay — it stays put until the visitor acts. Position is driven entirely
 * by `is-active`/`is-prev`/`is-next` classes (CSS owns the transforms);
 * `prefers-reduced-motion` is handled by the global transition reset in the CSS.
 */
export function initCoverflow(): void {
  const root = document.querySelector<HTMLElement>(".coverflow");
  if (!root) return;

  const slides = Array.from(
    root.querySelectorAll<HTMLElement>(".coverflow-slide"),
  );
  const dots = Array.from(
    root.querySelectorAll<HTMLButtonElement>(".coverflow-dot"),
  );
  const arrows = Array.from(
    root.querySelectorAll<HTMLButtonElement>(".coverflow-arrow"),
  );
  const n = slides.length;
  if (n === 0) return;

  let active = 0;

  function render(): void {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.classList.toggle("is-prev", i === (active - 1 + n) % n);
      slide.classList.toggle("is-next", i === (active + 1) % n);
      // Only the featured slide is exposed to assistive tech; the dimmed
      // side previews and the dots/arrows carry navigation.
      slide.setAttribute("aria-hidden", i === active ? "false" : "true");
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      if (i === active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function go(to: number): void {
    active = ((to % n) + n) % n;
    render();
  }

  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => go(i));
  });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => go(i));
  });
  arrows.forEach((arrow) => {
    const dir = Number(arrow.dataset.dir) || 0;
    arrow.addEventListener("click", () => go(active + dir));
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      go(active - 1);
      event.preventDefault();
    } else if (event.key === "ArrowRight") {
      go(active + 1);
      event.preventDefault();
    }
  });

  // Swipe (mainly for the single-image mobile layout).
  let startX: number | null = null;
  root.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  root.addEventListener(
    "touchend",
    (event) => {
      if (startX === null) return;
      const dx = (event.changedTouches[0]?.clientX ?? startX) - startX;
      if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      startX = null;
    },
    { passive: true },
  );

  render();
}
