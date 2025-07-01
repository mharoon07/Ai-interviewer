/**
 * @param {Request | NextRequest} request
 * @returns {string | null}
 */
export function getRoleFromCookies(request) {
  try {
    const role = request.cookies.get("role")?.value;
    if (!role) return null;
    console.log(role + "Role is available here");
    return role;
  } catch (error) {
    console.error("Failed to decode token in getUserIdFromCookies:", error);
    return null;
  }
}
