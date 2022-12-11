if [ -z "$1" ];
  then 
    echo "Error: Expected a day number, like 07."
    exit 1;
  else echo "Setting up new day $1..."; 
fi

mkdir $1
cd $1

echo "export const input = \`\`;" > input.mjs
echo "// https://adventofcode.com/2022/day/$1" > solution.mjs
cat ../solution.template.mjs >> solution.mjs

cd ..
echo "Done!"
