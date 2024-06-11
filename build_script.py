import os
from zipfile import ZipFile
dir1="src"
file1="manifest.json"
file2="README.md"
outputName="rotateMe.zip"


def main():
    # Create a ZipFile object
    with ZipFile(outputName, 'w') as zipObj:
        # Add multiple files to the zip
        zipObj.write(file1)
        zipObj.write(file2)
        zipObj.write(dir1)
        # Add all files in a directory to the zip
        for folderName, subfolders, filenames in os.walk(dir1):
            for filename in filenames:
                filePath = os.path.join(folderName, filename)
                zipObj.write(filePath)
    print("Zip file created!")

if __name__ == "__main__":
    main()