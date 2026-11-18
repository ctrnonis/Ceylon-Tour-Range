/**
 * Launch mode.
 *
 * While PRE_LAUNCH is true, visitors to "/" see the coming-soon landing
 * page (app/(launch)/coming-soon). The full site is still built and
 * reachable for review at /preview and its own URLs, but it isn't linked
 * from the landing page and is hidden from search engines.
 *
 * To launch: set NEXT_PUBLIC_PRE_LAUNCH=false in Vercel (Settings →
 * Environment Variables) and redeploy. No code change needed.
 */
export const PRE_LAUNCH = process.env.NEXT_PUBLIC_PRE_LAUNCH !== "false";

/** Where the logo and "Home" links point inside the full site. */
export const HOME_HREF = PRE_LAUNCH ? "/preview" : "/";
