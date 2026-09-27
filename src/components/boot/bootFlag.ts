// Shared by the inline script, the boot screen and the effects that wait for it.
export const BOOT_STORAGE_KEY = "qe-booted";
export const BOOTED_EVENT = "qe:booted";

// Rendered as a plain inline <script>, so it runs while the HTML is parsed, before the first
// paint. It marks <html data-boot="pending"> only on the first visit of the session and when
// the visitor accepts motion; the CSS shows the boot screen only under that mark, so there is
// no flash either way and nothing shows without JavaScript.
// React escapes quotes and ampersands inside <script>: the code uses backticks and nested ifs.
export const BOOT_FLAG_SCRIPT = [
  "try{",
  `if(!sessionStorage.getItem(\`${BOOT_STORAGE_KEY}\`))`,
  "if(!matchMedia(`(prefers-reduced-motion: reduce)`).matches)",
  "document.documentElement.dataset.boot=`pending`",
  "}catch(e){}",
].join("");

export function isBooting(): boolean {
  return document.documentElement.dataset.boot === "pending";
}
