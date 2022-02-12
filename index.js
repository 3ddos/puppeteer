// node --version 
// v8.12.0

// npm --version
// 6.4.1

// Dependencias externas de proyecto
const puppeteer = require('puppeteer')
//const fetch = require('node-fetch')
const { exec } = require('child_process')

// Opciones para la ejecución de Puppeteer
const PUPPETEER_OPTS = {
    headless: false,
    slowMo: { default: 300, click: 200, keyup: 10 },
    devtools: false,
}

const provincias = [
{name:'A Coruña', value: '/icpplus/citar?p=15&locale=es'},
{name:'Albacete', value: '/icpplus/citar?p=2&locale=es'},
{name:'Alicante', value: '/icpco/citar?p=3&locale=es'},
{name:'Almería', value: '/icpplus/citar?p=4&locale=es'},
{name:'Araba', value: '/icpplus/citar?p=1&locale=es'},
{name:'Asturias', value: '/icpplus/citar?p=33&locale=es'},
{name:'Ávila', value: '/icpplus/citar?p=5&locale=es'},
{name:'Badajoz', value: '/icpplus/citar?p=6&locale=es'},
{name:'Barcelona', value: '/icpplustieb/citar?p=8&locale=es'},
{name:'Bizkaia', value: '/icpplus/citar?p=48&locale=es'},
{name:'Burgos', value: '/icpplus/citar?p=9&locale=es'},
{name:'Cáceres', value: '/icpplus/citar?p=10&locale=es'},
{name:'Cádiz', value: '/icpplus/citar?p=11&locale=es'},
{name:'Cantabria', value: '/icpplus/citar?p=39&locale=es'},
{name:'Castellón', value: '/icpplus/citar?p=12&locale=es'},
{name:'Ceuta', value: '/icpplus/citar?p=51&locale=es'},
{name:'Ciudad Real', value: '/icpplus/citar?p=13&locale=es'},
{name:'Córdoba', value: '/icpplus/citar?p=14&locale=es'},
{name:'Cuenca', value: '/icpplus/citar?p=16&locale=es'},
{name:'Gipuzkoa', value: '/icpplus/citar?p=20&locale=es'},
{name:'Girona', value: '/icpplus/citar?p=17&locale=es'},
{name:'Granada', value: '/icpplus/citar?p=18&locale=es'},
{name:'Guadalajara', value: '/icpplus/citar?p=19&locale=es'},
{name:'Huelva', value: '/icpplus/citar?p=21&locale=es'},
{name:'Huesca', value: '/icpplus/citar?p=22&locale=es'},
{name:'Illes Baleares', value: '/icpco/citar?p=7&locale=es'},
{name:'Jaén', value: '/icpplus/citar?p=23&locale=es'},
{name:'La Rioja', value: '/icpplus/citar?p=26&locale=es'},
{name:'Las Palmas', value: '/icpco/citar?p=35&locale=es'},
{name:'León', value: '/icpplus/citar?p=24&locale=es'},
{name:'Lleida', value: '/icpplus/citar?p=25&locale=es'},
{name:'Lugo', value: '/icpplus/citar?p=27&locale=es'},
{name:'Madrid', value: '/icpplustiem/citar?p=28&locale=es'},
{name:'Málaga', value: '/icpco/citar?p=29&locale=es'},
{name:'Melilla', value: '/icpplus/citar?p=52&locale=es'},
{name:'Murcia', value: '/icpplus/citar?p=30&locale=es'},
{name:'Navarra', value: '/icpplus/citar?p=31&locale=es'},
{name:'Orense', value: '/icpplus/citar?p=32&locale=es'},
{name:'Palencia', value: '/icpplus/citar?p=34&locale=es'},
{name:'Pontevedra', value: '/icpplus/citar?p=36&locale=es'},
{name:'Salamanca', value: '/icpplus/citar?p=37&locale=es'},
{name:'S.Cruz Tenerife', value: '/icpco/citar?p=38&locale=es'},
{name:'Segovia', value: '/icpplus/citar?p=40&locale=es'},
{name:'Sevilla', value: '/icpplus/citar?p=41&locale=es'},
{name:'Soria', value: '/icpplus/citar?p=42&locale=es'},
{name:'Tarragona', value: '/icpplus/citar?p=43&locale=es'},
{name:'Teruel', value: '/icpplus/citar?p=44&locale=es'},
{name:'Toledo', value: '/icpplus/citar?p=45&locale=es'},
{name:'Valencia', value: '/icpplus/citar?p=46&locale=es'},
{name:'Valladolid', value: '/icpplus/citar?p=47&locale=es'},
{name:'Zamora', value: '/icpplus/citar?p=49&locale=es'},
{name:'Zaragoza', value: '/icpplus/citar?p=50&locale=es'},
]
/*
const tramites = [
	{name:'Familiares'}
]
*/
let provincia_seleccionada = null;
let tramite_seleccionado = null;

