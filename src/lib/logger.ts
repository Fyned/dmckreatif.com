/**
 * Dev-only logger — silenced in production builds.
 * Vite tree-shakes the bodies when import.meta.env.DEV is false.
 */
const isDev = import.meta.env.DEV;

export const logger = {
  error(tag: string, ...args: unknown[]) {
    if (isDev) console.error(`[${tag}]`, ...args);
  },
  warn(tag: string, ...args: unknown[]) {
    if (isDev) console.warn(`[${tag}]`, ...args);
  },
  info(tag: string, ...args: unknown[]) {
    if (isDev) console.info(`[${tag}]`, ...args);
  },
};
