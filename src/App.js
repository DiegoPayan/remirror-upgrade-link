import { ExtensionPriority } from "remirror";
import { Remirror, useRemirror } from "@remirror/react";
import { DocExtension } from "remirror/extensions";
import { SubjectHeaderExtension } from "./extensions/SubjectHeaderExtension";

import "remirror/styles/all.css";
import "./App.css";

const App = () => {
  const { manager } = useRemirror({
    extensions: () => [
      new DocExtension({ content: "subject block*" }),
      new SubjectHeaderExtension(),
    ],
  });

  return (
    <div className="remirror-theme" style={{margin: "0 20px"}}>
      <Remirror manager={manager} />
    </div>
  );
};

export default App;
