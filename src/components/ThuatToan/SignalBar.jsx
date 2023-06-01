import React from "react";
import "./SignalBar.css";

const height = 10;
const SignalBars = ({ signalStrength }) => {
    const renderSignalBars = () => {
        const bars = [];
        for (let i = 0; i < 5; i++) {
            const isFilled = i < signalStrength;
            const barClass = isFilled ? "filled" : "empty";
            bars.push(
                <div
                    key={i}
                    style={{ height: `${height * i}px` }}
                    className={`signal-bar ${barClass}`}
                />
            );
        }
        return bars;
    };

    return <div className="signal-bars-container">{renderSignalBars()}</div>;
};

export default SignalBars;
