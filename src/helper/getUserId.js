/**
 * @param {Request | NextRequest} request
 * @returns {string | null}
 */
export function  getUserIdFromCookies(request) {
  try {
    const userId = request.cookies.get("userId")?.value;
    if (!userId) return null;
    console.log(userId + "userId is available here");
    return userId;
  } catch (error) {
    console.error("Failed to decode token in getUserIdFromCookies:", error);
    return null;
  }
}
