# KUNST :: The ALX Bootstrapper


![GitHub](https://img.shields.io/github/license/ifedayoprince/kunst.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/ifedayoprince/kunst.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/ifedayoprince/kunst.svg?style=flat-square)

![GitHub last commit](https://img.shields.io/github/last-commit/ifedayoprince/kunst.svg?style=flat-square)


An easy-to-use, standard ALX bootstrapper.

Kunst generates the file and directory structure of an ALX project based on an exported HTML file from the Intranet.


## How to Use?

- Install Kunst on your local machine.
```bash
npm install kunst
```
- Head over to the project on your ALX Intranet and complete the quiz.

- 

## Usage

### **dev**

`npm run dev`

Runs the CLI application.

You can pass arguments to your application by running `npm run dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `npm`.

### **clean**

`npm run clean`

Removes any built code and any built executables.

### **build**

`npm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`npm run test`

Cleans, then builds, and tests the built code.

### **bundle**

`npm run bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.
