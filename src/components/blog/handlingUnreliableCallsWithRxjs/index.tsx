import React from "react";
import { Subject, map, mergeMap, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

type Action = {
  payload: {
    chaos: number;
    timeout: number;
  };
};

const action$ = new Subject<Action>();

const characters$ = (chaos: number, timeout: number) =>
  fromFetch(
    `http://127.0.0.1:5001/portfolio-c3f2e/us-central1/getCharacters?chaos=${chaos}&timeout=${timeout}`
  ).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    })
  );

const fetchCharacters$ = action$.pipe(
  switchMap((action) =>
    characters$(action.payload.chaos, action.payload.timeout)
  )
);

const useObservable = (observable: any) => {
  const [state, setState] = React.useState();

  React.useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};

export const App = () => {
  const [chaos, setChaos] = React.useState(0);
  const [timeout, setTimeout] = React.useState(0);
  const characters = useObservable(fetchCharacters$);

  const fetchData = async () => {
    action$.next({ payload: { chaos, timeout } });
  };

  return (
    <div className="flex-col">
      <div className="items-center mb-5">
        <label>Chaos:</label>
        <input
          className="border-gray-500 border-2 ml-2 text-stone-950"
          type="number"
          value={chaos}
          onChange={(e) => setChaos(e.target.valueAsNumber)}
        />
      </div>
      <div className="items-center mb-5">
        <label>Timeout:</label>
        <input
          className="border-gray-500 border-2 ml-2 text-stone-950"
          type="number"
          value={timeout}
          onChange={(e) => setTimeout(e.target.valueAsNumber)}
        />
      </div>
      <button
        className="p-2 bg-emerald-900 text-white w-32"
        onClick={fetchData}
      >
        Fetch data
      </button>
      <List items={characters} />
    </div>
  );
};

type Character = {
  name: string;
};

interface IList {
  items?: Character[];
}

const List = ({ items = [] }: IList) => {
  console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
};
