# Price Averager

A basic **Chrome extension** for scraping data from the **[Amazon.com](https://amazon.com)** search page, saving it to a
database, and calculating the average of past data.

## Usage

From a terminal

1. Clone this project  `https://github.com/KamaniBhavin/price-averager.git` and cd into it `cd price-averager`.
2. Run `npm run zip` to install used libraries & create a distribution file called `price_averager.zip` under build directory.
3. Load the project into Chrome
   browser ([refer for help](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked))
   .

## Scrape Products from Search Results

1. Perform a search on [amazon.com](https://amazon.com) for any product that piques your interest.
2. Data from the listing page will be scraped by the extension.
3. Click on any item in the listing to view the average
   price overlay on the product information page in the right-top corner.
   (If the product has previous data available)

## Extension Options

1. The extension's options page allows you to toggle the overlay on or off.

## [Screen records](https://www.loom.com/share/a75efcacfbf246bc8402f090b29c12b3)

![Price Averager](https://user-images.githubusercontent.com/46283833/198567477-f98bc753-245d-422a-83db-cc1abe1f56f4.gif)
