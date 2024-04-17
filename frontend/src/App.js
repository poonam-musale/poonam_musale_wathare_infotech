import Graph from "./components/Graph";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [st, setStartTime] = useState(null);
  const [et, setEndTime] = useState(null);
  const [zero, setZeros] = useState(0);
  const [one, setOnes] = useState(0);
  const [zeroVariations, setZeroVariations] = useState(0);
  const [oneVariations, setOneVariations] = useState(0);
  var ch = 0;
  var countspan = 0;

  const fetchData = async (stt,edt) => {
    try {
      let url = "";
      if((stt == undefined) && (edt == undefined)) {
        url = "http://127.0.0.1:5000/data";
      }
      else {
        url = "http://127.0.0.1:5000/data?st=" + stt + "&et=" + edt;
      }
      const response = await axios.get(url);
      setData(response.data);
      setStartTime(response.data[0].ts);
      setEndTime(response.data[response.data.length - 1].ts);
      let czero = 0;
      let cone = 0;
      let zeroVariations = 0;
      let oneVariations = 0;
      let zeroLength = 0;
      let oneLength = 0;
      response.data.map((ele) => {
        if(ele.machine_status == 0) {
          czero++;
        }
        else {
          cone++;
        }
        if (ele.machine_status === 0) {
          zeroLength++;
          if (oneLength > 0) {
            oneVariations++;
          }
          oneLength = 0;
        } else {
          oneLength++;
          if (zeroLength > 0) {
            zeroVariations++;
          }
          zeroLength = 0;
        }
      });
      setZeroVariations(zeroVariations);
      setOneVariations(oneVariations);
      setZeros(czero);
      setOnes(cone);
      countspan = (countHalfHoursBetweenDates(st,et) - 1);
      ch = 100 / (countHalfHoursBetweenDates(st,et));
      console.log("ch",ch);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function countHalfHoursBetweenDates(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    const timeDifference = Math.abs(date2 - date1);
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    const halfHoursDifference = hoursDifference * 2;
    return halfHoursDifference;
  }
  return (
    <div className="app">
      <div className="btnright">
        <button className="btn" onClick={() => {const date = new Date(st);date.setHours(date.getHours() + 1);let ed = date.toISOString();fetchData(st,ed)}}>
          1 Hr
        </button>
        <button className="btn" onClick={() => {const date = new Date(st);date.setHours(date.getHours() + 8);let ed = date.toISOString();fetchData(st,ed)}} >
          8 Hr
        </button>
        <button className="btn" onClick={() => {const date = new Date(st);date.setHours(date.getHours() + 24);let ed = date.toISOString();fetchData(st,ed)}}>
          24 Hr
        </button>
      </div>
      <div>
        <div id="pregraph">Cycle Status</div>
        {loading ? (
          <div>Loading......</div>
        ) : (
          <Graph data={data} loading={loading} error={error}></Graph>
        )}
      </div>
      <div id="timeline">
      {loading ? (
          <div>Loading......</div>
        ) : (
          <div>
          <span className="left">{st.split('T')[1].split('Z')[0]}</span>
          <span className="right">{et.split('T')[1].split('Z')[0]}</span>
          </div>
        )}
      </div>
      <div id="table">
        <table className="myTable">
          <tr>
            <th className="header"> No. of 0's</th>
            <td className="cell">{zero}</td>
          </tr>
          <tr>
            <th className="header"> No. of 1's</th>
            <td className="cell">{one}</td>
          </tr>
          <tr>
            <th className="header"> No. of continous 0's</th>
            <td className="cell">{zeroVariations}</td>
          </tr>
          <tr>
            <th className="header">No. of continous 1's</th>
            <td className="cell">{oneVariations}</td>
          </tr>
        
        </table>
      </div>
    </div>
  );
}

export default App;
