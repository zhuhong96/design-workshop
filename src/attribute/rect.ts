import { IRect } from '@leafer-ui/interface';

const rectAttribute = {
  // 矩形
  rect: {
    width: 200,
    height: 200,
  } as IRect,
  // 矩形圆角
  rectRound: {
    width: 200,
    height: 200,
    cornerRadius: 20,
  } as IRect,
  // 矩形菱形
  rectDiamond: {
    width: 200,
    height: 200,
    cornerRadius: [0, 80, 40, 80],
  } as IRect,
} as const;

export type IRectAttribute = keyof typeof rectAttribute;

export default rectAttribute;
