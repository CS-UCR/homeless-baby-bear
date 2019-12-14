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
To run the Web Interface, you should doing npm install in three locations:
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



Then, let's go back to the nodejs file and run the program on localhost:3000
```
cd ..
```
```
npm start
```
