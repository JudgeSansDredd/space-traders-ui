interface PropType {
  label?: string;
  progress: number;
}

export default function Progress(props: PropType) {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${props.progress}%` }}
      >
        {props.label}
      </div>
    </div>
  );
}
