const AnimatedLine = ({ scaleTo }: { scaleTo: string }) => {
  return (
    <span
      className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 
  origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-${scaleTo}`}
    />
  );
};

export default AnimatedLine;
