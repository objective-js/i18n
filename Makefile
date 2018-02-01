#! /usr/bin/make -f
.PHONY: test
.SILENT:
default:help;

## Display this help dialog
help:
	echo "This Makefile help you using yout local development environment."
	echo "Usage: make <action>"
	awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "\t${GREEN}%-20s${NC} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Run the test suite
test:
	node_modules/.bin/mocha