function fn(){
    var targetDate=new Date("2018-01-01");
    var indexDate=new Date();
    console.log(indexDate);
    var total=(targetDate-indexDate);
    var days=Math.floor(total/24/60/60/1000);
    var hours=indexDate.getMinutes()==0?24-indexDate.getHours():24-indexDate.getHours()-1;
    var minutes=indexDate.getSeconds()==0?60-indexDate.getMinutes():60-indexDate.getMinutes()-1;
    var seconed=60-indexDate.getSeconds();

    

    return {
        days:days,
        hours:hours.toString().length==1?"0"+hours.toString():hours.toString(),
        minutes:minutes.toString().length==1?"0"+minutes.toString():minutes.toString(),
        seconed:seconed.toString().length==1?"0"+seconed.toString():seconed.toString(),
    }
}

setInterval(function(){
    var json=fn();
    document.getElementById("days").innerText=json.days;
    document.getElementById("date").innerText=json.hours+":"+json.minutes+":"+json.seconed;
},10000);