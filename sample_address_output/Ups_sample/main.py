import requests
import xml.etree.ElementTree as ET
import pandas as pd
import re


def send_request(dictionary):
    url = "https://onlinetools.ups.com/webservices/XAV"
    headers = {'content-type': 'application/soap+xml'}
    body = ("<envr:Envelope xmlns:auth=\"http://www.ups.com/schema/xpci/1.0/auth\"\n"
            "    xmlns:envr=\"http://schemas.xmlsoap.org/soap/envelope/\"\n"
            "    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"\n"
            "    xmlns:upss=\"http://www.ups.com/XMLSchema/XOLTWS/UPSS/v1.0\"\n"
            "    xmlns:common=\"http://www.ups.com/XMLSchema/XOLTWS/Common/v1.0\"\n"
            "    xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n"
            "        <envr:Header>\n"
            "            <upss:UPSSecurity>\n"
            "                <upss:UsernameToken>\n"
            "                    <upss:Username>xwang296</upss:Username>\n"
            "                    <upss:Password>Chao0919</upss:Password>\n"
            "                </upss:UsernameToken>\n"
            "                <upss:ServiceAccessToken>\n"
            "                    <upss:AccessLicenseNumber>0D6E642A502FE015</upss:AccessLicenseNumber>\n"
            "                </upss:ServiceAccessToken>\n"
            "            </upss:UPSSecurity>\n"
            "        </envr:Header>\n"
            "        <envr:Body>\n"
            "            <XAV:XAVRequest xsi:schemaLocation=\"http://www.ups.com/XMLSchema/XOLTWS/xav/v1.0\"\n"
            "    xmlns:XAV=\"http://www.ups.com/XMLSchema/XOLTWS/xav/v1.0\">\n"
            "                <common:Request>\n"
            "                    <common:RequestOption>1</common:RequestOption>\n"
            "                </common:Request>\n"
            "                <XAV:MaximumListSize>10</XAV:MaximumListSize>\n"
            "                <XAV:AddressKeyFormat>\n"
            "                    <XAV:AddressLine>%s</XAV:AddressLine>\n"
            "                    <XAV:PoliticalDivision2>%s</XAV:PoliticalDivision2>\n"
            "                    <XAV:PoliticalDivision1>%s</XAV:PoliticalDivision1>\n"
            "                    <XAV:PostcodePrimaryLow>%s</XAV:PostcodePrimaryLow>\n"
            "                    <XAV:CountryCode>%s</XAV:CountryCode>\n"
            "                </XAV:AddressKeyFormat>\n"
            "            </XAV:XAVRequest>\n"
            "        </envr:Body>\n"
            "    </envr:Envelope>") % (dictionary["AddressLine"], dictionary["City"], dictionary["State"],
                                       dictionary["Zip"], dictionary["Country"])
    response = requests.post(url, data=body, headers=headers)
    return ET.fromstring(response.content)


def parse_etree(xml_etree):
    my_dict = {}
    for element in xml_etree[1][0][0], xml_etree[1][0][2]:
        for each in element:
            for info in each:
                my_dict[re.sub("[\{].*?[\}]", "", info.tag)] = info.text
    return my_dict


# we create the dataframe using the above function to pass a list of the dictionaries
# to the initialising function. The keys become the column names and the values the content

if __name__ == "__main__":
    address_dict = {"AddressLine": "3039 Agath Ln", "City": "Riverside", "State": "CA", "Zip": "92507",
                    "Country": "US"}
    etree = send_request(address_dict)
    response_dict = parse_etree(etree)
    print(response_dict["Code"])
    print(response_dict["Description"])
    print(response_dict["AddressLine"])
    print(response_dict["PoliticalDivision2"])
    print(response_dict["PoliticalDivision1"])
    print(response_dict["PostcodePrimaryLow"])
    print(response_dict["PostcodeExtendedLow"])
    print(response_dict["Region"])
    print(response_dict["CountryCode"])
'''
AddressLine
Code
CountryCode
Description
PoliticalDivision1
PoliticalDivision2
PostcodeExtendedLow
PostcodePrimaryLow
Region
'''