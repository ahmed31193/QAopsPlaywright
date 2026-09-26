const Exceljs = require('exceljs');
const {test , expect} = require('@playwright/test');

async function WriteExcel(searchtext , replacetext,change, pathfile){

const workbook = new Exceljs.Workbook();
await workbook.xlsx.readFile(pathfile);
const worksheet = workbook.getWorksheet("Sheet1");
const output = await ReadExcel(worksheet , searchtext) ;
const cell = worksheet.getCell(output.row + change.rowChange , output.col + change.colChange);
cell.value = replacetext;
await workbook.xlsx.writeFile(pathfile);
}

async function ReadExcel(worksheet , searchtext) {
    let output = {row : -1 , col : -1};
    worksheet.eachRow((row , rownumber) => 
    {
            row.eachCell((cell , coloumnnumber) => 
            {
                // console.log(cell.value);
                if (cell.value == searchtext)
                {
                    // console.log(rownumber + ' , ' + coloumnnumber);
                    output.row = rownumber;
                    output.col = coloumnnumber;
                }
                
            })

    })
    return output;
    
}


// WriteExcel('Mango', 'Rabbit', "C:/Users/Ahmed_Amer/Downloads/exceltest.xlsx");

//Update Mango price to 350
// WriteExcel('Mango', 350 ,{rowChange : 0 , colChange : 2} ,"C:/Users/Ahmed_Amer/Downloads/exceltest.xlsx");

test('upload dowload excel' , async({page})=>{

    const textsearch = 'Mango';
    const updatedvalue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const [download] = await Promise.all([
         page.waitForEvent('download'),
         page.getByRole('button', { name: 'Download' }).click()
    ]);
    const downloadPath = "C:/Users/Ahmed_Amer/Downloads/download.xlsx";
    await download.saveAs(downloadPath);
    WriteExcel(textsearch, 350, { rowChange: 0, colChange: 2 }, downloadPath);
    // await page.getByRole('button' , {name : 'Download'}).click();
    // const downloadPromise = page.waitForEvent('download');
    // await downloadPrpmise;
    // WriteExcel('Mango', 350 ,{rowChange : 0 , colChange : 2} ,"C:/Users/Ahmed_Amer/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(downloadPath);

    const textlocator = page.getByText(textsearch);
    const desiredrow = await page.getByRole('row').filter({has : textlocator});
    await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updatedvalue);
})