filename1 = input("Enter the first file name:")
filename2 = input("Enter the second file name:")

with open(filename1, "r") as csv1, open (filename2, "r") as csv2:
    lines1 = csv1.readlines()
    lines2 = csv2.readlines()

same = 1

for row in lines1:
    if row not in lines2:
        print("Not the same/n")
        print(row)
        same = 0

if same is 1:
    print("The files are the same")

