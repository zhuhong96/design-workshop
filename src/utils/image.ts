/**
 * 加载本地图片
 * @param src 图片路径
 * @returns
 */
export function loadImage(src: string) {
  return new URL(src, import.meta.url).href;
}
