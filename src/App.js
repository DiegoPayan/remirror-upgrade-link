import logo from "./logo.svg";
import "./App.css";

import { Remirror, useRemirror } from "@remirror/react";
import { LinkExtension } from "remirror/extensions";

const App = () => {
  const { manager } = useRemirror({
    extensions: () => [new LinkExtension({ autoLink: true })],
  });

  return (
    <div className="App">
      <Remirror manager={manager} />
    </div>
  );
};

export default App;
