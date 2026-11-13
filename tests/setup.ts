import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({ matches: false, media: query, onchange: null, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false }),
});

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: class {
    constructor(private readonly callback: IntersectionObserverCallback) {}
    observe(target: Element) {
      this.callback([{ target, isIntersecting: false } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    unobserve() {}
    disconnect() {}
  },
});

// jsdom has no native modal implementation; browsers supply focus trapping and Escape.
HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
