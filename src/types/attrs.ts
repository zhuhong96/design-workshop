
/**
 * 水平翻转/锤子翻转
 */
export const IFlip = ['horizontal', 'vertical'] as const;

export type IFlipKeys = typeof IFlip[number];

// {
//   HORIZONTAL : 'horizontal',
//   VERTICAL : 'vertical',
// };


export interface IAttrsParams {
  textarea?: string, // 文本内容
  fontSizeStroke?: number, // 描边大小
  strokeColor?: string, // 描边颜色
  fontSize?: number, // 字体大小
  opacity?: number,  // 透明度
  rotate?: number, // 旋转角度
  textColor?: string, // 字体颜色
}

