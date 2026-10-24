/**
 * Asset resolution and base path detection utility.
 * Seamlessly resolves image and asset URLs across:
 * - Live server custom domains (e.g. https://olivierpauwels.be/ -> '/')
 * - GitHub Pages repositories (e.g. https://username.github.io/olivier/ -> '/olivier/')
 * - Local AI Studio development server (http://localhost:3000/ -> '/')
 * - VS Code Live Server / static preview (e.g. http://127.0.0.1:5500/dist/ -> '/dist/')
 * - Direct file:// execution
 */

let resolvedBase: string | null = null;

export function getBaseUrl(): string {
  if (resolvedBase !== null) {
    return resolvedBase;
  }

  if (typeof window === 'undefined') {
    return '/';
  }

  // Handle local file:// protocol directly
  if (window.location.protocol === 'file:') {
    resolvedBase = './';
    return resolvedBase;
  }

  // 1. If an explicit absolute BASE_URL is set in Vite (e.g. '/olivier/'),
  // verify whether the current runtime URL actually contains it.
  const envBase = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL;
  if (envBase && envBase !== '/' && envBase !== './' && envBase !== '') {
    const cleanEnvBase = envBase.replace(/^\/+|\/+$/g, '');
    if (window.location.pathname.includes(cleanEnvBase)) {
      resolvedBase = envBase.endsWith('/') ? envBase : `${envBase}/`;
      return resolvedBase;
    }
  }

  // 2. Check if the current browser pathname indicates a subfolder
  const path = window.location.pathname;
  if (path.includes('/olivier')) {
    resolvedBase = '/olivier/';
    return resolvedBase;
  }
  if (path.includes('/dist')) {
    resolvedBase = '/dist/';
    return resolvedBase;
  }

  // 3. Fallback to root for standard live servers and dev server
  resolvedBase = '/';
  return resolvedBase;
}

/**
 * Asset URL resolver that automatically prefixes public assets with the
 * configured or runtime-detected base URL.
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Remove leading slashes
  const clean = path.replace(/^\/+/, '');
  const base = getBaseUrl();

  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}
