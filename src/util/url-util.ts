export function getAbsUrl(basePath: string, relUrl: string): string {
  const fullUrl = window.location.href;
  const urlObj = new URL(fullUrl);


  const baseUrl = urlObj.port
    ? `${urlObj.protocol}//${urlObj.hostname}:${urlObj.port}`
    : `${urlObj.protocol}//${urlObj.hostname}`;
  return `${baseUrl}${basePath==="/" ? "" : basePath }/${relUrl}`;
}
