#!/bin/sh
rm -r docs
yarn build:docs:file

for file in index.html global.css
do
    cp public/$file docs/$file
done

cp -r markdown docs