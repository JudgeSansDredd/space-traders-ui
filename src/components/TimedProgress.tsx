import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Progress from './Progress';

interface PropType {
  startTime: string;
  endTime: string;
}

export default function TimedProgress({ startTime, endTime }: PropType) {
  const start = DateTime.fromISO(startTime);
  const end = DateTime.fromISO(endTime);
  const [progress, setProgress] = useState<number>(0);

  const calculateProgress = () => {
    const now = DateTime.now();
    const total = end.diff(start).as('seconds');
    const elapsed = now.diff(start).as('seconds');
    return Math.round((elapsed / total) * 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(calculateProgress());
    });
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <Progress
      progress={progress < 100 ? progress : 100}
      label={`${progress}%`}
    />
  );
}
