import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import '../Universal/App.css'
import TypingMode from '../Typing/TypingMode'
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/icon.js';
import 'mdui/components/button-icon'
import ProfileMode from '../Profile/ProfileMode'
import HomeMode from '../Home/HomeMode';
import SettingsMode from '../Settings/SettingsMode';
import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
import setTheme from '../../Engine/engine'


function App() {
  


  const [AppState, SetAppState] = useState("Home");
  const [TextLength, SetTextLength] = useState(20);
  
  useEffect(() => {
    createLocalData()
    document
      .getElementById("navRail")
      .addEventListener("change", HandleNavRailChange, true);
    document.getElementById("settingsButton").addEventListener("click", HandleNavRailChange, true);
    settheme();
  }, []);

  const HandleNavRailChange = (e) => {
    const navRail = document.getElementById("navRail");
    const button = document.getElementById("settingsButton");
    if(e.type === "click"){
      SetAppState("Settings");
      console.log("settings");
      navRail.value = "settings";
      return;
    }

    switch(navRail.value) {
      case "typing":
        SetAppState("Typing");
        break;
      case "profile":
        SetAppState("ProfileMain");
        break;
      case "home":
        SetAppState("Home");
        break;
    }
  }
  const createLocalData = () => {
    let theme = JSON.parse(localStorage.getItem("Theme"));
    let userData = JSON.parse(localStorage.getItem("UserData"));
    if(theme === null){
      localStorage["Theme"] = JSON.stringify({
        mode: "static",
        dark: false,
        color: "#0cc6fa",
      });
    }
    if(userData === null){
      localStorage["UserData"] = JSON.stringify({
        name: "New CorrectJS user",
        bio: "Your bio",
      });
    }

  }
  const settheme = () => {
    let theme = JSON.parse(localStorage.getItem("Theme"));
    setTheme.setTheme(theme.mode, theme.dark, theme.color);
  
  }

  return (
     <>
     <mdui-navigation-rail value="home" contained id="navRail" style={{position: 'fixed',}}>
      <mdui-navigation-rail-item icon="home--outlined" active-icon="home--filled"value="home">Home</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="keyboard--outlined" active-icon="keyboard--filled"value="typing">Type</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="person--outlined" active-icon="person--filled"value="profile">Profile</mdui-navigation-rail-item>
      <mdui-button-icon icon="settings" slot="bottom" id="settingsButton"></mdui-button-icon>

    </mdui-navigation-rail>
    {(() => {
      switch (AppState) {
                        case "Typing":  return <TypingMode AppState={AppState} SetAppState={SetAppState} TextLength={TextLength} SetTextLength={SetTextLength}/>;
                        case "EndedTyping":  return <TypingMode AppState={AppState} SetAppState={SetAppState} TextLength={TextLength} SetTextLength={SetTextLength}/>;
                        case "ShowingOrhoMistakes":  return <TypingMode AppState={AppState} SetAppState={SetAppState} TextLength={TextLength} SetTextLength={SetTextLength}/>;

                        case "Home": return <HomeMode SetAppState={SetAppState}></HomeMode>;
                        case "ProfileMain" : return <ProfileMode></ProfileMode>;
                        case "Settings": return <SettingsMode></SettingsMode>
                        default: return <span></span>;
                    }
    })()}
    
     </>
  )
  
}

export default App
