// Reusable grunge section divider / decorator
const assets = {
  inkSplatter: '../assets/elemen2.png',
  brushStroke: '../assets/elemen3.png',
  grungeCorner: '../assets/elemen5.png',
  brushSlash: '../assets/elemen1.png',
  grungeDiagonal: '../assets/elemen4.png',
};

export function InkSplatter({ className = '', style = {}, opacity = 0.12 }) {
  return (
    <img
      src={assets.inkSplatter}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'multiply', ...style }}
    />
  );
}

export function BrushStroke({ className = '', style = {}, opacity = 0.15 }) {
  return (
    <img
      src={assets.brushStroke}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'multiply', ...style }}
    />
  );
}

export function GrungeCorner({ className = '', style = {}, opacity = 0.2 }) {
  return (
    <img
      src={assets.grungeCorner}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'multiply', ...style }}
    />
  );
}

export function BrushSlash({ className = '', style = {}, opacity = 0.15, inverted = false }) {
  return (
    <img
      src={assets.brushSlash}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none w-full ${className}`}
      style={{ opacity, mixBlendMode: 'multiply', filter: inverted ? 'invert(1)' : 'none', ...style }}
    />
  );
}

export function GrungeDiagonal({ className = '', style = {}, opacity = 0.15 }) {
  return (
    <img
      src={assets.grungeDiagonal}
      alt=""
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'multiply', ...style }}
    />
  );
}