inotifywait -m ./uploads -e create -e moved_to |
    while read dir action file; do
        echo "The file '$file' appeared in directory '$dir' via '$action'"

	name=$(echo ${file/\.pdf/})

	pdftoppm -png -singlefile $dir/$file ./thumbs/$name
	# do something with the file
    done
