import { brainwaveWhiteSymbol } from "../../assets";
import ChatBubbleWing from "../../assets/svg/ChatBubbleWing";

/** Decorative layer removed — unified black page background. */
export const Gradient = () => {
  return null;
};

export const PhotoChatMessage = () => {
  return (
    <div className="absolute right-3 top-3 z-10 max-w-[min(17.5rem,calc(100%-1.5rem))] rounded-t-xl rounded-bl-xl bg-app-black px-4 py-4 font-code text-sm sm:right-6 sm:top-6 sm:max-w-[17.5rem] sm:px-8 sm:py-6 sm:text-base lg:top-16 lg:right-[8.75rem] animate-fade-in-up animation-delay-1000 hover:scale-105 transition-transform duration-300">
      Mobile App
      <br />
      released successfully
      <ChatBubbleWing className="absolute left-full bottom-0" />
    </div>
  );
};

export const VideoChatMessage = () => {
  return (
    <div className="absolute left-3 top-3 z-10 w-[calc(100%-1.5rem)] max-w-[14rem] rounded-t-xl rounded-br-xl border border-n-6/80 bg-app-black pb-7 pl-4 pr-2.5 pt-2.5 font-code text-sm sm:left-6 sm:top-6 sm:w-auto sm:max-w-[17.5rem] sm:pl-5 sm:text-base md:left-[3.125rem] animate-fade-in-up animation-delay-1200 hover:scale-105 transition-transform duration-300">
      Your app is secured
      <div className="absolute left-5 -bottom-[1.125rem] flex items-center justify-center w-[2.25rem] h-[2.25rem] bg-color-1 rounded-[0.75rem] animate-pulse">
        <img
          src={brainwaveWhiteSymbol}
          width={26}
          height={26}
          alt="Ping"
        />
      </div>
      <p className="tagline absolute right-2.5 bottom-1 text-[0.625rem] text-n-3 uppercase">
        just now
      </p>
      <ChatBubbleWing
        className="absolute right-full bottom-0 -scale-x-100"
        pathClassName="fill-app-black"
      />
    </div>
  );
};

export const VideoBar = () => {
  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center p-3 sm:p-6">
      <div className="flex-1 bg-[#D9D9D9]">
        <div className="w-1/2 h-0.5 bg-color-1"></div>
      </div>
    </div>
  );
};
