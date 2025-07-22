import bounceStyles from './dotBounce.module.css';
import circleStyles from './dotCircle.module.css';
import lineCircleStyles from './lineCircle.module.css';
const LoadingSpinner = () => null;

const DotBounce = ({ dotCount = 5, dotSize = 15, dotGap = 10 }) => {
  const containerStyle = {
    gap: `${dotGap}px`,
  };

  const dotStyle = (i: number) => {
    return {
      '--i': i,
      opacity: (i + 1) / dotCount,
      width: `${dotSize}px`,
      '--total-animation-duration': `${0.15 * (dotCount + 3)}s`,
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

const DotCircle = ({ dotCount = 8, dotSize = 12, distanceFromCenter = 30 }) => {
  const containerStyle = {
    width: distanceFromCenter * 2 + dotSize,
  };

  const dotStyle = (i: number) => {
    return {
      '--i': i,
      width: `${dotSize}px`,
      '--distance': `${distanceFromCenter}px`,
      '--degree': `${360 / dotCount}deg`,
      '--total-animation-duration': `${0.1 * dotCount}s`,
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

const LineCircle = ({ lineWeight = 8, distanceFromCenter = 30 }) => {
  const containerStyle = {
    width: `${distanceFromCenter * 2 + lineWeight}px`,
    '--lineWeight': `${lineWeight}px`,
  };

  return <div className={lineCircleStyles['container']} style={containerStyle}></div>;
};

LoadingSpinner.dotBounce = DotBounce;
LoadingSpinner.dotCircle = DotCircle;
LoadingSpinner.lineCircle = LineCircle;

export default LoadingSpinner;
