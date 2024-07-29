import "mdui/components/switch";
import "mdui/components/button";
import "mdui/components/button-icon";
import "mdui/components/checkbox";
import "mdui/components/card";
import SettingPair from "./TitleSettingPair";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "mdui/components/radio-group.js";
import "mdui/components/radio.js";
import { getColorFromImage } from "mdui/functions/getColorFromImage.js";
import { setColorScheme } from "mdui/functions/setColorScheme.js";
import setTheme from "../../Engine/engine";

const SettingsMode = (props) => {
  //1.Progfilesettings
  const [image, setimage] = useState(localStorage.getItem("fileBase64"));
  const [userName, setUserName] = useState(
    JSON.parse(localStorage["UserData"]).name
  );
  const [userBio, setUserBio] = useState(
    JSON.parse(localStorage["UserData"]).bio
  );
  const [dailyTime, setDailyTime] = useState(
    JSON.parse(localStorage["UserData"]).time
  );
  const [colorMode, setColor] = useState();
  const nameRef = useRef(userName);
  const bioRef = useRef(userBio);
  const timeRef = useRef(dailyTime);
  const colorModeRef = useRef(colorMode);

  useEffect(() => {
    document
      .getElementById("nameField")
      .addEventListener("change", handleUserNameChange, true);
    document
      .getElementById("bioField")
      .addEventListener("change", handleUserBioChange, true);
    document
      .getElementById("saveButton")
      .addEventListener("click", handleSaving, true);
    document
      .getElementById("dynamicColorMode")
      .addEventListener("change", handleColorModeChange, true);
    document
      .getElementById("dailyTimeSlider")
      .addEventListener("change", handleDailyTimeChange, true);

    document.getElementById("staticColorPicker").setAttribute("value", JSON.parse(localStorage["Theme"]).color)
      if(JSON.parse(localStorage["Theme"]).dark){
        document.getElementById("darkModeSwitch").setAttribute("checked","");
      }else{
        document.getElementById("darkModeSwitch").setAttribute("unchecked","");
      }
  }, []);

  const handleSaving = (e) => {
    const file = document.getElementById("imagepicker").files[0];
    if (typeof file !== "undefined") {
      getBase64(file).then(
        (base64) => {
          localStorage["fileBase64"] = base64;
        }
      );
    }
    const dynamicColorMode = document.getElementById("dynamicColorMode").value;
    const isDarkMode = document.getElementById("darkModeSwitch").checked;
    const staticColor = document.getElementById("staticColorPicker").value;

    localStorage["UserData"] = JSON.stringify({
      name: nameRef.current,
      bio: bioRef.current,
      time: timeRef.current
    });
    localStorage["Theme"] = JSON.stringify({
      mode: dynamicColorMode,
      dark: isDarkMode,
      color: staticColor,
    });

    setTheme.setTheme(dynamicColorMode, isDarkMode, staticColor);
  };
  const handleImageChange = (e) => {
    const file = document.getElementById("imagepicker").files[0];
    if (typeof file !== "undefined") {
      getBase64(file).then(
        (base64) => {
          setimage(base64);
        }

        //console.debug("file stored",base64);
      );
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    nameRef.current = e.target.value;
  };
  const handleUserBioChange = (e) => {
    setUserBio(e.target.value);
    bioRef.current = e.target.value;
  };
  const handleColorModeChange = (e) => {
    setColor(document.getElementById("dynamicColorMode").value);
    colorModeRef.current = document.getElementById("dynamicColorMode").value;
    console.log(document.getElementById("dynamicColorMode").value);
    if (document.getElementById("dynamicColorMode").value === "static") {
      document.getElementById("colorPickerCard").removeAttribute("disabled");
      document.getElementById("staticColorPicker").removeAttribute("disabled");
    } else {
      document.getElementById("staticColorPicker").setAttribute("disabled", "");
      document.getElementById("colorPickerCard").setAttribute("disabled", "");
    }
  };
  const handleDailyTimeChange = (e) => {
    setDailyTime(e.target.value);
    timeRef.current = e.target.value;
  };
  
  

  return (
    <>
      <div id="settingsContainer">
        <h1>settings</h1>
        <mdui-card className="SettingsSection">
          <h3>profile</h3>
          <p className="SettingPair">
            Profile Image
            <span><label className="custom-file-upload">
              Choose Image
              <input
                type="file"
                id="imagepicker"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
            </label>{" "}<mdui-avatar src={image}></mdui-avatar></span>
            
            
          </p>
          <mdui-text-field
            variant="outlined"
            label="Name"
            id="nameField"
            end-icon="edit"
            value={userName}
          ></mdui-text-field>
          <mdui-text-field
            variant="outlined"
            label="Bio"
            id="bioField"
            end-icon="edit"
            value={userBio}
            rows="3"
          ></mdui-text-field>
        </mdui-card>
        <mdui-card className="SettingsSection">
          <h3>Goals</h3>
          <p className="SettingPair">
            Daily time
            <mdui-slider min="5" max="50" step="1" id="dailyTimeSlider" value={dailyTime}></mdui-slider>
          </p>
        </mdui-card>
        <mdui-card className="SettingsSection">
          <h3>Theme</h3>
          <p className="SettingPair">
            Dark Mode
            <mdui-switch
              unchecked-icon="light_mode"
              checked-icon="dark_mode"
              id="darkModeSwitch"
            ></mdui-switch>
          </p>
          <p className="SettingPair">
            Color mode
            <mdui-radio-group value="daily" id="dynamicColorMode">
              <mdui-radio value="daily">Daily</mdui-radio>
              <mdui-radio value="profile">Profile Picture</mdui-radio>
              <mdui-radio value="static">Static Color</mdui-radio>
            </mdui-radio-group>
          </p>
          <mdui-card disabled id="colorPickerCard">
            <p className="SettingPair">
              Static color
              <input type="color" id="staticColorPicker" disabled ></input>
            </p>
          </mdui-card>
        </mdui-card>

        <mdui-button variant="filled" id="saveButton">
          Save
        </mdui-button>
      </div>
    </>
  );
};
export default SettingsMode;
