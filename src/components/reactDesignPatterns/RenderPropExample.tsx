import React from "react";

export const RenderPropExample = () => {
  return (
    <div>
      Format US
      <DateInput render={(date) => <FormatUS date={date} />} />
      Format GB
      <DateInput render={(date) => <FormatGB date={date} />} />
    </div>
  );
};

interface IDateInput {
  render: (date: string) => JSX.Element;
}

const DateInput = ({ render }: IDateInput) => {
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
      {render(date)}
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
