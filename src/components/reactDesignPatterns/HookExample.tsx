import React from "react";

export const HookExample = () => {
  return <WindowDimension />;
};

const WindowDimension = () => {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
    </div>
  );
};

const useWindowDimensions = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return { width, height };
};
