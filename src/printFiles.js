import { forwardRef } from "react";
import Product from "./Product";
import Categories from "./Categories";
import SubCategories from "./SubCategories";

const PrintFiles = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div>
        <div className="h-[100vh]">
          <SubCategories />
        </div>
        <div className="h-[100vh]">
          <Categories />
        </div>
      </div>
    </div>
  );
});

export default PrintFiles;
