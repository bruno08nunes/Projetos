function calcular() {
    let num = document.getElementById("num")
    let tempi = document.getElementsByName("tempi")
    let tempf = document.getElementsByName("tempf")
    let res = document.getElementById("res")
    if (num.value.length == 0) {
        alert("Por favor, coloque um número")
    } else {
        if (tempi[0].checked) {
            if (tempf[0].checked) {
                res.innerText = num.value + "°C"
            } else if (tempf[1].checked){
                res.innerText = num.value*1.8+32 + "°F"
            } else {
                res.innerText = Number(num.value)+273.15 + "°K"
            }
        } else if (tempi[1].checked) {
            if (tempf[0].checked) {
                res.innerText = (num.value-32)/1.8 + "°C"
            } else if (tempf[1].checked) {
                res.innerText = num.value + "°F"
            } else {
                res.innerText = (num.value-32)/1.8+273.15 + "°K"
            }
        } else {
            if (tempf[0].checked) {
                res.innerText = num.value-273.15 + "°C"
            } else if (tempf[1].checked) {
                res.innerText = (num.value-273.15)*1.8+32 + "°F"
            } else {
                res.innerText = num.value + "°K"
            }
        }
        res.innerText = res.innerText.replace(".", ",")
    }
}