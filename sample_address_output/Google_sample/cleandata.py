import re
lines = [line.rstrip('\n') for line in open('raw_data.txt')]
file = open("classify_raw.txt", "w")
file.write("-------------------POBOX-----------------"+"\n")
for line in lines:
    if "Box" in line:
        file.write("\n")
        arr = line.split()
        arr.index("Box")
        newline = ""
        print(line)

        if arr[arr.index("Box")-1] == "PO":
            arr.pop(arr.index("Box")-1)
        elif arr[arr.index("Box")-1] == "O":
            arr.pop(arr.index("Box")-1)
            arr.pop(arr.index("Box")-1)
        arr.remove("Box")
        for element in arr:
            newline += element  + " "
        print(newline)
        file.write(newline + "\n")

file.write("-------------------USPS-----------------"+"\n")
for line in lines:
    if "USPS" in line:
        print(line)
        file.write(line+"\n")
file.write("-------------------ORIGIN ID-----------------"+"\n")
for line in lines:
    if "ORIGIN ID" in line:
        print(line)
        file.write(line+"\n")
file.write("-------------------FedEx-----------------"+"\n")
for line in lines:
    if "FedEx" in line:
        print(line)
        file.write(line+"\n")

file.write("-------------------A MILLION THANKS-----------------"+"\n")
for line in lines:
    if "A MILLION THANKS" in line:
        print(line)
        file.write(line+"\n")
file.write("-------------------Other-----------------"+"\n")
for line in lines:
    if "BOX" not in line and "USPS" not in line and "ORIGIN ID" not in line and "FedEx" not in line and "A MILLION THANKS" not in line:
        print(line)
        arr = line.split()
        start = 0
        zipcode_place = len(arr)
        if "MAIL" in arr:
            start = arr.index("MAIL")
        if "FROM" in arr:
            start = arr.index("FROM")

        for element in reversed(arr):
            if element.isdigit() and len(element) == 5:
                zipcode_place = arr.index(element)
                break
        if zipcode_place == len(arr) and start == 0:
            file.write(line+"\n")
        else:
            if len(arr) - zipcode_place > 3:
                if start == 0:
                    for i in range(0, zipcode_place + 1):
                        file.write(arr[i] + " ")
                else:
                    for i in range(start+1, zipcode_place+1):
                        file.write(arr[i]+ " ")
            else:
                if start == 0:
                    file.write(line+"\n")
                else:
                    for i in range(start + 1, zipcode_place + 1):
                        file.write(arr[i] + " ")
            file.write("\n")


file.close()
