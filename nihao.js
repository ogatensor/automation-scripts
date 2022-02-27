const args = process.argv.slice(2); 
const [name] = args;

if (name === undefined) { 
    console.error('you need to pass a name')
    process.exit(0); 
}
/*
the args array is now
[ 
  '/usr/local/bin/node',
  '/usr/src/app/my-node-script.js', 
  'Akira Kanye '
]
slice(2) makes the third argument equal to the args object because 
normally the first argument you pass to a node script starts from the third
index in the array. 
*/
console.log(`sup, ${name}`); 
