filter_data.ts: generate_boomfilter.js
	python3 select_words.py | node generate_boomfilter.js > filter_data.ts
generate_boomfilter.js: generate_boomfilter.ts
	npx tsc generate_boomfilter.ts
clean:
	rm -fv generate_boomfilter.ts
.PHONY: clean


