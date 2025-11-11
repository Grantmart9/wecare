declare module 'react-lottie' {
  import { Component } from 'react';

  interface LottieOptions {
    loop?: boolean;
    autoplay?: boolean;
    animationData?: any;
    rendererSettings?: {
      preserveAspectRatio?: string;
      [key: string]: any;
    };
  }

  interface LottieProps {
    options: LottieOptions;
    width?: string | number;
    height?: string | number;
    isStopped?: boolean;
    isPaused?: boolean;
    speed?: number;
    segments?: number[];
    direction?: number;
    ariaLabel?: string;
    role?: string;
    renderer?: 'svg' | 'canvas' | 'html';
    lottieRef?: (node: any) => void;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }

  export default class Lottie extends Component<LottieProps> {}
}