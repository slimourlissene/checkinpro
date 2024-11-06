export default function InfoRow({
  icon,
  text,
}: {
  icon: JSX.Element;
  text: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm font-semibold capitalize text-muted-foreground ">
        {text}
      </span>
    </div>
  );
}
