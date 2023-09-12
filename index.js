const fs = require('fs');

//ввод replacement.json
let replacement
fs.readFile('replacement.json', (err, data) => {
    if (err) throw err;
    replacement = JSON.parse(data);
});

async function f() {
    const responseData = await fetch('https://raw.githubusercontent.com/thewhitesoft/student-2023-assignment/main/data.json')
    let data = await responseData.json()
    replacement = replacement.reverse()

    let thatsNotAll = true;

    while(thatsNotAll){
        thatsNotAll = false
        const newData = data.map((value)=>{
            for (const replacementElement of replacement) {
                if(value.includes(replacementElement.replacement)){
                    value = value.replace(replacementElement.replacement, replacementElement.source===null?'':replacementElement.source)
                    thatsNotAll = true
                    break;
                }
            }
            return value
        })

        data = newData
    }
    return data
}


f().then(data=>{
    data = JSON.stringify(data)
    fs.writeFile('result.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
})
