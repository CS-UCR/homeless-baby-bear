import boto3
import json
import sys
import pprint

textract = boto3.client(
    service_name='textract',
    region_name='us-west-2')

s3 = boto3.resource('s3')
s3BucketName = "179s3"
fo = open("address.txt","w")
try:
    for x in range(2799,2840):
        documentName = 'CS179pic/IMG_'+str(x)+'.JPG'
        response = textract.detect_document_text(
            Document={
                'S3Object':{
                    'Bucket':s3BucketName,
                    'Name':documentName
                    #'Name':str(sys.argv[1])
                }
            }
        )
        for item in response["Blocks"]:
            if item["BlockType"] == "LINE":
                print ('\033[94m' + item["Text"] + '\033[0m')
                fo.write(item["Text"]+"\n")
        print ('')
        fo.write("\n")
except Exception as e :
    print ('0')
fo.close()
'''
import boto3
from boto3.s3.connection import S3Connection

# Document
s3BucketName = "179s3"
documentName = "CS179pic/"

# Amazon Textract client
textract = boto3.client('textract')

for file_key in s3BucketName.list():
    documentName = "CS179pic/"+"file_key.name"
    response = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': s3BucketName,
                'Name': documentName
            }
        }
    )
# Call Amazon Textract
response = textract.detect_document_text(
    Document={
        'S3Object': {
            'Bucket': s3BucketName,
            'Name': documentName
        }
    }
)
#print(response)

# Print detected text
for item in response["Blocks"]:
    if item["BlockType"] == "LINE":
        print ('\033[94m' +  item["Text"] + '\033[0m')

'''
