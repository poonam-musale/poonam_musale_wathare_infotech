import React, { useState, useEffect, useRef } from 'react';

function Graph({ data, error }) {
  const grapgDiv = useRef(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if(grapgDiv.current){
      const width = grapgDiv.current.clientWidth / data.length;
      setWidth(width);
    }
    function handleResize(e) {
      let dataLength = (data.length) ? data.length : 1;
      let w = document.getElementById("graph").offsetWidth / dataLength;
      setWidth(w);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);
  if (error) return <p>Error: {error.message}</p>;

  let defaultStyle = {
    backgroundColor: "yellow", 
    height: "35px", 
    display: "inline-block",
    width: "1px"
  }
  return (
    <div id="graph" ref={grapgDiv}>
      {data.map((item, index) => {
        if (item.machine_status === 0) {
          return <span key={index} style={{ ...defaultStyle, width: width, backgroundColor: "yellow" }} />
        }
        else if (item.machine_status === 1) {
          return <span key={index} style={{ ...defaultStyle, width: width, backgroundColor: "green" }} />
        }
        else {
          return <span key={index} style={{ ...defaultStyle, width: width, backgroundColor: "red" }} />
        }
      })}
    </div>
  );
}

export default Graph;


// width: 100 / data: 200 == 0.5px