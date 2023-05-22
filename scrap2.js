const axios = require("axios");
const { JSDOM } = require('jsdom');
const XLSX = require('xlsx');
(async ()=>{
    const tableData = [];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([]);
    for (let i = 1; i <= 2; i++) {
        const url = `https://www.myshiptracking.com/ports?sort=ID&page=${i}`;
        const { data } = await axios.get('https://www.myshiptracking.com/ports'); 
        const dom = new JSDOM(data);
        const document = dom.window.document;
        const table = document.querySelector('table');
        const rows = table.querySelectorAll('tr');
        let portId;
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const rowData = [];
            cells.forEach((cell) => {
                const href = (cell.childNodes[0].href);
                if(href !== undefined){
                    const splitted = href.split("#inport");
                    if(splitted.length === 2)  portId = (splitted[0].split("-id-")[1]);
                    console.log(portId);
                    //console.log(href.split('-'),'port...');
                    //console.log(href.substring(href.search('_id_'),href.length));
                }
                const cellContent = cell.textContent.trim();
              //if(rowData.length = 0) rowData.push(href);
              if(cellContent.length > 0  && cellContent.length < 50 ){
                rowData.push(cellContent);
                if (rowData.length === 7 ) rowData.unshift(portId);
              }
              
            });
            console.log('writing data..',);
            
            tableData.push(rowData);
          });
    
   }


    


   tableData.unshift(['Port Id','Port Name',"Type","Size","Vessels In Port","Arrivals","Departures","Excepted Arrivals"])
   XLSX.utils.sheet_add_aoa(worksheet,tableData, { origin: -1 });
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelFilePath = 'output.xlsx'; // Path and filename for the output Excel file
      XLSX.writeFile(workbook, excelFilePath);
    console.log('data writing completed ...');

})() 