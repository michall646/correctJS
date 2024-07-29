const gettext = (textLength) => {
    console.log(textLength);
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const org_text_database = [" Drodzy rz Czytelnicy, Wydawcyro i Autorzy, Zespół miesięcznika pilnie czyta nowe książki. Ale gdybyśmy mieli na łamach zamieszczać choćby same adresy bibliograficzne, to urobek wydawców z jednego tylko miesiąca zapełniłby numer od deski do deski i bez grama ilustracji w środku. W 2021 roku wydawcy wypuścili na rynek 33 957 książek. To są 93 pozycje dziennie, a pierwszymi wydaniami wśród nich było aż 85 książek. Nawet jeśli odliczyć literaturę fachową i podręczniki (łącznie dziesięć procent), to wychodzi, że recenzent poważnie traktujący pracę winien dziennie zapoznać się z 77 (siedemdziesięcioma siedmioma!) tytułami. I mniej nie będzie: na przykład maleńka Dania zajmuje pierwsze miejsce w Europie, jeśli chodzi o liczbę książek na jednego mieszkańca. Polska zajmuje w tej klasyfikacji trzecie miejsce – od końca. To znaczy, że mamy jeszcze spory margines – niestety.",
                               "Ostatni raz taką galową pałkę na nazioli robiłam, jak miałam kilkanaście lat. W sklepie z płytami, kasetami i glanami, w którym pracowałam, pałki były dwie, już wystrugane. Leżały na lewo od kasy, obok gazu pieprzowego i mojego taborecika. Wystarczyło tylko je przybrać, wystroić, udekorować jak marzannę i odłożyć na miejsce, aby żart się dopełnił.Kiedyś ten sklep był legendą, ale w soboty nikt lub prawie nikt już do nas nie zaglądał. Była to może zapowiedź upadku punkowych stacjonarnych sklepików, a może ludzie mieli lepsze rzeczy do robienia w weekend niż przymierzanie glanów, portek w moro i przeglądanie kaset z piosenkami o tym, że ktoś jest „pijany i prawdziwy”? Okropnie mi się nudziło. Stworzona do umilania czasu playlista po jakimś czasie budziła już tylko wstręt, ale jej zmiana nie wchodziła w grę. Spać się, owszem, chciało – jak każdej młodej osobie w robocie – ale widmo zagrożenia atakiem nazioli nie pozwalało zasnąć. Dobrze pamiętam tę nudę, urozmaicaną tylko pewnym rodzajem napięcia, który uniemożliwiał czytanie, nie dając nic w zamian."
    ]
    const reverseString = (str)  =>{
        var splitString = str.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join(""); 
        return joinArray;
    }
    let randOrgText = randomIntFromInterval(0,(org_text_database.length -1))
    let OrgText = org_text_database[randOrgText];
    console.log(randOrgText);
    let start = randomIntFromInterval(0, OrgText.length)
    let end = start + textLength;
    
    
    let slicedText = OrgText.slice(start, end);

    let sum = "";
    for(let i = start; i > 0; i--){
        
        if(OrgText[i]=== "."){break}
        else{
            sum += OrgText[i];
        }
    }
    slicedText = reverseString(sum).slice(0,-1) +slicedText;
    sum = "";
    for(let i = end ; i < OrgText.length; i++){
        if(OrgText[i]=== "."){sum += "."; break}
        else{
            sum += OrgText[i];
        }
    }
    let final = slicedText + sum;
    
    return final;
}
export default gettext