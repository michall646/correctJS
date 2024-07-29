let getdomtxt = (element, iswrong, istyped) => {
    let elements_txt = "";
    // element {value: type:}
    if(istyped)
    {
        elements_txt += `<span className="typed">${element.value}</span>`
        if(iswrong)
        {
            elements_txt += `<span className=\"wrong\">${element.value}</span>`
        }
    }
    
    if(element.type === "known")
    {
        elements_txt += `<span className="untyped">${element.value}</span>`
    }
    if(element.type === "unknown")
    {
        elements_txt += "<span className=\"unknown\">"+"["+ element.value +"|"+ element.alt +"]"+"</span>`"
    }

        
    
    return elements_txt;
}
export default getdomtxt;