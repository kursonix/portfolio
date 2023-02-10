import type { PropsWithChildren } from "react";

interface ICard extends PropsWithChildren {}

export const Card = ({ children }: ICard) => {
  return (
    <div className="dark:text-slate-200 bg-card p-6 block rounded-lg dark:bg-card-dark mt-5 mb-5">
      {children}
    </div>
  );
};
