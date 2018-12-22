let click = false;
function buttonclick(){
    var property = document.getElementById('btn01');
    if(!click){
        property.style.backgroundColor = '#FFFFFF'
        click = true;
    }
    else{
        property.style.backgroundColor = '#7FFF00'
        click = false;
    }
}