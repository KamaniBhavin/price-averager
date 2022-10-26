import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";


const App: React.FC = () => {
    return <div>
        <img src="logo.png"  alt="price-averager"/>
    </div>
}
const div = document.createElement('div')
div.id = "root"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);