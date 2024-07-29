import 'mdui/components/avatar.js';
import 'mdui/components/card'

const BioCard = (props) => {

    var dataImage = localStorage.getItem("fileBase64");
    let userData = JSON.parse(localStorage.getItem("UserData"));
    return(
        <mdui-card id="BioCard">
            <mdui-avatar src={ dataImage}></mdui-avatar>
            <h3 id="userName">{userData.name}</h3>
            <p id="userBio">{userData.bio}</p>
        </mdui-card>
    )
}
export default BioCard