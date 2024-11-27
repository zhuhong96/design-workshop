/**
 * 随机颜色生成器
 */
export function randomColor(): string {
  // 不要白色
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - color.length) + color;
}
