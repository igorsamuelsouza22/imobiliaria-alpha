// Loads Chatwoot's public Website Widget SDK on demand — this site doesn't
// keep a persistent chat bubble on every page, it only loads/opens the
// widget when a visitor submits the "Agendar Visita" form (see
// PropertyDetails.tsx), pre-filled with the name/email/phone they typed.
// hideMessageBubble keeps Chatwoot's own floating launcher icon from ever
// rendering — this site only ever opens the widget programmatically
// (docked inside the property card), never as a corner bubble.

let loadPromise: Promise<void> | null = null;

// Polls for window.$chatwoot instead of waiting on the `chatwoot:ready`
// event — that event isn't reliably dispatched on `window` on every
// Chatwoot version/setup (confirmed against the real self-hosted instance:
// the widget loaded and `$chatwoot` became available, but the event never
// fired, leaving the caller awaiting forever).
//
// `window.$chatwoot` itself becomes truthy as soon as the SDK script runs,
// which is BEFORE its widget iframe finishes booting and attaches the
// postMessage listener that `setUser`/`toggle` actually talk to over —
// confirmed by real testing: openChatwootWithUser() ran and the widget
// opened, but the agent never saw the name/email/phone, because setUser()
// fired into an iframe that wasn't listening yet. Also wait for that iframe
// to exist in the DOM as a (imperfect, but much better than nothing) proxy
// for "actually ready to receive commands".
function waitForChatwoot(timeoutMs = 8000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (window.$chatwoot && document.querySelector('#cw-widget-holder iframe')) {
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
      // locale pt_BR: the widget defaults to English otherwise — every
      // label ("Type your message", "We're away") must show in Portuguese.
      window.chatwootSDK?.run({ websiteToken, baseUrl, hideMessageBubble: true, locale: 'pt_BR' });
      waitForChatwoot().then(resolve, reject);
    };
    document.body.appendChild(script);
  });

  // Don't cache a rejected load — let a retry try loading again.
  loadPromise.catch(() => { loadPromise = null; });

  return loadPromise;
}

// Chatwoot's contact API validates phone_number as E.164 (+<country><digits>,
// digits only after the +) and silently drops it otherwise — the contact
// just shows up as "Indisponível" in the dashboard, no error anywhere.
// Our form's phone input has no mask (free text: "(11) 99999-8888", "11
// 99999-8888", etc.), so it never matched that format. Assumes Brazil,
// same as the rest of this site (no country selector anywhere).
function toE164BR(rawPhone: string): string | undefined {
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return undefined;
  return `+${digits.startsWith('55') ? digits : `55${digits}`}`;
}

export async function openChatwootWithUser(
  websiteToken: string,
  baseUrl: string,
  user: { name: string; email: string; phone: string },
): Promise<void> {
  await loadChatwootWidget(websiteToken, baseUrl);
  const identifier = user.email || user.phone || user.name;
  const phoneNumber = toE164BR(user.phone);
  // setUser BEFORE opening is what makes name/email/phone land on the
  // Chatwoot contact automatically — with the contact already identified,
  // the widget never shows its own "informe seu e-mail" prompt, since the
  // visitor already typed all of that in the Agendar Visita form.
  //
  // Real-world catch: Chatwoot instances with "Enforce User Identity
  // Validation" enabled silently DROP plain setUser calls (no HMAC hash =
  // ignored), leaving the contact as a random "solitary-log-512" name. The
  // custom attributes below are NOT subject to that enforcement, so they
  // always reach the conversation payload — the ERP's webhook reads them
  // and fixes the Chatwoot contact server-side with its agent token.
  const identify = () => {
    window.$chatwoot?.setLocale?.('pt_BR');
    window.$chatwoot?.setUser(identifier, { name: user.name, email: user.email, phone_number: phoneNumber });
    window.$chatwoot?.setCustomAttributes?.({
      visitante_nome: user.name,
      visitante_email: user.email,
      visitante_telefone: phoneNumber ?? user.phone,
    });
  };

  identify();
  window.$chatwoot?.toggle('open');
  // Belt-and-suspenders: the iframe existing (see waitForChatwoot) doesn't
  // guarantee its internal app has finished booting and is listening yet,
  // so the very first setUser() can still land too early and get silently
  // dropped. Re-send once the dust has settled — setUser is idempotent, so
  // resending is harmless.
  setTimeout(identify, 1500);
}

// Hides the widget window without destroying the conversation/contact —
// Chatwoot keeps both server-side and via its own cookie, so a visitor
// returning to the same property (see PropertyDetails.tsx's localStorage
// restore) still lands back in the same thread. Used when leaving a
// property page so the chat doesn't keep floating on other pages.
export function closeChatwoot(): void {
  window.$chatwoot?.toggle('close');
}
