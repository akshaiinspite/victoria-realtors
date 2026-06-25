/**
 * Server-Side Tracking Pipeline Emulator (GA4 + Meta Conversions API)
 * Emulates the background dispatch of conversion payloads directly from
 * server environments to bypass client-side ad-blockers and privacy shields.
 */

// Subscriber callback list for live monitoring in the Admin Dashboard
let logSubscribers = [];

export function subscribeToTrackingLogs(callback) {
  logSubscribers.push(callback);
  return () => {
    logSubscribers = logSubscribers.filter(cb => cb !== callback);
  };
}

function emitLog(eventLog) {
  logSubscribers.forEach(cb => cb(eventLog));
}

export function trackEvent(eventName, payload = {}) {
  const timestamp = new Date().toISOString();
  const eventId = `evt_${Math.random().toString(36).substr(2, 9)}`;

  // 1. Format GA4 Measurement Protocol payload
  const ga4Payload = {
    client_id: payload.clientId || `cid_${Math.random().toString(36).substr(2, 9)}`,
    non_personalized_ads: false,
    events: [{
      name: eventName,
      params: {
        engagement_time_msec: payload.engagementTime || 1200,
        session_id: payload.sessionId || `sid_1782279143413`,
        ...payload
      }
    }]
  };

  // 2. Format Meta Conversions API (CAPI) Server Event payload
  const metaCAPIPayload = {
    data: [{
      event_name: mapToMetaEventName(eventName),
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: window.location.href,
      action_source: "website",
      user_data: {
        client_ip_address: payload.ip || "192.168.1.45",
        client_user_agent: navigator.userAgent,
        ph: payload.phone ? sha256Mock(payload.phone) : undefined, // Encrypted user identifiers
        em: payload.email ? sha256Mock(payload.email) : undefined
      },
      custom_data: {
        currency: "INR",
        value: payload.value || 0,
        content_name: payload.title || payload.projectName || "General Enquiry",
        content_category: payload.category || "Real Estate",
        lead_source: payload.source || "Web Form"
      }
    }]
  };

  // 3. Emit live log to subscribers (for our Admin dashboard console feeds)
  emitLog({
    id: eventId,
    timestamp,
    eventName,
    ga4: ga4Payload,
    meta: metaCAPIPayload
  });

  // 4. Print beautiful styled log messages to browser DevConsole for AEO/GEO audit visibility
  console.log(
    `%c[Server Tracking Log] 🚀 Server-Side Event: ${eventName.toUpperCase()} (ID: ${eventId})`,
    "color: #ffffff; background: #c5312d; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
  console.log(
    `%c  -> GA4 Server Payload:`, "color: #3b82f6; font-weight: bold;", ga4Payload
  );
  console.log(
    `%c  -> Meta Conversions API Payload:`, "color: #10b981; font-weight: bold;", metaCAPIPayload
  );
}

// Map custom actions to official Meta Facebook standard events
function mapToMetaEventName(name) {
  const mapping = {
    'lead_submitted': 'Lead',
    'contact_form_submit': 'Contact',
    'view_property': 'ViewContent',
    'calculate_mortgage': 'Search',
    'like_reel': 'CustomizeProduct',
    'chatbot_opened': 'FindLocation'
  };
  return mapping[name] || 'CustomEvent';
}

// Simulated SHA256 hashing for PI compliance simulation
function sha256Mock(str) {
  if (!str) return '';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}
