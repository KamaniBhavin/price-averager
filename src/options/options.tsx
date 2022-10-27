import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import "./options.css"

const Option: React.FC = () => {
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    useEffect(() => {
        chrome.storage.sync.get("showOverlay")
            .then((data) => {
                if (data && data["showOverlay"] !== undefined) {
                    setShowOverlay(data["showOverlay"])
                }
            })
    }, [])

    const handleOnChange = () => {
        setShowOverlay(!showOverlay)
        chrome.storage.sync.set({"showOverlay": !showOverlay})
    }

    return <div className="option">
        <input
            type="checkbox"
            checked={showOverlay}
            onChange={handleOnChange}
            id="show-overlay"
        />
        <label htmlFor="show-overlay">
            Show average price of product as an overlay on the Amazon product search page?
        </label>
    </div>
}

const Options: React.FC = () => {
    return <>
        <div className="header">
            <h1>Options for Price Averager Plugin</h1>
        </div>
        <Option/>
    </>
}

const div = document.createElement('div')
div.id = "root"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Options/>
    </React.StrictMode>
);