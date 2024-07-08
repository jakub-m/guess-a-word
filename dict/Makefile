default: cli_query_filter.js cli_generate_boomfilter.js

cli_query_filter.js: cli_query_filter.ts filter_data.ts
	npx tsc cli_query_filter.ts
filter_data.ts: cli_generate_boomfilter.js
	python3 select_words.py | node cli_generate_boomfilter.js > filter_data.ts
cli_generate_boomfilter.js: cli_generate_boomfilter.ts
	npx tsc cli_generate_boomfilter.ts
clean:
	rm -fv cli_generate_boomfilter.js cli_query_filter.js filter_data.ts 
.PHONY: clean

