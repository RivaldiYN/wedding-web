import { cookies } from "next/headers";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return Boolean(session?.value && session.value === "authenticated_session_token");
}
