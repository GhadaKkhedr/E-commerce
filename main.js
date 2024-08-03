//-------------------
// global variables |
//-------------------
var Slider = document.querySelector(".slider");
var products = new Array();
var Cards = document.querySelectorAll(".card");
var Cardimags = document.querySelectorAll(".card-img-top");
var names = document.querySelectorAll(".card-title");
var prices = document.querySelectorAll(".price");
var numOfItemsinCart = 0;
var counter = 0;
var total = 0;


function load()
{
    try{
        products= JSON.parse(localStorage.products);
        console.log(products);
        counter = 0 ;
        products.forEach(product => {
            var newDiv =document.createElement("div");
            newDiv.id = product[0];
            var img = product[1]
            var name = product[2];
            var price = product[3];
            var quantity = product[4];


            newDiv.innerHTML = `
            <img src="${img}" style='width:40px;height:40px'/>
            <span style='margin:10px'>${name}</span>
            <span style="margin-left:10px">${price}
                <label style="border-radius: 90%;border: 1px solid black;margin-left:10px;padding: 3px;" id="lbl${counter}">${quantity}</label>
                <ul style="list-style: none;display: inline-flex; flex-direction: column;">
                    <li><i class="fa-solid fa-square-plus btn btn-secondry"  onclick="addItem(${newDiv.id},lbl${counter})"></i></li>
                    <li><i class="fa-solid fa-square-minus btn btn-secondry" onclick="removeItem(${newDiv.id},lbl${counter})"></i></li>
                </ul>
            </span>
            <br>
        `
        console.log(newDiv);
        Slider.append(newDiv);   
        counter++;
        });
        
    }
    catch{}
    
}
//----------------------
// Create Divs in cart |
//----------------------
function addToCart(item) {

    let num = 1;

    const img = item.querySelector(".card-img-top").getAttribute("src");

    const arrayColumn = getCol(products, 1);
   // console.log("col" + arrayColumn);
    let row = arrayColumn.indexOf(img);
   // console.log("row" + row);

    if (row !== -1) { // already exist ( update number of items only)
        products[row][4] += 1;
        console.log(products[row][4]);
        var newlbl = document.getElementById("lbl" + row);
        console.log(newlbl);
        newlbl.innerText = products[row][4];
        total+=products[row][3];

    }
    else { // doesn't exist , add new item
        let newDiv = document.createElement("div");
        newDiv.id = "Div" + counter;
      //  console.log(newDiv.id);
        newDiv.classList.add("Product-box");
        //console.log(img);
        const name = item.querySelector(".card-title").innerHTML;
        const price = item.querySelector(".price").innerHTML;

        //     products.push("img:"+img,"name:"+ name,"price:"+ price,"num:"+ num );
        products[counter] = [newDiv.id, img, name, price, num];
        total+=price;
        console.log(products);
        newDiv.innerHTML = `
        <img src="${img}" style='width:40px;height:40px'/>
        <span style='margin:10px'>${name}</span>
        <span style="margin-left:10px">${price}
            <label style="border-radius: 90%;border: 1px solid black;margin-left:10px;padding: 3px;" id="lbl${counter}">${num}</label>
            <ul style="list-style: none;display: inline-flex; flex-direction: column;">
                <li><i class="fa-solid fa-square-plus btn btn-secondry"  onclick="addItem(${newDiv.id},lbl${counter})"></i></li>
                <li><i class="fa-solid fa-square-minus btn btn-secondry" onclick="removeItem(${newDiv.id},lbl${counter})"></i></li>
            </ul>
        </span>
        <br>
    `
        
        counter+=1;
        numOfItemsinCart += 1;
        Slider.appendChild(newDiv);
    }
    try{
        localStorage.removeItem("products");
    }
    catch{}
    localStorage.setItem("products",JSON.stringify(products));
}
/*
Cards.forEach((card, i) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("Product-box");
    var img = Cardimags[i].getAttribute("src");
    var name = names[i].innerHTML;
    var price = prices[i].innerHTML;
    products[i] = { img, name, price }
    newDiv.innerHTML = `
    <img src="${img}" style='width:40px;height:40px'/>
    <span style='margin:20px'>${name}</span>
    <span style='margin:20px'>${price}</span>
    <br>
`
    Slider.appendChild(newDiv);
})
    
}*/

/// show visa details
function BuyForm() {
    window.open("checkoutData.html", this,products);
}

// get column from matrix (2D array)
function getCol(arr, n) {
    let col = arr.map(x => x[n]);
   /* console.log(col);
    let row = col.indexOf("Div"+n);
    console.log (row);*/
    return col;
}

// add item from plus button
function addItem(Div,lbl)
{
   // let product = products.find(pro=>pro[0]===DivId);
   let col = getCol(products,0);
   let row = col.indexOf(Div.id);
    console.log(row);
    console.log(products[row][4]);
    products[row][4]=parseInt(products[row][4])+1;
    lbl.innerText = products[row][4];

    try{
        localStorage.removeItem("products");
    }
    catch{}
    localStorage.setItem("products",JSON.stringify(products));
}
// remove item from minus button
function removeItem(Div,lbl)
{
    let col = getCol(products,0);
    let row = col.indexOf(Div.id);
    console.log (row);
  //  let product = products.find(pro=>pro[0]===DivId);
    products[row][4] = parseInt(products[row][4])-1;
    lbl.innerText =  products[row][4] ;
    console.log(products[row][4]);
    if(products[row][4] === 0)
    {
       // let tempArray=[] ;
      
      // products.splice(Div.id.substring(3, 6),1);
    /*  for(let i = 0;i<= parseInt(Div.id.substring(3, 6)); i++)
      {
        tempArray.unshift(products.shift());
      }
      if(tempArray.length>0)
      {
            tempArray.shift();
        for(let j=0 ; j < tempArray.length;j++)
        {
            products.unshift(tempArray.shift());
        }
        
      }
    */
        total-=products[row][3];
        products = deleteRow(products,Div.id.substring(3, 6));
       // products.splice(Div.id,1);
       document.getElementById(Div.id).innerHTML="";
       numOfItemsinCart-=1;

    try{
        localStorage.removeItem("products");
    }
    catch{}
    localStorage.setItem("products",JSON.stringify(products));
    }
}
function deleteRow(arr, row) {
    var tempArr = arr.slice(0); // make copy
    tempArr.splice(row , 1);
    return tempArr;
 }