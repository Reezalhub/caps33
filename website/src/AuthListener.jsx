import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function AuthListener() {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function handleRedirect() {
      // If Supabase returned to us with an access token in the URL hash,
      // parse it so the client stores the session. This fixes the case
      // where OAuth sends the user back with a hash fragment (e.g. #access_token=...).
      try {
        if (window.location.hash.includes("access_token") || window.location.search.includes("provider_token")) {
          // Parse and store session from the URL (supabase-js v2)
          await supabase.auth.getSessionFromUrl({ storeSession: true });

          // Remove the hash to clean up the URL (optional)
          history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      } catch (e) {
        // continue even if parsing fails
      }

      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        if (mounted && session) {
          const currentPath = location.pathname.replace(/^\/caps33/, "");
          const authPaths = ["/", "/login", "/register", "/admin-login"];
          if (authPaths.includes(currentPath)) {
            nav("/home", { replace: true });
          }
        }
      } catch (e) {
        // ignore
      }
    }

    handleRedirect();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const currentPath = location.pathname.replace(/^\/caps33/, "");
        const authPaths = ["/", "/login", "/register", "/admin-login"];
        if (authPaths.includes(currentPath)) {
          nav("/home", { replace: true });
        }
      }
    });

    return () => {
      mounted = false;
      // unsubscribe if available
      if (sub && sub.subscription && typeof sub.subscription.unsubscribe === "function") {
        sub.subscription.unsubscribe();
      }
    };
  }, [nav, location]);

  return null;
}
