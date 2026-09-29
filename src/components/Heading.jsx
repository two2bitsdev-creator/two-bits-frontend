import TagLine from "./Tagline";
import { cn } from "@/lib/utils";

/**
 * Section title block — matches Contact (TagLine + h2 + body-1 lead).
 * Use `title` for plain text or `titleNode` for JSX (e.g. gradient spans).
 */
const Heading = ({ className, title, titleNode, text, tag, align = "center" }) => {
  const head = titleNode ?? title;

  return (
    <div
      className={cn(
        "relative mx-auto mb-14 max-w-[50rem] lg:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {tag ? (
        <TagLine className={cn("mb-4", align === "center" && "md:justify-center")}>{tag}</TagLine>
      ) : null}
      {head ? <h2 className="h2 mb-4 break-words sm:mb-6">{head}</h2> : null}
      {text ? (
        <p
          className={cn(
            "body-1 text-balance break-words text-n-2",
            align === "center" && "lg:mx-auto lg:max-w-2xl"
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
};

export default Heading;
