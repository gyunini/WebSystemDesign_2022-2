const http = require('http');
const fs = require('fs');
const path = require("path");
var qs = require('querystring');

let i = 1;
let j = 0;
let users = [];

http.createServer(async (req, res) => {
    //console.log(req.method, req.url);
    let outPath = path.join(__dirname, 'responses');
    let Path;
    //console.log(outPath);
    if(req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // console.log(__dirname + '/survey.html');
        // Path = __dirname + '/survey.html'
        fs.readFile(__dirname + '/survey.html', 'utf-8', (err, data) => {
            if(err){
                console.error(err);
            }
            res.end(data);
        })
    } else {
        if(req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            fs.readFile(__dirname + '/survey.html', 'utf-8', (err, data) => {
                if(err){
                    console.error(err);
                }
                res.end(data);
            })
        } else if(req.method === 'POST') {
            if(req.url === '/submit_success') {
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                //console.log('body : ' + body);
                return req.on('end', () => {
                    let name = qs.parse(body);
                    //name = JSON.parse(name);
                    //console.log(name);
                    name = JSON.stringify(name);
                    outPath = path.join(outPath, `response_${i}.json`);
                    i++;
                    fs.writeFile(`${outPath}`, name, 'utf-8', function(err) {
                        if (err) {
                            throw err;
                        }
                    })
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    fs.readFile(__dirname + '/submit_success.html', 'utf-8', (err, data) => {
                        if(err){
                            console.error(err);
                        }
                        res.end(data);
                    })
                });
            } else if (req.url === '/survey_statics') {
                let body = '';
                let sum = 0;
                let name = [];
                let stdId = [];
                let age = [];
                let major = [];
                let subject = [];
                let sw = 0;
                let sc = 0;
                let medi = 0;
                let indust = 0;
                let avg = 0;
                let web = 0;
                let os = 0;
                let ai = 0;
                let se = 0;
                let db = 0;
                let avgId = 0;
                let namestring = '';
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', () => {
                    function readdirPromise(outPath) {
                        return new Promise(function(res, rej) {
                            fs.readdir(outPath, (err, filenames) => {
                                if(err){
                                    rej(err);
                                }
                                res(filenames);
                            })
                        })
                    }
                    function readFilePromise(fileName) {
                        return new Promise(function(res, rej) {
                            fs.readFile(fileName, 'utf-8', (err, data) => {
                                if(err){
                                    rej(err);
                                }
                                console.log(data);
                                res(data);
                            })
                        })
                    }


                    readdirPromise(outPath).then(async (filenames) => {
                        let temp = [];
                        users = [];
                        j = 0;
                        console.log(filenames)
                        await filenames.forEach(file => {
                            let fileName = path.join(outPath, file);
                            console.log(fileName);
                            temp = readFilePromise(fileName).then(async (data) => {
                                temp = [];
                                console.log(JSON.parse(data));
                                users[j] = await JSON.parse(data);
                                j++;
                                return users;
                            })
                        })
                        return temp;
                    }).then((temp) => {
                        console.log('user배열 출력: ' + temp);
                    //--------------------------------
                    name = [];
                    stdId = [];
                    age = [];
                    major = [];
                    subject = [];
                    for(let k = 0; k < j; k++) {
                        name.push(temp[k].name);
                        stdId.push(temp[k].stdId);
                        age.push(temp[k].age);
                        major.push(temp[k].major);
                        subject.push(temp[k].subject);
                    }
                    //console.log(name);
                    //console.log(subject);
                    namestring = '';
                    for (let i = 0; i < name.length; i ++) {
                        namestring += name[i] + '<br>';
                    }
                    //console.log(namestring);
                    //평균 나이
                    sum = 0;
                    for (let i = 0; i < age.length; i++) {
                        sum += parseInt(age[i]);
                    }
                    //console.log(sum);
                    if(sum === 0) {
                        avg = 0;
                    } else {
                        avg = sum / j ;
                    }
                    //평균 학번
                    avgId = 0;
                    for (let i = 0; i < stdId.length; i++) {
                        avgId += parseInt(stdId[i].substr(2,2));
                    }
                    if(avgId !== 0) {
                        avgId = Math.round(avgId / stdId.length);
                    } 
                    //학과 통계
                    sw = 0;
                    medi = 0;
                    sc = 0;
                    indust = 0;
                    for (let i = 0; i < major.length; i++) {
                        if(major[i] === '소프트웨어학과') {
                            sw++;
                        } else if (major[i] === '미디어학과') {
                            medi++;
                        } else if (major[i] === '사이버보안학과') {
                            sc++;
                        } else if (major[i] === '산업공학과') {
                            indust++;
                        }
                    }
                    //과목통계
                    web = 0;
                    os = 0;
                    ai = 0;
                    se = 0;
                    db = 0;
                    for (let i = 0; i < subject.length; i++) {
                        for (let j = 0; j < subject[i].length; j++) {
                            if(subject[i][j] === '웹시스템설계') {
                                web++;
                            } else if (subject[i][j] === '운영체제') {
                                os++;
                            } else if (subject[i][j] === '인공지능') {
                                ai++;
                            } else if (subject[i][j] === '소프트웨어공학') {
                                se++;
                            } else if (subject[i][j] === '데이터베이스') {
                                db++;
                            }
                        }
                    }
                    
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`
                    <!DOCTYPE html>
                    <html lang="ko">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>survey statics</title>
                    </head>
                    <body>
                        <h1>통계</h1>
                        <h3>제출자</h3>
                        <div id="peoples">
                        ${namestring}
                        </div>
                        <h3>제출자 평균 학번</h3>
                        <div id="avgId">${avgId}</div>
                        <h3>제출자 평균 나이</h3>
                        <div id="avgAge">
                        ${avg}
                        </div>
                        <h3>학과 통계</h3>
                        <table border="1">
                            <th>학과</th>
                            <th>인원</th>
                            <tr>
                                <td>소프트웨어학과</td>
                                <td id="소프트웨어학과">${sw}</td>
                            </tr>
                            <tr>
                                <td>미디어학과</td>
                                <td id="미디어학과">${medi}</td>
                            </tr>
                            <tr>
                                <td>사이버보안학과</td>
                                <td id="사이버보안학과">${sc}</td>
                            </tr>
                            <tr>
                                <td>산업공학과</td>
                                <td id="산업공학과">${indust}</td>
                            </tr>
                        </table>
                        <h3>과목 통계</h3>
                        <table border="1">
                            <th>과목</th>
                            <th>인원</th>
                            <tr>
                                <td>웹시스템설계</td>
                                <td id="웹시스템설계">${web}</td>
                            </tr>
                            <tr>
                                <td>운영체제</td>
                                <td id="운영체제">${os}</td>
                            </tr>
                            <tr>
                                <td>인공지능</td>
                                <td id="인공지능">${ai}</td>
                            </tr>
                            <tr>
                                <td>소프트웨어공학</td>
                                <td id="소프트웨어공학">${se}</td>
                            </tr>
                            <tr>
                                <td>데이터베이스</td>
                                <td id="데이터베이스">${db}</td>
                            </tr>
                        </table>
                        <form action="http://localhost:3000">
                            <input type="submit" value="새로운 설문지 응답" />
                        </form>
                    </body>
                    </html>
                    `);
                    // ========================
                    
                    })

                    
                });
            }
        };
    };
}).listen(3000, () => {
    console.log('server start');
})






















