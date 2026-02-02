export function getBasePath(): string {
  return process.env.NODE_ENV === "production" ? "/lives-in-weeks" : "";
}

export function withBasePath(path: string): string {
  return `${getBasePath()}${path}`;
}
