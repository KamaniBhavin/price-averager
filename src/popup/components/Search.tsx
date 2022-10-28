import React, {useEffect, useState} from "react";

/*
    Display current product search in the popup from the local storage.
 */
const Search: React.FC = () => {
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        chrome.storage.local.get("search")
            .then((s: { [k: string]: Message }) => {
                if (s["search"] && s["search"].type === "productSearch" && s["search"].data) {
                    setSearch(s["search"].data)
                }
            })
    }, [search])

    return <>
        {search ? <div className="search">{search}</div> : <div className="search">Price Averager</div>}
    </>
}

export default Search