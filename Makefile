BUILD = build

all: html js css

build:
	mkdir -p $(BUILD)/css $(BUILD)/js

$(BUILD)/css/%.css: css/%.less
	lessc $< > $@

css: $(BUILD) $(BUILD)/css/main.css

$(BUILD)/js/main.js: build.js $(shell find js -name "*.js" -type f)
	r.js -o build.js

js: build $(BUILD)/js/main.js

$(BUILD)/index.html: index.html
	cp index.html $(BUILD)/index.html

html: build $(BUILD)/index.html

clean:
	rm -rf build
