
for file in ./*.md; do
  NEWNAME=$(awk -F 'object/paleography:' '{print $2}' $file | tail -1 | grep [[:digit:]] | cut -d ']' -f 1)
  mv -v $file $NEWNAME.md
done

exit 1
