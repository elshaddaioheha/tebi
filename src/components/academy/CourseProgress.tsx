interface Props {
  completed: number;
  total: number;
}

export default function CourseProgress({ completed, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-primary/60">Progress</span>
        <span className="font-semibold text-primary">
          {completed}/{total} lessons · {pct}%
        </span>
      </div>
      <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
