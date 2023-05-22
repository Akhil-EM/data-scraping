const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const XLSX = require('xlsx');
(async () => {
  try {
    const { data } = await axios.get('https://fujairahport.ae/ship_list_new.cfm'); // Replace with the URL of the webpage
    const dom = new JSDOM(data);
    const document = dom.window.document;
     const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    const tables = document.querySelectorAll('tbody'); //[[],]
    let trs = [],tds = [];
    (tables[1].childNodes).forEach(tr =>{
      
      (tr.childNodes).forEach(td =>{
        console.log(td);
    //    if(td.textContent !== '\n              ') tds.push(td.textContent.trim());
        console.log(td.textContent);

        // console.log(td.textContent);
       // XLSX.utils.sheet_add_aoa(worksheet, [td.textContent], { origin: -1 });
      });
      trs.push(tds);
      tds = [];
    })


    
    // XLSX.utils.sheet_add_aoa(worksheet, trs, { origin: -1 });
    //    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    //   const excelFilePath = 'output.xlsx'; // Path and filename for the output Excel file
    //   XLSX.writeFile(workbook, excelFilePath);
  
    //   console.log('Data written to Excel file:', excelFilePath);

  } catch (error) {
    console.log('Error:', error);
  }
})();
