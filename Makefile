# grouped tasks
make:
	make install
	make compile
	make test
all:
	make preinstall
	make install
	make
	make publish

# tasks
preinstall:
	npm  install -g cnpm --registry=http://registry.npm.taobao.org
	cnpm install -g webpack
	cnpm install -g jasmine
install:
	cnpm install
	npm  install

test:

publish:
	npm  publish
	cnpm sync marked-plus-renderer

