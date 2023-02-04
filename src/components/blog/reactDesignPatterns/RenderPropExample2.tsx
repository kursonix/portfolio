export const RenderPropExample2 = () => {
  return (
    <div>
      <TextProp render={() => <h1>Loerm ipsum</h1>} />
      <TextProp render={() => <h2>Loerm ipsum</h2>} />
    </div>
  );
};

interface ITextProp {
  render: () => JSX.Element;
}

const TextProp = ({ render }: ITextProp) => {
  return render();
};
