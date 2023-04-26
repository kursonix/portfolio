import React from "react";
import {
  Observable,
  Subject,
  catchError,
  map,
  mergeMap,
  of,
  retry,
  startWith,
  switchMap,
  timer,
  zip,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

type Action = {
  payload: {
    chaos: number;
    timeout: number;
  };
};

const action$ = new Subject<Action>();

type Character = {
  id: string;
  name: string;
};

interface DataResponse {
  loading: boolean;
  data: Character[];
  error?: boolean;
  message?: string;
}

function delayFetch(URL: string) {
  return zip(fromFetch(URL), timer(500)).pipe(
    retry(4),
    map(([data]) => data)
  );
}

const characters$ = (
  chaos: number,
  timeout: number
): Observable<DataResponse> =>
  delayFetch(
    `http://127.0.0.1:5001/portfolio-c3f2e/us-central1/getCharacters?chaos=${chaos}&timeout=${timeout}`
  ).pipe(
    switchMap((response) => {
      return response.json();
    }),
    retry(4),
    map((data) => ({ loading: false, data })),
    catchError(() => of({ loading: false, data: [], error: true })),
    startWith({ loading: true, data: [] })
  );

const fetchCharacters$ = action$.pipe(
  switchMap((action) =>
    characters$(action.payload.chaos, action.payload.timeout)
  )
);

const useObservable = <T,>(observable$: Observable<T>) => {
  const [state, setState] = React.useState<T | undefined>();

  React.useEffect(() => {
    const sub = observable$.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable$]);

  return state;
};

export const App = () => {
  const [chaos, setChaos] = React.useState(0);
  const [timeout, setTimeout] = React.useState(0);
  const data = useObservable(fetchCharacters$);

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
      <div className="pt-5 h-56 overflow-auto justify-center flex flex-col">
        {data?.loading ? (
          <div className="self-center">Loading...</div>
        ) : data?.error ? (
          <div className="self-center text-red-600">Error</div>
        ) : (
          <List items={data?.data} />
        )}
      </div>
    </div>
  );
};

interface IList {
  items?: Character[];
}

const List = ({ items = [] }: IList) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
