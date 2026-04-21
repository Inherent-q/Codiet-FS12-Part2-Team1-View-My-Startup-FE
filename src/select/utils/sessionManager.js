// 濡쒖뺄?ㅽ넗由ъ? sessionId ???

const SESSION_ID_KEY = "my_startup_session_id";

/**
 * ?먮뒗 ?대? ?덉쑝硫?湲곗〈 ID 諛섑솚
 */
export const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    // ?덈줈??sessionId ?앹꽦 (UUID)
    sessionId = generateUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
};

/**
 * sessionId 媛?몄삤湲?
 */
export const getSessionId = () => {
  return localStorage.getItem(SESSION_ID_KEY);
};

/**
 * sessionId 珥덇린??(濡쒓렇?꾩썐 ??
 */
export const clearSessionId = () => {
  localStorage.removeItem(SESSION_ID_KEY);
};

/**
 * UUID ?앹꽦 ?⑥닔
 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

