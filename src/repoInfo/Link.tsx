import { FC, MouseEventHandler, PropsWithChildren } from "react";

const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  void chrome.tabs.update({ url: e.currentTarget.href });
};
export const Link: FC<PropsWithChildren<{ to: string }>> = ({
  children,
  to,
}) => {
  return (
    <a href={to} onClick={clickHandler}>
      {children}
    </a>
  );
};
