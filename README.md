# Frontend assignment
## Dashboard with historic and live view of data represented by OHLC charts
### Build using React and Next.js

Functional components and hooks  
Service worker to cache response for offline mode  
Test cases using jest and react-testing-library  
Third party libs: react-stockcharts to plot OHCL chart, bootswatch for css

### Run the app
#### Step 1
Install dependencies: `npm install`
#### Step 2
Start server: `npm start`
##### Build: `npm run build`
##### Test: `npm test`

### Folder structure
`offline`  
 &#x21A6; `serviceWorker.js`  
`pages`  
 &#x21A6; `index.js`  
`public/images`  
 &#x21A6; `favicon.ico`  
`src/components`  
 &#x21A6; `ErrorBoundary.js`  
 &#x21A6; `LiveView.js`  
 &#x21A6; `OHLCChart.js`  
 &#x21A6; `Overview.js`  
 &#x21A6; `Overview.spec.js`  
 &#x21A6; `Tabs.js`  
 &#x21A6; `Tabs.spec.js`  
`src/libs`  
 &#x21A6; `Chart.js`  
`src/utlis`  
 &#x21A6; `getData.js`  
 &#x21A6; `getData.spec.js` 
