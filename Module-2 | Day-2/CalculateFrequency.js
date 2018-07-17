function calculateFrequency(string) {
    var stringArr = string.split("");
    function charFreq(char){
        var count = 0;
        for (var i=0; i<stringArr.length; i++){
            if (char==stringArr[i]){
                count+=1;
            }
        }
        return count;
    }
    var set=new Set(stringArr);
    var newStringArr=[...set];
    var output=new Object();
    
    for (var i=0;i<newStringArr.length;i++){
        var char=newStringArr[i];
        output[char]=charFreq(char);
    }
    return output;
}
