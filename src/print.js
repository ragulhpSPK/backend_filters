import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import PrintFiles from "./printFiles";

function Print() {
  const componentRef = useRef();
  const [text, setText] = useState("hello");
  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <PrintFiles ref={componentRef} text={text} />
    </div>
  );
}

export default Print;