// En este momento no hay citas disponibles.

const setTimeoutPromise = timeout => new Promise(resolve => {        
  setTimeout(resolve, timeout);
});

const makeSound = () => {
	var player = require('play-sound')(opts = {})
 
	// $ mplayer foo.mp3 
	player.play('alarm.mp3', function(err){
	if (err) throw err
	})
}

const sendmail = async () => {
	const nodemailer = require("nodemailer");

	console.log("Send mail");

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'fabianmayoral@gmail.com',
		  pass: 'hlifqsybfpzmzbvq'
		}
	  });
	  
	  var mailOptions = {
		from: 'fabianmayoral@gmail.com',
		to: 'mf.nuet@gmail.com',
		subject: 'TURNO DISPONIBLE',
		text: 'Al parecer hay un turno disponible. APURATE!'
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  }); 
}

const runAutoDeploy = async (prov) => {
    try {
		
    	while(1)
    	{
    		
	    	const puppeteer = require('puppeteer');
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			const navigationPromise = page.waitForNavigation()

			await page.goto('https://sede.administracionespublicas.gob.es/icpplus/index.html')

			await page.setViewport({ width: 1366, height: 1366 })

			await page.waitForSelector('#form')
			await page.click('#form')

			if(provincia_seleccionada)
			{
				await page.select('#form', provincia_seleccionada.value) // Alicante
			}
			else
			{
				// Muestro las provincias
				const elements = await page.$$("#form option");
				elements.forEach(async element => {
					try{
						//const text = await (await element.getProperty("innerText")).jsonValue() + ' = ' + await (await element.getProperty("value")).jsonValue();
						const text = await (await element.getProperty("innerText")).jsonValue();
						console.log(text);
					} catch(err){
						console.log(err);
					}
				});
			}

			await page.waitForSelector('#form')
			await page.click('#form')

			await page.waitForSelector('#btnAceptar')
			await page.click('#btnAceptar')

			await navigationPromise

			console.log('paso 1');

			await page.waitForSelector(".mf-input__l")
			await page.click('.mf-input__l')

			if(tramite_seleccionado)
			{
				await page.select('.mf-input__l', tramite_seleccionado) // FAMILIARES DE RESIDENTES COMUNITARIOS
			}
			else
			{
				// Muestro los tramites
				const elements = await page.$$(".mf-input__l option");
				elements.forEach(async element => {
					try{
						const text = await (await element.getProperty("innerText")).jsonValue() + ' = ' + await (await element.getProperty("value")).jsonValue();
						//const text = await (await element.getProperty("innerText")).jsonValue();
						console.log(text);
					} catch(err){
						console.log(err);
					}
				});
			}

			

			await page.screenshot({ path: 'paso1.png', fullPage: true });

			await page.waitForSelector('#btnAceptar')
			await page.click('#btnAceptar')

			await navigationPromise

			console.log('paso 2');
			await page.screenshot({ path: 'paso2.png', fullPage: true });

			await page.waitForSelector('#btnEntrar')
			await page.click('#btnEntrar')

			await navigationPromise

			console.log('paso 3');

			await page.waitForSelector('.fld > fieldset > .radio-list > li > .w100')
			await page.click('.fld > fieldset > .radio-list > li > .w100') // PASAPORTE

			await page.waitForSelector('#txtIdCitado')
			await page.click('#txtIdCitado')
			await page.$eval('#txtIdCitado', el => el.value = 'AAE123456');

			await page.waitForSelector('#txtDesCitado')
			await page.click('#txtDesCitado')
			await page.$eval('#txtDesCitado', el => el.value = 'PETER ALFONSO');

			await page.waitForSelector('#txtAnnoCitado')
			await page.click('#txtAnnoCitado')
			await page.$eval('#txtAnnoCitado', el => el.value = '1980');

			await page.waitForSelector('#txtPaisNac')
			await page.click('#txtPaisNac')

			await page.select('#txtPaisNac', '202')
			/*
			await page.waitForSelector('#txtParentesco')
			await page.click('#txtParentesco')

			//await page.select('#txtParentesco', 'C\u00D3NYUGE')
			await page.select('#txtParentesco', 'HIJO')
			*/
			await page.screenshot({ path: 'paso3.png', fullPage: true });

			await page.waitForSelector('#btnEnviar')
			await page.click('#btnEnviar')

			await navigationPromise

			console.log('paso 4');
			await page.screenshot({ path: 'paso4.png', fullPage: true });

			await page.waitForSelector('#btnEnviar')
			await page.click('#btnEnviar')

			await navigationPromise

			console.log('paso 5');

			await page.screenshot({ path: 'paso5.png', fullPage: true });

			//const texto = await page.waitForSelector('.mf-msg__info')

			await page.waitForSelector('.mf-msg__info')
			let element = await page.$('.mf-msg__info')
			let value = await page.evaluate(el => el.textContent, element)

			console.log(value);

			var date = new Date();
			var current_hour = date.getHours();
			var current_minutes = date.getMinutes();

			const fs = require('fs')

			const content = current_hour + ':' + current_minutes + ' - ' + value + '\r\n'

			fs.writeFile('log.txt', content, { flag: 'a' }, err => {
			  if (err) {
			    console.error(err)
			    return
			  }
			  //file written successfully
			})

			await browser.close()
			await setTimeoutPromise(600000);
		}
		
    } catch(error) {
        console.log(error)
		sendmail()
		makeSound()
        await setTimeoutPromise(600000);
        runAutoDeploy()
    }
}
/*
const getProvincias = async () => {
	try{
		const puppeteer = require('puppeteer');
		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		const navigationPromise = page.waitForNavigation()

		await page.goto('https://sede.administracionespublicas.gob.es/icpplus/index.html')

		await page.setViewport({ width: 1366, height: 1366 })

		await page.waitForSelector('#form')
		await page.click('#form')

		// Muestro las provincias
		const elements = await page.$$("#form option");
		elements.forEach(async element => {
			try{
				const text = await (await element.getProperty("innerText")).jsonValue() + ' = ' + await (await element.getProperty("value")).jsonValue();
				//const text = await (await element.getProperty("innerText")).jsonValue();
				console.log(text);
			} catch(err){
				console.log(err);
			}
		});
		console.log("fin")
		//await browser.close()
	} catch(error) {
        console.log(error)
    }
}
*/
const buscar_provincia = (nombre) => {
	for(let i=0; i<provincias.length; i++)
	{
		if(provincias[i].name == nombre)
		{
			return provincias[i]
		}
	}
	return null
}

var myArgs = process.argv.slice(2);
console.log(myArgs);

provincia_seleccionada = buscar_provincia(myArgs[0])
tramite_seleccionado = myArgs[1]

runAutoDeploy()