// const http = require('http');
// const fs = require('fs');
// const path = require("path");
// var qs = require('querystring');

// let i = 1;
// let j = 0;
// let users = [];

// http.createServer(async (req, res) => {
//     //console.log(req.method, req.url);
//     let outPath = path.join(__dirname, 'responses');
//     //console.log(outPath);
//     if(req.url === '/') {
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         res.end(fs.readFileSync(__dirname + '/survey.html'));
//     } else {
//         if(req.method === 'GET') {
//             res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//             res.end(fs.readFileSync(__dirname + '/survey.html'));
//         } else if(req.method === 'POST') {
//             if(req.url === '/submit_success') {
//                 let body = '';
//                 req.on('data', (data) => {
//                     body += data;
//                 });
//                 //console.log('body : ' + body);
//                 return req.on('end', () => {
//                     let name = qs.parse(body);
//                     //name = JSON.parse(name);
//                     //console.log(name);
//                     name = JSON.stringify(name);
//                     outPath = path.join(outPath, `response_${i}.json`);
//                     i++;
//                     fs.writeFile(`${outPath}`, name, 'utf-8', function(err) {
//                         if (err) {
//                             throw err;
//                         }
//                     })
//                     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//                     res.end(fs.readFileSync(__dirname + '/submit_success.html'));
//                 });
//             } else if (req.url === '/survey_statics') {
//                 let body = '';
//                 let sum = 0;
//                 let name = [];
//                 let stdId = [];
//                 let age = [];
//                 let major = [];
//                 let subject = [];
//                 let sw = 0;
//                 let sc = 0;
//                 let medi = 0;
//                 let indust = 0;
//                 let avg = 0;
//                 let web = 0;
//                 let os = 0;
//                 let ai = 0;
//                 let se = 0;
//                 let db = 0;
//                 let avgId = 0;
//                 req.on('data', (data) => {
//                     body += data;
//                 });
//                 req.on('end', async () => {
//                     filenames = fs.readdirSync(outPath);
//                     users = [];
//                     j = 0;
//                     await filenames.forEach(file => {
//                         // console.log(file);
//                         fileName = path.join(outPath, file);
//                         const data = fs.readFileSync(fileName);
//                         users[j] = JSON.parse(data);
//                         //console.log(JSON.parse(data));
//                         // console.log('name: ' + users[j].name);
//                         // console.log('stdId: ' + users[j].stdId);
//                         // console.log('age: ' + users[j].age);
//                         // console.log('major: ' + users[j].major);
//                         // console.log('subject: ' + users[j].subject);
//                         // console.log('user: ' + users);
//                         j++;
//                     });
//                     name = [];
//                     stdId = [];
//                     age = [];
//                     major = [];
//                     subject = [];
//                     for(let k = 0; k < j; k++) {
//                         name.push(users[k].name);
//                         stdId.push(users[k].stdId);
//                         age.push(users[k].age);
//                         major.push(users[k].major);
//                         subject.push(users[k].subject);
//                     }
//                     //console.log(name);
//                     //console.log(subject);
//                     let namestring = '';
//                     for (let i = 0; i < name.length; i ++) {
//                         namestring += name[i] + '<br>';
//                     }
//                     //console.log(namestring);
//                     //평균 나이
//                     sum = 0;
//                     for (let i = 0; i < age.length; i++) {
//                         sum += parseInt(age[i]);
//                     }
//                     //console.log(sum);
//                     if(sum === 0) {
//                         avg = 0;
//                     } else {
//                         avg = sum / j ;
//                     }
//                     //평균 학번
//                     avgId = 0;
//                     for (let i = 0; i < stdId.length; i++) {
//                         avgId += parseInt(stdId[i].substr(2,2));
//                     }
//                     if(avgId !== 0) {
//                         avgId = Math.round(avgId / stdId.length);
//                     } 
//                     //학과 통계
//                     sw = 0;
//                     medi = 0;
//                     sc = 0;
//                     indust = 0;
//                     for (let i = 0; i < major.length; i++) {
//                         if(major[i] === '소프트웨어학과') {
//                             sw++;
//                         } else if (major[i] === '미디어학과') {
//                             medi++;
//                         } else if (major[i] === '사이버보안학과') {
//                             sc++;
//                         } else if (major[i] === '산업공학과') {
//                             indust++;
//                         }
//                     }
//                     //과목통계
//                     web = 0;
//                     os = 0;
//                     ai = 0;
//                     se = 0;
//                     db = 0;
//                     for (let i = 0; i < subject.length; i++) {
//                         for (let j = 0; j < subject[i].length; j++) {
//                             if(subject[i][j] === '웹시스템설계') {
//                                 web++;
//                             } else if (subject[i][j] === '운영체제') {
//                                 os++;
//                             } else if (subject[i][j] === '인공지능') {
//                                 ai++;
//                             } else if (subject[i][j] === '소프트웨어공학') {
//                                 se++;
//                             } else if (subject[i][j] === '데이터베이스') {
//                                 db++;
//                             }
//                         }
//                     }
//                     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//                     res.end(`
//                     <!DOCTYPE html>
//                     <html lang="ko">
//                     <head>
//                         <meta charset="UTF-8">
//                         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                         <title>survey statics</title>
//                     </head>
//                     <body>
//                         <h1>통계</h1>
//                         <h3>제출자</h3>
//                         <div id="peoples">
//                         ${namestring}
//                         </div>
//                         <h3>제출자 평균 학번</h3>
//                         <div id="avgId">${avgId}</div>
//                         <h3>제출자 평균 나이</h3>
//                         <div id="avgAge">
//                         ${avg}
//                         </div>
//                         <h3>학과 통계</h3>
//                         <table border="1">
//                             <th>학과</th>
//                             <th>인원</th>
//                             <tr>
//                                 <td>소프트웨어학과</td>
//                                 <td id="소프트웨어학과">${sw}</td>
//                             </tr>
//                             <tr>
//                                 <td>미디어학과</td>
//                                 <td id="미디어학과">${medi}</td>
//                             </tr>
//                             <tr>
//                                 <td>사이버보안학과</td>
//                                 <td id="사이버보안학과">${sc}</td>
//                             </tr>
//                             <tr>
//                                 <td>산업공학과</td>
//                                 <td id="산업공학과">${indust}</td>
//                             </tr>
//                         </table>
//                         <h3>과목 통계</h3>
//                         <table border="1">
//                             <th>과목</th>
//                             <th>인원</th>
//                             <tr>
//                                 <td>웹시스템설계</td>
//                                 <td id="웹시스템설계">${web}</td>
//                             </tr>
//                             <tr>
//                                 <td>운영체제</td>
//                                 <td id="운영체제">${os}</td>
//                             </tr>
//                             <tr>
//                                 <td>인공지능</td>
//                                 <td id="인공지능">${ai}</td>
//                             </tr>
//                             <tr>
//                                 <td>소프트웨어공학</td>
//                                 <td id="소프트웨어공학">${se}</td>
//                             </tr>
//                             <tr>
//                                 <td>데이터베이스</td>
//                                 <td id="데이터베이스">${db}</td>
//                             </tr>
//                         </table>
//                         <form action="http://localhost:3000">
//                             <input type="submit" value="새로운 설문지 응답" />
//                         </form>
//                     </body>
//                     </html>
//                     `);
//                 });
//             }
//         };
//     };
// }).listen(3000, () => {
//     console.log('server start');
// })