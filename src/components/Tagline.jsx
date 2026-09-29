import brackets from "../assets/svg/Brackets";

const TagLine = ({ className, children }) => {
  return (
    <div className={`tagline flex min-w-0 max-w-full items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-2 min-w-0 max-w-full text-center text-n-3 sm:mx-3">{children}</div>
      {brackets("right")}
    </div>
  );
};

export default TagLine;
