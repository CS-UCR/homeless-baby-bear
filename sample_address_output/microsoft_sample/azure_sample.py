#! /usr/bin/env python
import os
import requests
import time
import json
import re

def main():
    # Add your Computer Vision subscription key and endpoint to your environment variables.
    if 'COMPUTER_VISION_SUBSCRIPTION_KEY' in os.environ:
        subscription_key = os.environ['COMPUTER_VISION_SUBSCRIPTION_KEY']
    else:
        print("\nSet the COMPUTER_VISION_SUBSCRIPTION_KEY environment variable.\n**Restart your shell or IDE for changes to take effect.**")
        sys.exit()

    if 'COMPUTER_VISION_ENDPOINT' in os.environ:
        endpoint = os.environ['COMPUTER_VISION_ENDPOINT']
    else:
        print("\nSet the COMPUTER_VISION_SUBSCRIPTION_ENDPOINT environment variable.\n**Restart your shell or IDE for changes to take effect.**")
        sys.exit()

    analyze_url = endpoint + "vision/v2.1/read/core/asyncBatchAnalyze"

    images_dir = "./rotated_pics"
    data_lines = [] # Stores all the output(uncleaned and cleaned to put into a txt file)

    for f_name in os.listdir(images_dir):
        if f_name.endswith('.jpg'):
            image_path = images_dir + '/' + f_name

            data_lines.append("--------------------" + f_name + " UNCLEANED--------------------\n")

            print("--------------------" + f_name + "--------------------")

            # Read the image into a byte array
            image_data = open(image_path, "rb").read()
            headers = {'Ocp-Apim-Subscription-Key': subscription_key,
                    'Content-Type': 'application/octet-stream'}
            params = {'visualFeatures': 'Categories,Description,Color'}
            response = requests.post(
                analyze_url, headers=headers, params=params, data=image_data)

            print("headers: ", response.headers)

            # If limit is reached, wait until more requests can be made
            while("Retry-After" in response.headers):
                time.sleep(int(response.headers['Retry-After']) + 1)
                response = requests.post(
                analyze_url, headers=headers, params=params, data=image_data)

            response.raise_for_status()

            # The recognized text isn't immediately available, so poll to wait for completion.
            analysis = {}
            poll = True
            while (poll):
                response_final = requests.get(
                    response.headers["Operation-Location"], headers=headers)
                analysis = response_final.json()
                time.sleep(1)
                if ("recognitionResults" in analysis):
                    poll = False
                if ("status" in analysis and analysis['status'] == 'Failed'):
                    poll = False

            # Adding uncleaned data
            for j in range(len(analysis["recognitionResults"][0]["lines"])):
                print(analysis["recognitionResults"][0]["lines"][j]["text"])
                data_lines.append(analysis["recognitionResults"][0]["lines"][j]["text"] + '\n')

            print("--------------------CLEANING DATA--------------------")
            data_lines.append("--------------------" + f_name + " CLEANED--------------------\n")

            street_address_regex = re.compile(r'\d{1,5}[\w\s]{1,20}.[\w\s]{1,20}(?:street|st|avenue|ave|road|rd|highway|hwy|square|sq|trail|trl|drive|dr|court|ct|park|parkway|pkwy|circle|cir|boulevard|blvd|lane|ln|way)\W?(?=\s|$)', re.IGNORECASE | re.MULTILINE) 
            zip_code_regex = re.compile(r'\b\d{5}(?:[-\s]\d{4})?\b', re.IGNORECASE | re.MULTILINE)

            has_street_match = False
            has_zipcode_match = False

            # print("street address and zipcode", street_address, zip_code)
            for i in range(len(analysis["recognitionResults"][0]["lines"])):
                street_match = re.search(street_address_regex, analysis["recognitionResults"][0]["lines"][i]["text"])
                zipcode_match = re.search(zip_code_regex, analysis["recognitionResults"][0]["lines"][i]["text"])

                # Added 'not has_street_match' in case there is more than one or more addressses
                if(street_match != None and not has_street_match):
                    has_street_match = True
                    data_lines.append("Extracted Street: " + street_match.group() + '\n')
                    print("Street:", street_match.group())
                elif(zipcode_match != None and not has_zipcode_match):
                    has_zipcode_match = True
                    data_lines.append("Extracted Zipcode: " + zipcode_match.group() + '\n')
                    print("Zip Code:", zipcode_match.group())


    # write into text file after all data has been added to data_lines
    with open("data.txt", 'w') as data_txt:
        for line in data_lines:
            data_txt.write(line)

if __name__ == "__main__":
    main()
