const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const readline = require('readline');

let arrA = [];
let arrB = [];
let file;
let file1;
let file2;
let res = [];
let aColLen;
let aRowLen;
let bRowLen;
let bColLen;
let j = 0;

function matrixMul(arr1, arr2) {
    const newArr = [];

    for(let i = 0; i < arr1.length; i++) {
        let result = [];
        for(let j = 0; j < arr2[0].length; j++) {
            let elem = 0;
            for(let k = 0; k < arr2.length; k++) { // arr1[0].length도 가능.
                elem += arr1[i][k] * arr2[k][j];
            }
            result.push(elem);
        }
        newArr.push(result);
    }
    return newArr;
}

function readFilePromise(path, encoding){
    return new Promise(function(res, rej){
        fs.readFile(path, encoding, function(err, data){
            if(err){
                rej(err);
                return;
            }
            res(data);
        })
    })
}

function parse(fileName, data) {
    let arr = [];
    const rows = data.split(/\r?\n|\r/);
    if(rows[rows.length - 1] === "") {
        rows.pop();
    }
    //console.log(rows);
    let rowlen = rows.length;
    let collen;
    for (const i in rows) {
        const row = rows[i];
        const data = row.split(",");
        arr.push(data);
        collen = data.length;
        if (j === 0) {
            aColLen = collen;
            aRowLen = rowlen;
        } else {
            bRowLen = rowlen;
            bColLen = collen;
        }
    }
    j++;
    file = String(fileName).slice(0,-4);
    console.log(file + ` - (${rowlen}*${collen})`);
    return arr;
}


const curPath = path.join(__dirname, 'in');
let outPath = path.join(__dirname, 'out');

fs.readdir(curPath, function(err, files){
    if(err){
        console.error(err);
        return;
    }
    //console.log(__dirname);
    console.log("Welcome to the matrix product calculator");
    console.log("The following matrices are founded.");
    async function readMatrix(){
        let i = 0;
        for (let fileName of files){
            let inputFileFullPath = path.join(__dirname, 'in', fileName);
            let data = await readFilePromise(inputFileFullPath, "utf-8")
            let matrix = parse(fileName, data);
            if (i === 0) {
                arrA = matrix;
                file1 = String(fileName).slice(0,-4);
                //console.log('filename: ' + file1);
            } else {
                arrB = matrix;
                file2 = String(fileName).slice(0,-4);
            }
            i++;
        }
    }
    readMatrix().then(function() {
        reader.question("Now, input the left matrix for product ... : ", answerCallback)
    })
});

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const answerCallback = (answer) => {
    reader.question("Now, input the right matrix for product ... : ", function(ans) {
        if (answer === file1) {
            console.log('\n\n');
            console.log("Matrix Production : " + file1 + " * " + file2);
            if (aColLen !== bRowLen) {
                console.log('Cannot product Matrix multiplication');
                exit(1);
            }
            res = matrixMul(arrA, arrB);
            //console.log(res);
        } else {
            console.log('\n\n');
            console.log("Matrix Production : " + file2 + " * " + file1);
            if (bColLen !== aRowLen) {
                console.log('Cannot product Matrix multiplication');
                exit(1);
            }
            res = matrixMul(arrB, arrA);
            //console.log(res);
        }

        console.log(`calculation done. The size is (${res.length} * ${res[0].length})`);
        reader.question("The matrix name for save (without csv extension) ... : ", outFile);
    });
}

const outFile = (outAnswer) => {
    outPath = path.join(outPath, `${outAnswer}.csv`)
    res = res.join('\n');
    //console.log(res)
    fs.writeFile(`${outPath}`, res, 'utf-8', function(err) {
        if (err) {
            throw err;
        }
    })
    reader.close();
}