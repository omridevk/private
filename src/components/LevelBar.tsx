import "./LevelBar.scss";

interface LevelBarProps {
  width: number;
  fraction: number;
}

export default function LevelBar({ width, fraction }: LevelBarProps) {
  return (
    <div className="level-bar" style={{ maxWidth: width }}>
      <div
        className="level-bar__progress"
        style={{ width: `${fraction * 100}%` }}
      />
    </div>
  )
}
