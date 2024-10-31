import React from 'react';

interface TeamPatchProps {
  name: string;
  imageUrl: string;
  color: string;
}

export default function TeamPatch({ name, imageUrl, color }: TeamPatchProps) {
  return (
    <div className="size-72 mx-auto flex items-end justify-center">
      <div className={`relative w-48 h-64 shadow-xl border-4 mx-auto rounded-tl-[100px] rounded-tr-[100px] flex items-center justify-center border-team-${color}-border bg-team-${color}-bg`}>
        <div className={`left-round-behind w-3 h-1 border-l-2 border-b-2 border-black bg-team-${color}-plaque-shadow rounded-bl-full absolute left-[calc(-1rem_-_0px)] bottom-2.5`} />
        <div className={`right-round-behind w-3 h-1 border-r-2 border-b-2 border-black bg-team-${color}-plaque-shadow rounded-br-full absolute right-[calc(-1rem_-_0px)] bottom-2.5`} />
        <div className="banner-text-bg bg-white bg-opacity-80 border-2 border-black h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-10 flex items-center justify-center text-white uppercase font-lg font-bold" />
        <div className={`banner-text-bg bg-team-${color}-plaque-shadow bg-opacity-80 border-2 border-black h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-20 flex items-center justify-center text-white uppercase text-xl font-bold font-[Squeak] [font-variant:none]`}>
          {name}
        </div>
        <div className="fake-corners absolute bottom-4 -left-3.5 -right-3.5">
          <div className="relative mt-[-2px]">
            <div className={`left-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-l-2 border-black w-2 h-3 absolute -left-0.5 -bottom-1 z-20`} />
            <div className={`left-rounded-corner bg-team-${color}-plaque-shadow border-l-2 border-t-2 rounded-tl-full border-black w-3 h-1 absolute -left-0.5 -bottom-1 z-20`} />
            <div className={`right-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-r-2 border-black w-2 h-3 absolute -right-0.5 -bottom-1 z-20`} />
            <div className={`right-rounded-corner bg-team-${color}-plaque-shadow border-r-2 border-t-2 rounded-tr-full border-black w-3 h-1 absolute -right-0.5 -bottom-1 z-20`} />
          </div>
        </div>
      </div>
      <img src={imageUrl} className="w-56 absolute -translate-y-2 z-10" alt={name} />
    </div>
  );
}