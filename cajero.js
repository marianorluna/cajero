class Billete
{
    constructor(n, v, c)
    {
        this.imagen = new Image();
        this.nombre = n;
        this.valor = v;
        this.cantidad = c;

        this.imagen.src = imagenes[this.nombre]
    }
}

function entregarDinero()
{
    resultadoTxt.innerHTML = "";
    console.log("CAJA es igual a " + saldoIni);
    let t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    for(let bi of caja)
    {
        if(dinero > 0 && dinero % 5 == 0 && dinero <= saldoIni && t.value.length != 0 && parseFloat(t.value) - Math.floor(parseFloat(t.value)) == 0 && parseFloat(t.value) > 0)
        {
            div = Math.floor(dinero / bi.valor);
            if(div > bi.cantidad)
            {
                papeles = bi.cantidad;
            }
            else
            {
                papeles = div;
            }
            entregado.push( new Billete(bi.nombre, bi.valor, papeles) );
            dinero = dinero - (bi.valor * papeles);
            bi.cantidad = bi.cantidad - papeles;
        }
    }
    if(dinero > 0)
    {
        resultado.innerHTML = "No se puede entregar esa cantidad. <br />" + "Su saldo disponible es de <strong>" + saldoIni + "</strong> euros. <br />";
        validar = false;
    }
    else if(dinero % 5 != 0)
    {
        resultado.innerHTML = "El billete de menor denominación es de 5 euros. <br />Por favor introduzca otro valor. <br />";
        validar = false;
    }
    else if(t.value.length == 0)
    {
        resultado.innerHTML = "Aún no ha ingresado ninguna cantidad. <br />";
        validar = false;
    }
    else if(parseFloat(t.value) - Math.floor(parseFloat(t.value)) != 0)
    {
        resultado.innerHTML = "La cantidad no puede tener decimales. <br />";
        validar = false;
    }
    else if(parseFloat(t.value) <= 0)
    {
        resultado.innerHTML = "Ingrese una cantidad válida, por favor. <br />";
        validar = false;
    }
    else
    {
        resultado.innerHTML = "";
        for(let e of entregado)
        {
            if(e.cantidad > 0)
            {
            resultado.innerHTML = "<div class=" + "bil" + ">" + resultado.innerHTML + e.cantidad + " de €" + e.valor + "<img src=" + e.imagen.src + " />" + "</div><hr /><br />";
            }
        }
        resultadoTxt.innerHTML = "Ha retirado <strong>" + parseInt(t.value) + "</strong> euros. <br /><br />"
        validar = true;
        saldoCaja();
    }
}

function saldoCaja()
{
    if(validar == true)
    {
        let saldo = 0;
        saldo = saldoIni;
        for(let bill of caja)
        {
            saldo = saldo + bill.cantidad * bill.valor;
        }
        saldo = saldo - saldoIni;
        document.getElementById("saldo").value = saldo;
        saldoIni = saldo;
    }
    else
    {
        validar = false;
    }
}

function saldoInicial()
{
    saldoIni = 0;
    for(let bil of caja)
    {
        saldoIni += bil.cantidad * bil.valor;
    }
    console.log("Saldo inicial es igual a " + saldoIni);
    return document.getElementById("saldo").value = saldoIni;
}

// Diccionario de imágenes o Array asociativo
let imagenes = [];
imagenes["200 euros"] = "img/b200.jpg";
imagenes["100 euros"] = "img/b100.jpg";
imagenes["50 euros"] = "img/b050.jpg";
imagenes["20 euros"] = "img/b020.jpg";
imagenes["10 euros"] = "img/b010.jpg";
imagenes["5 euros"] = "img/b005.jpg";

let caja = [];
caja.push( new Billete("200 euros", 200, 10) );
caja.push( new Billete("100 euros", 100, 40) );
caja.push( new Billete("50 euros", 50, 40) );
caja.push( new Billete("20 euros", 20, 50) );
caja.push( new Billete("10 euros",10, 50) );
caja.push( new Billete("5 euros",5, 100) );

let entregado = [];
let dinero = 0;
let div = 0;
let papeles = 0;
let saldoIni;
let validar = false;

let resultado = document.getElementById("resultado");
let b = document.getElementById("boton-extraer");
b.addEventListener("click", entregarDinero);
window.addEventListener("load", saldoInicial);