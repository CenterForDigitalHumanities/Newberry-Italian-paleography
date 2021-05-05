
for file in ./*.md; do
  NEWNAME=$(awk -F 'transcript_IP_' '{print $2}' $file| grep [[:digit:]]| cut -d ')' -f 1)
#  NEWNAME=$(awk -F 'IP_' '{print $2}' $file | tail -1 | grep [[:digit:]] | cut -d ')' -f 1)
  mv -v $file $NEWNAME.md
#  echo "$file : $NEWNAME"
done

exit 1
