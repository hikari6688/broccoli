import { useEffect, useState } from "react";
import {
  Observable,
  fromEvent,
  of,
  map,
  first,
  last,
  from,
  interval,
  debounce,
  debounceTime,
  throttleTime,
} from "rxjs";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  interface IRequrst {
    name: string;
    agency: number;
  }

  interface IResponse {
    idCard: string;
    name: string;
    agency: number;
  }

  function loopHttpRequest<T = any>(freq: number, req: () => Promise<T>) {
    interval(freq).subscribe(async () => {
      const res = await req();
      console.log({ res });
    });
  }

  function request(): Promise<IResponse[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve([
          {
            name: "izumi",
            idCard: "1111111",
            agency: 12222,
          },
        ]);
      }, 5000);
    });
  }

  useEffect(() => {
    fromEvent(
      document.getElementById("trigger") as HTMLElement,
      "click"
    ).pipe(throttleTime(1000)).subscribe((e)=>{
      console.log(e)
    });
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <button id="trigger">点击</button>
      </div>
    </div>
  );
}

export default App;
