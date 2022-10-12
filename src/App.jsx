import { useState } from 'react';
import '../src/css/App.scss';

function App() {
  return (
    <div className="App">
      <div className="h-screen">
        <header className="bg-red-400">
          <h1 className="w-16 h-16 border">LOGO</h1>
        </header>
        <div className="flex h-full">
          <div className="w-16 h-full bg-slate-500">
            <div className="flex flex-col justify-between">
              <ul className="flex flex-col gap-28">
                <li>icon</li>
                <li>icon</li>
                <li>icon</li>
                <li>icon</li>
                <li>icon</li>
              </ul>
              <div>
                <p>Setting</p>
                <p>Icon</p>
              </div>
            </div>
          </div>
          <main className="w-full h-full flex justify-center items-center">
            <div className="w-4/5 h-full bg-slate-300 flex items-center justify-center">
              sign test
            </div>
            <div className="w-1/5 h-full bg-slate-500"></div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
