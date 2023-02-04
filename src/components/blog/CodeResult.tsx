import type { PropsWithChildren } from "react";

interface ICodeResult extends PropsWithChildren {
  label?: string;
}

export const CodeResult = ({ children, label }: ICodeResult) => {
  return (
    <div className="dark:text-slate-200 bg-card p-6 block rounded-lg dark:bg-card-dark mt-5 mb-5">
      <h3 className="text-1xl mb-3 font-bold">{label ? label : "Result"}</h3>
      <hr className="mb-3 border-black dark:border-white" />
      {children}
    </div>
  );
};
