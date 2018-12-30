let click = false;
function buttonclick(id){
    
    // the id is of the type btn0,2

    // let a = id.split(',');
    // let first = a[0];
    // let second = a[1];
    // first = first.substring(3,first.length());

    var property = document.getElementById(id);
    if(!click){
        property.style.backgroundColor = '#FF0000'
        click = true;
    }
    else{
        property.style.backgroundColor = '#000000'
        click = false;
    }
}
// function buttonclick(){
//     var property = document.getElementById('btn0,1');
//     if(!click){
//         property.style.backgroundColor = '#FF0000'
//         click = true;
//     }
//     else{
//         property.style.backgroundColor = '#000000'
//         click = false;
//     }
// }
let board_array = [];
for(let i=0;i<13;++i){
    let c= [];
    for(let j=0;j<13;++j){
        c.push(document.getElementById('btn' + i + ',' + j));
    }
    board_array.push(c);
}

// for(){
//     for(){
        
//     }
// }
// console.log(board_array[3][4]);


// make 12 arrays of the columns
// add all the arrays to a new array
// you get a 2D array of the points
row_array.push(document.getElementById('btn01'),
    document.getElementById('btn02'),
    document.getElementById('btn03')
    
    );

column_array.push(document.getElementById('btn01'),
    document.getElementById('btn02'),
    document.getElementById('btn03')
    
    );