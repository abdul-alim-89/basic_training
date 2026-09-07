#!/bin/bash

# 1. Create a folder named 'sample' in the home directory
mkdir -p "$HOME/sample"

# Move into the sample directory
cd "$HOME/sample" || exit

# 2. Create sample.txt
touch sample.txt

# 3. Add content to sample.txt
echo "Hi! This is just a sample text file created using shell script." > sample.txt

# 4. Print the contents of the file
echo "Contents of sample.txt:"
cat sample.txt

# 5. Print the number of occurrences of the letter 't'
echo "Number of occurrences of letter 't':"
grep -o "t" sample.txt | wc -l

# 6. Give the owner read, write, and execute permissions
chmod u+rwx sample.txt

# 7. Append additional content to sample.txt
echo "Hi! This is just another sample text added to file." >> sample.txt

# 8. Give the group only read permission
chmod g=r sample.txt

# 9. Deny all permissions to other users
chmod o= sample.txt

# Display current permissions
echo "Current permissions:"
ls -l sample.txt

# 10. Create sample2.txt with content similar to sample.txt
cp sample.txt sample2.txt

# 11. Add 1000 random lines to sample.txt
for i in {1..1000}
do
    echo "Random line number $i: $RANDOM" >> sample.txt
done

# 12. Print the top 50 lines
echo "First 50 lines of sample.txt:"
head -n 50 sample.txt

# 13. Print the bottom 50 lines
echo "Last 50 lines of sample.txt:"
tail -n 50 sample.txt

# 14. Create five additional files
touch prog1.txt prog2.txt program.txt code.txt info.txt

# 15. List files containing 'prog' in their names
echo "Files containing 'prog':"
ls | grep "prog"

# 16. Create a function so that 'list prog' gives the same output
list() {
    ls | grep "$1"
}

echo "You can now run: list prog"
