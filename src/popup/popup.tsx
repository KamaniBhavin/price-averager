import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import Products from "./components/Products";
import Search from "./components/Search";

const App: React.FC = () => {
    return <div>
        <Search/>
        <Products/>
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