import React from 'react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface MainWrapperProps {
  className?: string;
  children: ReactNode;
}

const slideUpFade: any = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 50, y: -30, transition: { duration: 0.2, ease: "easeIn" } },
};

const MainWrapper: React.FC<MainWrapperProps> = ({
  className,
  children
}) => {
  return (

      <div
        className={twMerge(
          "text-whitePrimary rounded-3xl  w-full",
          className
        )}
      >
        {children}
      </div>

  )
}

export default MainWrapper;