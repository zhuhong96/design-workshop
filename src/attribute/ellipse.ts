import { IEllipse } from '@leafer-ui/interface';

const ellipseAttribute = {
  ellipse: {} as IEllipse,

  // 环形
  ring: {
    innerRadius: 0.5,
  } as IEllipse,

  // 扇形圆环
  sector: {
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
  },
} as const;

export type IEllipseAttribute = keyof typeof ellipseAttribute;

export default ellipseAttribute;
