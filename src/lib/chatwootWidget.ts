// Loads Chatwoot's public Website Widget SDK on demand — this site doesn't
// keep a persistent chat bubble on every page, it only loads/opens the
// widget when a visitor submits the "Agendar Visita" form (see
// PropertyDetails.tsx), pre-filled with the name/email/phone they typed.

let loadPromise: Promise<void> | null = null;

function loadChatwootWidget(websiteToken: string, baseUrl: string): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    if (window.$chatwoot) {
      resolve();
      return;
    }
    window.addEventListener('chatwoot:ready', () => resolve(), { once: true });
    const script = document.createElement('script');
    script.src = `${baseUrl.replace(/\/$/, '')}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({ websiteToken, baseUrl });
    };
    document.body.appendChild(script);
  });

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
