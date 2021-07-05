import React, { useState ,useRef } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import "./index.css"
import {Link} from "react-router-dom"
function App() {

      
        const [columns, setColumns] = useState([]);
        const [data, setData] = useState([]);

        // process CSV data
        const processData = dataString => {
          const dataStringLines = dataString.split(/\r\n|\n/);
          const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

          const list = [];
          for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (headers && row.length == headers.length) {
              const obj = {};
              for (let j = 0; j < headers.length; j++) {
                let d = row[j];
                if (d.length > 0) {
                  if (d[0] == '"')
                    d = d.substring(1, d.length - 1);
                  if (d[d.length - 1] == '"')
                    d = d.substring(d.length - 2, 1);
                }
                if (headers[j]) {
                  obj[headers[j]] = d;
                }
              }

              // remove the blank rows
              if (Object.values(obj).filter(x => x).length > 0) {
                list.push(obj);
              }
            }
          }

          // prepare columns list from headers
          const columns = headers.map(c => ({
            name: c,
            selector: c,
          }));

          setData(list);
          setColumns(columns);
        }
        //console.log(data)
        //console.log(columns)

        // handle file upload
        const handleFileUpload = e => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
          };
          reader.readAsBinaryString(file);

        }
      
      const [value1,setValue1] =useState();
      const [value2,setValue2] =useState();

      const handleChange1=(e)=>{
        setValue1(e.target.value)

      }


      const handleChange2=(e)=>{
        setValue2(e.target.value)
      }




      const [xaxis,setXaxis] =useState([])
      const [name1,setName1]=useState();
      const [yaxis,setYaxis] = useState()

        const first = useRef();
        const second = useRef();
        var arr;
        var arr2;
        var request ;
        var request2 


        const buttonClick =()=>{
          request = first.current.value;
          request2 = second.current.value;
          setName1(request)
          arr =[];
          arr2 =[];
          data && data.map(item =>arr .push(item[request]))
          data && data.map(item2 =>arr2 .push(Number(item2[request2])))
          setXaxis(arr)
          setYaxis(arr2)
          //console.log(yaxis)
        }
        
        let options =
          {
            chart:{
              type:'line'
            },
            title: {
              text: 'chart'
            },
            xAxis:{
              categories:xaxis
            },
            series:{
              color:'red',
              data:yaxis
            }
          }
        
  function content(){
    return (
      <>
      
        {
          columns && columns.map(each =><option value={each.name}>{each.name}</option>)
        }
      
      </>
    )
  }

  function content2(){
    return (
      <>
        {
          columns && columns.map(each =>
            <option value={each.name}>{each.name}</option>
          )
        }
        
      </>
    )
  }
  return (
    <>
    <Link to="/table"><button style={{background:'black'}}>table Api page</button></Link>
    <div>
      <h3 style={{textAlign:'center'}}>CSV file - Displayed in Highchart</h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable style={{display:'none'}}
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
      <select className='select' ref={first} value={value1} onChange={handleChange1}>
             {content()}  
      </select> <br />

      <select className='select' ref={second} value={value2} onChange={handleChange2}>
          {content2()}
      </select><br />
      <button onClick={buttonClick}>Process</button>

      <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
    </div>
    </>
  );
}

export default App;