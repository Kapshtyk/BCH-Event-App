import React from "react";

// Spinning hollow circle with linear gradient color to show somethings happening.
export default function Working() {
    return (
        <li className="is-working">
            <svg viewBox="0 0 200 200">
                <defs>
                    <linearGradient id="MyGradient">
                        <stop offset="5%" stopColor="#0D7377" />
                        <stop offset="95%" stopColor="#14FFEC" />          
                    </linearGradient>
                </defs>
                <circle id="is-working-circle" cx="50%" cy="50%" r="50" stroke="url(#MyGradient)" strokeWidth="14" fill="none"></circle>
            </svg>
        </li>
    )
}