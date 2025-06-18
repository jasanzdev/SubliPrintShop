interface ProcessProps {
  sequence: number;
  title: string;
  description: string;
}

export function CardProcess({ sequence, title, description }: ProcessProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl font-bold text-purple-600">{sequence}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground">{description}</p>
    </div>
  );
}
