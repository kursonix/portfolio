import React from "react";

export const RenderPropChildrenExample = () => {
  return (
    <div>
      Format US
      <DateInput>{(date) => <FormatUS date={date} />}</DateInput>
      Format GB
      <DateInput>{(date) => <FormatGB date={date} />}</DateInput>
    </div>
  );
};

interface IDateInput {
  children: (date: string) => JSX.Element;
}

const DateInput = ({ children }: IDateInput) => {
  const [date, setDate] = React.useState("");

  return (
    <div>
      <span className="text-black">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </span>
      {children(date)}
    </div>
  );
};

interface IFormat {
  date: string;
}

const FormatUS = ({ date }: IFormat) => {
  if (!isValidDate(date)) {
    return <span></span>;
  }
  return <span>{new Date(date).toLocaleDateString("en-US")}</span>;
};

const FormatGB = ({ date }: IFormat) => {
  if (!isValidDate(date)) {
    return <span></span>;
  }
  return <span>{new Date(date).toLocaleDateString("en-GB")}</span>;
};

function isValidDate(text: string) {
  return isNaN(Date.parse(text)) ? false : true;
}
