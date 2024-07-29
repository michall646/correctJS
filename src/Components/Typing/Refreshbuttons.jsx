
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/iconbutton/outlined-icon-button';
import { useEffect } from 'react';


function RefreshButton(props) {
   useEffect(() => {
      document.getElementById("refreshButton").addEventListener('click', click, true);
   },[]);
   const click =() => {
      props.refresh();
   }
   
  return (
     <>
        <mdui-button variant="filled" id="refreshButton" icon="refresh">refresh</mdui-button>
     </>
  )
}

export default RefreshButton
