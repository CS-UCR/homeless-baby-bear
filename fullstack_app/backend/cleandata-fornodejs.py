
import sys

line = ""
for i in range(1, len(sys.argv)):
    line+=sys.argv[i] +" "
if "Box" in line:
    arr = line.split()
    arr.index("Box")
    newline = ""

    if arr[arr.index("Box")-1] == "PO":
        arr.pop(arr.index("Box")-1)
    elif arr[arr.index("Box")-1] == "O":
        arr.pop(arr.index("Box")-1)
        arr.pop(arr.index("Box")-1)
    arr.remove("Box")
    for element in arr:
        newline += element  + " "
    print(newline)


if "USPS" in line:
    print(line)


if "ORIGIN ID" in line:
    print(line)


if "FedEx" in line:
    print(line)



if "A MILLION THANKS" in line:
    print(line)


if "BOX" not in line and "USPS" not in line and "ORIGIN ID" not in line and "FedEx" not in line and "A MILLION THANKS" not in line:
    arr = line.split()
    start = 0
    zipcode_place = len(arr)
    if "MAIL" in arr:
        start = arr.index("MAIL")
    if "FROM" in arr:
        start = arr.index("FROM")
    new_address=""
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
                    new_address+= arr[i] + " "
            else:
                for i in range(start+1, zipcode_place+1):
                    new_address+= arr[i]+ " "
        else:
            if start == 0:
                print(line)
            else:
                for i in range(start + 1, zipcode_place + 1):
                    new_address+=arr[i] + " "
                print(new_address)
