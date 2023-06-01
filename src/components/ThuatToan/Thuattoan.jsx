import { useEffect, useState } from "react";
import "./Grid.css";

//style
// .grid {
//   display: grid;
//   grid-template-columns: repeat(6, 100px);
//   grid-template-rows: repeat(5, 100px);
//   gap: 1px;
// }

// .row {
//   background-color: lightgray;
//   border: 1px solid gray;
//   width: 100px;
//   height: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
// .rowActive {
//   background: blue;
// }

const Grid = () => {
    const [selected, setSelected] = useState({ row: NaN, col: NaN });
    const numRows = 5;
    const numCols = 6;
    useEffect(() => {
        console.log(selected);
    }, [selected]);
    // Tạo mảng chứa các hàng và cột
    const grid = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++)
            grid.push(
                <div
                    onMouseEnter={() => {
                        setSelected({
                            row,
                            col,
                        });
                    }}
                    className={
                        row <= selected.row && col <= selected.col
                            ? "rowActive row"
                            : "row"
                    }
                    key={row}
                >
                    {`${row} ${col}`}
                </div>
            );
    }

    return <div className="grid">{grid}</div>;
};

export default Grid;
