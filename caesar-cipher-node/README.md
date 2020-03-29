## Caesar cipher CLI tool
Implemented CLI tool that can encode and decode a text by Caesar cipher.

CLI tool accept 4 *options*:

```
-s, --shift: must be an integer (reqired)
-a, --action: an action 'encode' or 'decode' (reqired)
-i, --input: input file 
-o, --output: output file
```

## Usage example 

```
node ./index.js -s 7 --action decode -i read.txt -o write.txt

```

```
node ./index.js -s 25 --action decode -i

```