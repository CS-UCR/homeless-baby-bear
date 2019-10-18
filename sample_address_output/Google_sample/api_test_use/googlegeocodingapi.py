from requests import get
from pprint import pprint
from json import dump
from csv import QUOTE_ALL, DictWriter
API_KEY = 'AIzaSyAWwGyXySCICwS8tp-Ap4OWhj7wTPVRJ0g'
def address_resolver(json):
    final = {}
    if json['results']:
        data = json['results'][0]
        for item in data['address_components']:
            for category in item['types']:
                data[category] = {}
                data[category] = item['long_name']
        final['street'] = data.get("route", None)
        final['state'] = data.get("administrative_area_level_1", None)
        final['city'] = data.get("locality", None)
        final['county'] = data.get("administrative_area_level_2", None)
        final['country'] = data.get("country", None)
        final['postal_code'] = data.get("postal_code", None)
        final['neighborhood'] = data.get("neighborhood",None)
        final['sublocality'] = data.get("sublocality", None)
        final['housenumber'] = data.get("housenumber", None)
        final['postal_town'] = data.get("postal_town", None)
        final['subpremise'] = data.get("subpremise", None)
        final['latitude'] = data.get("geometry", {}).get("location", {}).get("lat", None)
        final['longitude'] = data.get("geometry", {}).get("location", {}).get("lng", None)
        final['location_type'] = data.get("geometry", {}).get("location_type", None)
        final['postal_code_suffix'] = data.get("postal_code_suffix", None)
        final['street_number'] = data.get('street_number', None)
    return final
def get_address_details(address,):
    url = 'https://maps.googleapis.com/maps/api/geocode/json?components=&language=&region=&bounds=&key='
    url = url + API_KEY
    url = url + '&address='+ address.replace(" ","+")
    response = get(url)
    data  = address_resolver(response.json())
    data['address'] = address
    return data
if __name__ == '__main__':
    """
    Provide the address via csv or paste it here 
    """
    address_to_search = []
    # address_to_search = list(DictReader("path/to/csv/file"))

    f = open("result.txt", "r")
    for x in f:
        address_to_search.append(x)
    f.close()
    data = []
    for i in address_to_search:
        data.append(get_address_details(i))
    with open("data.csv",'w') as csvfile:
        csvwriter = DictWriter(csvfile, fieldnames=data[0].keys(), quoting=QUOTE_ALL)
        csvwriter.writeheader()
        csvwriter.writerows(data)