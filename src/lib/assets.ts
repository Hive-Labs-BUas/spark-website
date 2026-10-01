// Media lives in the MinIO "assets" bucket; keys mirror the old src/assets paths.
const ASSETS_URL = (import.meta.env["VITE_ASSETS_URL"] ?? "").replace(/\/+$/, "");

export const assetUrl = (path: string) => `${ASSETS_URL}/${path.replace(/^\/+/, "")}`;
