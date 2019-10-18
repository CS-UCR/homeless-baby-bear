import string
import re
def detect_document( i,path):
    """Detects document features in an image."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)
    text_arr = []
    col_count = 2
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    if word_text not in string.punctuation:
                        text_arr.append(word_text)
                col_count += 1
    print(text_arr)
    i = i+1
    return [i,text_arr]


def clean_data(arr, text_arr):
    cleaned = []
    states = []
    with open("states.txt") as f:
        for line in f:
            for word in line:
                states.append(word)
    file = open("result.txt", "w")
    for doc in text_arr:
        digits = [0]
        address = ""
        if len(doc) < 8:
            for element in doc:
                address += element + ' '
            file.write(address+"\n")
            continue
        flag = 0
        for word in doc:
            if word in states and doc[doc.index(word)+1].isdigit() and doc.index(word) > 5:
                flag = 1
            if word.isalpha():
                if (word == "ave" or word == "Ave" or word == "AVE" or word == "st" or word == "St" or word == "Rd") and doc[doc.index(word) -1].isdigit():
                    digits.pop()
            if (len(word) == 5 and word.isdigit()) or flag == 1:
                if len(digits)>= 2:
                    temp_index = len(digits)-1
                    while doc.index(word) < digits[temp_index]+5 and temp_index != 0:
                        temp_index -= 1
                    if temp_index != 0:
                        temp_arr = doc[digits[temp_index]:doc.index(word)+1]
                    else:
                        digits.append(doc.index(word))
                        continue
                else:
                    if doc.index(word) >= 5:
                        temp_arr = doc[0:doc.index(word) + 1]
                    else:
                        digits.append(doc.index(word))
                        continue
                cleaned.append(temp_arr)
                if "MILLER" in temp_arr and "SABRINA" in temp_arr and "15000" in temp_arr:
                    digits = [doc.index("15000")+1]
                    continue
                for element in temp_arr:
                    address += element + " "
                file.write(address+"\n")
                break
            elif any(char.isdigit() for char in word):
                numberofLetter = 0
                for c in word:
                    if c.isalpha():
                        numberofLetter += 1
                if word.isdigit() or numberofLetter <2:
                    digits.append(doc.index(word))
    file.close()
    return cleaned


import os



os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./testproject_credentials.json"
i = 0
arr = os.listdir("photos")
text_arr = []

for x in arr:
    result = detect_document(i,  "photos/"+x)
    i = result[0]
    text_arr.append(result[1])
clean_data(arr, text_arr)
