# Web application for A Million Thanks Inc. backend

## Backend APIs
``` bash
    1. Heat map page: Search all data form database
        method: GET
        url: '/getData'
        return (success):
            'success': 'true';
            'data': data;
        return (unsuccess):
            'success': 'false';
            'error': error message

    2. Change data page & home page: Search by time period and type
        method: POST
        url: '/getData_bydate'
        parameters:
            'fromDate': date;
            'toDate': date;
            'location_type': location type;
        return (success):
            'success': 'true';
            'data': data

    3. Change data page: Correct the address of image
        method: POST
        url: '/updateAddress'
        parameters:
            '_id': address id;
            'address': new address;
        return (success):
            'success': 'true';

    4. Change data page: Correct the name of image
        method: POST
        url: '/updateName'
        parameters:
            '_id': address id;
            'name': new name;
        return (success):
            'success': 'true';
        return (unsuccess):
            'success': 'false';
            'error': error message

    5. Upload page: Upload the file
        method: POST
        url: '/upload'

    6. Change data page: Delete a record of image
        method: DELETE
        url: '/deleteData'
        parameters:
            'id': picture id;
            'picture': picture name;

    7. Location stat page: Search by query
        method: POST
        url: '/search'
        parameters:
            'query': query to search;
        return (success):
            'success': 'true';
            'data': data;
        return (unsuccess):
            'success': 'false';

    8. Location stat page: Search by latitude and longitude
        method: POST
        url: '/searchlatlong'
        parameters:
            'lat': latitude;
            'long': longitude;
        return (success):
            'success': 'true';
            'data': data;
        return (unsuccess):
            'success': 'false';

    9. Location stat page: Search by city name
        method: POST
        url: '/searchcitystate'
        parameters:
            'city': city;
            'state': state;
        return (success):
            'success': 'true';
            'data': data;
        return (unsuccess):
            'success': 'false';

    10. Change data page: Export to CSV
        method: POST
        url: '/writetocsv'
        parameters:
            'data': data;
        return (success):
            'success': 'true';

```
