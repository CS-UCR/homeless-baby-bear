import sys
import re

line = ""
for i in range(1, len(sys.argv)):
    line += sys.argv[i] + " "
    line = re.sub(r"[^\w]", " ", line)
    line = " ".join(line.split())
if "Box" in line:
    word_list = line.split()
    count = 0
    line = ""
    for element in word_list:
        line += element + " "
        if element.isdigit():
            count += 1
        if count == 2:
            break
    word_list = line.split()
    pos = word_list.index("Box")
    # remove "P O BOX" or "PO BOX"
    if word_list[pos-1] == "PO":
        word_list[pos-1] = "P.O."
    elif word_list[pos-1] == "O":
        word_list[pos-1] = "P.0."
        if word_list[pos-2] == "P":
            word_list[pos-1] = ""
            word_list[pos-2] = "P.O."
    line = ""
    for element in word_list:
        line += element + " "
    # remove email
    if "com" in line:
        line = line[line.find("com")+4:]
    line = " ".join(line.split())
    print(line)
elif "USPS" in line:
    # remove everything before sender
    if "FROM" in line:
        line = line[line.find("FROM")+5:]
    elif "PRIORITY" in line:
        line = line[line.find("PRIORITY")+9:]
        first_word = line.split()[0]
        # check if part of "MAIL" remain
        if first_word == "M" or first_word == "MA" or first_word == "MAI" or first_word == "MAIL":
            line = line[len(first_word)+1:]
    # remove info of us
    if "SHIP" in line:
        line = line[:line.find("SHIP")]
    print(line)
elif "ORIGIN ID" in line:
    line = line[line.find("ORIGIN")+28:]
    if "UNITED" in line:
        line = line[:line.find("UNITED")]
    print(line)
elif "FedEx" in line:
    # remove everything before name
    line = line[line.find("Sender")+7:]
    first_word = line.split()[0]
    if first_word == "s":
        line = line[2:]
    # remove everything after zip
    if "ZIP" in line:
        line = line[:line.find("ZIP")+9]
    # pick up first_name and last_name
    word_list = line.split()
    name = word_list[0] + " " + word_list[word_list.index("Name")-1]
    if "Company" in line:
        line = line[line.find("Company")+8:]
    # remove everything between company name and address
    word_list = line.split()
    if "Address" in line:
        pos = word_list.index("Address")
        word_list.pop(pos)
        for x in range(1, 5):
            if len(word_list[pos-x]) < 4:
                if word_list[pos-x] != "CO" and word_list[pos-x] != "INC":
                    word_list.pop(pos-x)
                else:
                    break
            elif word_list[pos-x].isdigit():
                word_list.pop(pos-x)
            else:
                break
    if "Dept Floor Suite Room" in line:
        pos = word_list.index("Dept")
        for x in range(4):
            word_list.pop(pos)
    if "City" in line:
        word_list.pop(word_list.index("City"))
    if "State" in line:
        word_list.pop(word_list.index("State"))
    if "ZIP" in line:
        word_list.pop(word_list.index("ZIP"))
    line = name + " "
    for element in word_list:
        line += element + " "
    print(line)
else:
    if "SHIP" in line:
        line = line[:line.find("SHIP")]
    arr = line.split()
    start = 0
    zipcode_place = len(arr)
    if "MAIL" in arr:
        start = arr.index("MAIL")
    if "FROM" in arr:
        start = arr.index("FROM")
    new_address = ""
    for element in reversed(arr):
        if element.isdigit() and len(element) == 5:
            zipcode_place = arr.index(element)
            break
    if zipcode_place == len(arr) and start == 0:
        print(line)
    else:
        if len(arr) - zipcode_place > 3:
            if start == 0:
                for i in range(0, zipcode_place + 1):
                    new_address += arr[i] + " "
                print(new_address)
            else:
                for i in range(start+1, zipcode_place+1):
                    new_address += arr[i] + " "
                print(new_address)
        else:
            if start == 0:
                print(line)
            else:
                for i in range(start + 1, zipcode_place + 1):
                    new_address += arr[i] + " "
                print(new_address)
