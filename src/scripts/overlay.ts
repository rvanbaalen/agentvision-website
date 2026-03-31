/**
 * Agent Vision Living Overlay
 *
 * Scans page sections as they enter the viewport, discovers notable elements,
 * and draws bounding boxes with element IDs. Purely visual — no click
 * interception. Progressive enhancement — the page works fully without this.
 */

const SELECTORS = [
  'h1', 'h2', 'h3',
  'a[href]',
  'button',
  'code',
  'pre',
  'table',
  '.inline-flex',
  '[class*="bg-bg-subtle"] > h3',
].join(', ');

let totalCount = 0;
const scannedSections: Record<string, boolean> = {};
const allPositioners: Array<() => void> = [];

// -- Status bar region display --
function updateRegion(): void {
  const el = document.getElementById('region-size');
  if (el) el.textContent = `${window.innerWidth}x${window.innerHeight}`;
}
updateRegion();
window.addEventListener('resize', updateRegion);

// -- Helpers --
function getElType(el: Element): string {
  if (el.matches('.inline-flex')) return 'code-block';
  if (el.matches('pre')) return 'pre';
  if (el.matches('table')) return 'table';
  const map: Record<string, string> = {
    H1: 'heading', H2: 'heading', H3: 'heading',
    A: 'link', BUTTON: 'button', CODE: 'code',
  };
  return map[el.tagName] || 'element';
}

// -- Bounding box creation (visual only, no click handling) --
function createBBox(target: Element, section: Element, index: number): () => void {
  const box = document.createElement('div');
  box.className = 'bbox';

  const type = getElType(target);
  const id = `el-${type.replace(/[^a-z]/g, '')}-${String(index).padStart(3, '0')}`;

  const label = document.createElement('div');
  label.className = 'bbox-label';
  label.textContent = id;
  box.appendChild(label);

  section.appendChild(box);

  function position(): void {
    const sr = section.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    box.style.left = `${tr.left - sr.left - 1}px`;
    box.style.top = `${tr.top - sr.top - 1}px`;
    box.style.width = `${tr.width + 2}px`;
    box.style.height = `${tr.height + 2}px`;
  }

  position();
  return position;
}

// -- Section scanning --
function scanSection(section: Element): void {
  const scanId = section.getAttribute('data-scan-id');
  if (!scanId || scannedSections[scanId]) return;
  scannedSections[scanId] = true;

  const scanLine = section.querySelector('.scan-line');
  if (scanLine) scanLine.classList.add('active');

  const targets = section.querySelectorAll(SELECTORS);
  const delay = scanLine ? 1200 : 0;

  // Filter out nested targets (e.g., a code inside a pre)
  const filtered: Element[] = [];
  const seen = new Set<Element>();
  targets.forEach((t) => {
    let dominated = false;
    for (const s of seen) {
      if (s.contains(t) && s !== t) { dominated = true; break; }
    }
    if (!dominated) {
      for (let i = filtered.length - 1; i >= 0; i--) {
        if (t.contains(filtered[i]) && t !== filtered[i]) {
          seen.delete(filtered[i]);
          filtered.splice(i, 1);
        }
      }
      filtered.push(t);
      seen.add(t);
    }
  });

  setTimeout(() => {
    filtered.forEach((target, i) => {
      totalCount++;
      const pos = createBBox(target, section, totalCount);
      allPositioners.push(pos);

      const currentCount = totalCount;
      setTimeout(() => {
        const boxes = section.querySelectorAll('.bbox:not(.visible)');
        if (boxes.length > 0) boxes[0].classList.add('visible');
        const countEl = document.getElementById('el-count');
        if (countEl) countEl.textContent = String(currentCount);
      }, i * 80);
    });
  }, delay);
}

// -- Intersection Observer --
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        scanSection(entry.target);
      }
    }
  },
  { threshold: 0.15 },
);

document.querySelectorAll('.scannable').forEach((section) => {
  observer.observe(section);
});

// -- Resize repositioning --
let resizeTimer: ReturnType<typeof setTimeout>;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    for (const pos of allPositioners) pos();
  }, 200);
});

// -- Font load repositioning --
if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    for (const pos of allPositioners) pos();
  });
}
