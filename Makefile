ARCHIVE = ./index.zip

archive:
	git archive --format=zip --prefix= master > $(ARCHIVE)
