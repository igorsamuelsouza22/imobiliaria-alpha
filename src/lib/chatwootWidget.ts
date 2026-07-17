// Loads Chatwoot's public Website Widget SDK on demand — this site doesn't
// keep a persistent chat bubble on every page, it only loads/opens the
// widget when a visitor submits the "Agendar Visita" form (see
// PropertyDetails.tsx), pre-filled with the name/email/phone they typed.

let loadPromise: Promise<void> | null = null;

// Polls for window.$chatwoot instead of waiting on the `chatwoot:ready`
// event — that event isn't reliably dispatched on `window` on every
// Chatwoot version/setup (confirmed against the real self-hosted instance:
// the widget loaded and `$chatwoot` became available, but the event never
// fired, leaving the caller awaiting forever).
function waitForChatwoot(timeoutMs = 8000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (window.$chatwoot) {
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error('Chatwoot demorou demais para iniciar.'));
        return;
      }
      setTimeout(check, 100);
    };
    check();
  });
}

function loadChatwootWidget(websiteToken: string, baseUrl: string): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.$chatwoot) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = `${baseUrl.replace(/\/$/, '')}/packs/js/sdk.js`;
    script.async = true;
    script.onerror = () => reject(new Error('Falha ao carregar o widget do Chatwoot.'));
    script.onload = () => {
      window.chatwootSDK?.run({ websiteToken, baseUrl });
      waitForChatwoot().then(resolve, reject);
    };
    document.body.appendChild(script);
  });

  // Don't cache a rejected load — let a retry try loading again.
  loadPromise.catch(() => { loadPromise = null; });

  return loadPromise;
}

export async function openChatwootWithUser(
  websiteToken: string,
  baseUrl: string,
  user: { name: string; email: string; phone: string },
): Promise<void> {
  await loadChatwootWidget(websiteToken, baseUrl);
  const identifier = user.email || user.phone || user.name;
  window.$chatwoot?.setUser(identifier, { name: user.name, email: user.email, phone_number: user.phone });
  window.$chatwoot?.toggle('open');
}
