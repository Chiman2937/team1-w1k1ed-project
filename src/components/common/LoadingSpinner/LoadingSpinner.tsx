import bounceStyles from './dotBounce.module.css';
import circleStyles from './dotCircle.module.css';
import lineCircleStyles from './lineCircle.module.css';
const LoadingSpinner = () => null;

const DotBounce = ({
  themeColor = '#ffffff',
  dotCount = 5,
  dotSize = 15,
  dotGap = 10,
  bounceHeight = 10,
  bounceSpeed = 0.15,
}) => {
  const containerStyle = {
    gap: `${dotGap}px`,
  };

  const dotStyle = (i: number) => {
    return {
      '--i': i,
      '--theme-color': themeColor,
      '--total-animation-duration': `${bounceSpeed * (dotCount + 3)}s`,
      '--jump-distance': `${-bounceHeight}px`,
      '--fall-distance': `${bounceHeight * 0.66}px`,
      '--bounce-speed': `${bounceSpeed}s`,
      opacity: (i + 1) / dotCount,
      width: `${dotSize}px`,
    };
  };

  return (
    <div className={bounceStyles['container']} style={containerStyle}>
      {new Array(dotCount).fill(0).map((_, i) => (
        <div key={i} className={bounceStyles['dot']} style={dotStyle(i)}></div>
      ))}
    </div>
  );
};

const DotCircle = ({
  themeColor = '#ffffff',
  dotCount = 8,
  dotSize = 12,
  distanceFromCenter = 30,
  spinSpeed = 1,
}) => {
  const containerStyle = {
    width: distanceFromCenter * 2 + dotSize,
  };

  const dotStyle = (i: number) => {
    return {
      '--i': i,
      '--theme-color': themeColor,
      width: `${dotSize}px`,
      '--distance': `${distanceFromCenter}px`,
      '--degree': `${360 / dotCount}deg`,
      '--animation-duration': `${spinSpeed}`,
      '--total-animation-duration': `${(spinSpeed / 10) * dotCount}s`,
      '--animation-delay': `${i * (spinSpeed / 10)}s`,
    };
  };

  return (
    <div className={circleStyles['container']} style={containerStyle}>
      {new Array(dotCount).fill(0).map((_, i) => (
        <div key={i} className={circleStyles['dot']} style={dotStyle(i)}></div>
      ))}
    </div>
  );
};

const LineCircle = ({
  themeColor = '#ffffff',
  lineWeight = 8,
  distanceFromCenter = 30,
  spinSpeed = 1,
}) => {
  const containerStyle = {
    '--theme-color': themeColor,
    width: `${distanceFromCenter * 2 + lineWeight}px`,
    '--lineWeight': `${lineWeight}px`,
    '--spin-speed': `${spinSpeed}s`,
  };

  return <div className={lineCircleStyles['container']} style={containerStyle}></div>;
};

LoadingSpinner.dotBounce = DotBounce;
LoadingSpinner.dotCircle = DotCircle;
LoadingSpinner.lineCircle = LineCircle;

export default LoadingSpinner;
