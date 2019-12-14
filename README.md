# homeless-baby-bear A Million Thanks project

## Introduction
This project is meant to help out the charity, A Million Thanks, capture addresses from pictures of the mail they receive, creating a database to store the addresses and creating a web user interface to search and view statistics about all the senders. To help out we created a website that has these features. Our website consists of two main parts: The mail upload web pages and the statistics web pages. 
There are two mail upload related web pages: mail upload page and the change data page. The mail upload page is where the user can upload pictures from their computer through drag ‘n’ drop or by going through their file system and selecting the pictures. In the change data page a user can update any addresses in case any of the addresses extracted were inaccurate. 
There are three statistics related web pages: Mail sender heatmap, national stats and location stats. In the heatmap a person can view all the locations of the mail sent in through a map with a heatmap layer, where heat points are placed on locations where the mail was sent from. In the national stats page, one can see a collection of data on a national scale. Such as, the amount of mail sent in nationally across the US, the top 5 states/cities/date, and more. In the location stats page, one can search for an address or city and receive a graph with the amount sent from there over certain timeframes and a table with the addresses and the dates of the mail sent in.

## Download the program
Using the below code to download the code to local.
```
git clone https://github.com/CS-UCR/homeless-baby-bear.git
```

## Setting up the environment
If you haven't download npm & nodejs, go to the link below and follow the instruction download and install the npm and nodejs 
```
https://nodejs.org/en/
```
To run the Web Interface, you should do npm install in three locations:
```
cd fullstack_app
```
```
npm install
```


```
cd client
```
```
npm install
```



```
cd ../backend
```
```
npm install
```


##
Then, let's go back to the nodejs file and run the program on localhost:3000
```
cd ..
```
```
npm start
```
## Biographies
### Google Cloud Vision API 
```
https://cloud.google.com/vision/docs/handwriting#vision-document-text-detection-nodejs
```
### Microsoft Azure API
```
https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/concept-recognizing-text
```
### Amazon Textract
```
https://aws.amazon.com/textract/?trk=ps_a131L000005ur2VQAQ&trkCampaign=pac-MLAI-2019-webpage-product-putAIwork-textractPDP&sc_channel=ps&sc_campaign=pac-MLAI-2019-AIservices-PutAIwork-textarct-extractquickly&sc_outcome=AIML_Digital_Marketing&sc_geo=NAMER&sc_country=US&sc_publisher=Google&sc_mediumPAC-AIML-P%7CPS-GO%7CNon-Brand%7CAll%7CPA%7CMachine%20Learning%7CTextract%7CUS%7CEN%7CText%7Cxx&s_kwcid=AL!4422!3!378937603673!b!!g!!%2Bocr&ef_id=CjwKCAjw8NfrBRA7EiwAfiVJpS2D3flFADlgzmMHZ-Ak4_7vqNh2Fg4sJXRKgiRg30xejU0Bv9J7LhoC6t4QAvD_BwE:G:s
```
### MongoDB:
```
https://docs.mongodb.com/manual/
```
### Google Geocoding API: 
```
https://developers.google.com/maps/documentation/geocoding/start
```
### UPS Address Validation Street Level API: 
```
https://www.ups.com/us/en/services/technology-integration/address-validation-street-level.page
```
### Drag n drop frontend code snippet:
```
https://codepen.io/Ushinro/pen/NPQzOx
```
### Chartjs for the charts used in the stats web user interface:
```
https://www.chartjs.org/docs/latest/
```
### National stats dashboard inspiration:
```
https://demo.dashboardpack.com/architectui-react-free/#/dashboards/basic
```
### Tutorial used to build dashboard:
```
https://medium.com/better-programming/build-a-responsive-modern-dashboard-layout-with-css-grid-and-flexbox-bd343776a97e
```
### Material UI for frontend components like the navbar:
```
https://material-ui.com/
```
### Google Maps Javascript API for heatmap:
```
https://developers.google.com/maps/documentation/javascript/get-api-key
```
