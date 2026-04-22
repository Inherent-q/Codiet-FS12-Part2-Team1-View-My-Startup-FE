const SESSION_ID_KEY = "my_startup_session_id";

export const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
};

export const getSessionId = () => {
  return localStorage.getItem(SESSION_ID_KEY);
};

export const clearSessionId = () => {
  localStorage.removeItem(SESSION_ID_KEY);
};

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
