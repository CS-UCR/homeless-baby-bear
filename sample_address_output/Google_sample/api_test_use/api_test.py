import string
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
                word_arr = []
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    if word_text not in string.punctuation:
                        word_arr.append(word_text)
                col_count += 1
            text_arr += word_arr
    i = i+1
    return [i,text_arr]


def clean_data(arr, text_arr):
    cleaned = []
    file = open("result.txt", "w")
    for doc in text_arr:
        last_digit = 0
        address = ""
        for word in doc:
            if len(word) == 5 and word.isdigit():
                temp_arr = doc[last_digit:doc.index(word)+1]
                cleaned.append(temp_arr)
                for element in temp_arr:
                    address += element + " "
                file.write(address+"\n")
                break
            elif any(char.isdigit() for char in word):
                    last_digit = doc.index(word)
    file.close()
    print(cleaned)
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
