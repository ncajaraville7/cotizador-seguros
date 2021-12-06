class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }

    generarOptionsYear() {
        const fechaMax = new Date().getFullYear();
        const fechaMin = fechaMax - 24;
        const selectYear = document.getElementById('year');

        for(let i = fechaMax; i > fechaMin; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
    }

    mostrarAlerta(mensaje, tipo) {
        const div = document.createElement('div');

        if(tipo === 'error') {
            div.classList.add('error');
        } else {
            div.classList.add('correcto');
        }

        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;

        formulario.insertBefore(div, document.getElementById('resultado'));

        setTimeout( () => div.remove(),3000)
    }

    calcular() {
        let cantidad;
        const base = 2000;

        switch(this.marca) {
            case '1':
                cantidad = base * 1.6
            break;
            case '2':
                cantidad = base * 1.4
            break;
            case '3':
                cantidad = base * 1.4
            break;
            case '4':
                cantidad = base * 1.4
            break;
            case '5':
                cantidad = base * 1.2
            break;
            case '6':
                cantidad = base * 1.6
            break;
            case '7':
                cantidad = base * 1.3
            break;
            case '8':
                cantidad = base * 1.8
            break;
            case '9':
                cantidad = base * 1.8
            break;
            default:
                break;
        }

        const diferencia = new Date().getFullYear() - this.year;

        cantidad -= ((diferencia * 3) * cantidad )  / 100;

        if(this.tipo === 'basico') {
            cantidad *= 1.15;
        } else {
            cantidad *= 1.35;
        }
        return cantidad;
    }

    mostrarResultado(total) {
        const div = document.createElement('div');
        div.classList.add('mt-10');

        div.innerHTML = `
            <p class="header">Tu Resumen</p>
            <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
        `;

        const resultadoDiv = document.getElementById('resultado');

        const spinner = document.getElementById('cargando');
        spinner.style.display = 'block';

        setTimeout( () => {
            spinner.style.display = 'none';
            resultadoDiv.appendChild(div);
        }, 3000)
    }
}

let app = new Seguro();


const formulario = document.getElementById('cotizar-seguro');


document.addEventListener('DOMContentLoaded', () => {
    app.generarOptionsYear();
})

formulario.addEventListener('submit', cotizarSeguro);


function cotizarSeguro(e) {
    e.preventDefault();

    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(!marca || !year || !tipo) {
        app.mostrarAlerta('Debe completar todos los campos', 'error')
    } else {
        app.mostrarAlerta('Cotizando...', 'correcto');
        app = new Seguro(marca, year, tipo)
        const total = app.calcular();
        app.mostrarResultado(total);
    }

    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }
}




