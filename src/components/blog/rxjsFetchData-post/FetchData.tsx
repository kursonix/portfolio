import { mergeMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const endpoint =
  "https://us-central1-portfolio-c3f2e.cloudfunctions.net/getColors";

const fetch$ = fromFetch(endpoint).pipe(
  mergeMap((response) => response.json())
);

export const FetchData = () => {
  const fetchData = () => {
    console.log("fetchdasdas");
  };

  return (
    <button className="p-2 bg-emerald-900 text-white w-32" onClick={fetchData}>
      Fetch data
    </button>
  );
};
