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
		  pass: 'pepe1234'
		}
	  });
	  
	  var mailOptions = {
		from: 'fabianmayoral@gmail.com',
		to: 'fabianmayoral@hotmail.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!'
	  };
	  
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  }); 
}

const runAutoDeploy = async () => {
    try {
    	/*while(1)
    	{
    		
	    	const puppeteer = require('puppeteer');
			const browser = await puppeteer.launch()
			const page = await browser.newPage()
			const navigationPromise = page.waitForNavigation()

			await page.goto('https://sede.administracionespublicas.gob.es/icpplus/index.html')

			await page.setViewport({ width: 1366, height: 1366 })

			await page.waitForSelector('#form')
			await page.click('#form')

			await page.select('#form', '/icpco/citar?p=3&locale=es') // Alicante

			await page.waitForSelector('#form')
			await page.click('#form')

			await page.waitForSelector('#btnAceptar')
			await page.click('#btnAceptar')

			await navigationPromise

			console.log('paso 1');

			await page.waitForSelector(".mf-input__l")
			await page.click('.mf-input__l')

			await page.select('.mf-input__l', '7') // FAMILIARES DE RESIDENTES COMUNITARIOS

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
			await page.$eval('#txtIdCitado', el => el.value = 'AAE346933');

			await page.waitForSelector('#txtDesCitado')
			await page.click('#txtDesCitado')
			await page.$eval('#txtDesCitado', el => el.value = 'NADIA SIEGWARTH');

			await page.waitForSelector('#txtAnnoCitado')
			await page.click('#txtAnnoCitado')
			await page.$eval('#txtAnnoCitado', el => el.value = '1985');

			await page.waitForSelector('#txtPaisNac')
			await page.click('#txtPaisNac')

			await page.select('#txtPaisNac', '202')

			await page.waitForSelector('#txtParentesco')
			await page.click('#txtParentesco')

			//await page.select('#txtParentesco', 'C\u00D3NYUGE')
			await page.select('#txtParentesco', 'HIJO')

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

			// sendmail();

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
		*/
		var myArgs = process.argv.slice(2);
		console.log(myArgs);
		/*
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
			const text = await (await element.getProperty("innerText")).jsonValue() + ' = ' + await (await element.getProperty("value")).jsonValue();
			console.log(await text);
		});
		*/
		sendmail()
    } catch(error) {
        console.log(error)
        await setTimeoutPromise(600000);
        runAutoDeploy()
    }
}

runAutoDeploy()
//setInterval(runAutoDeploy, 60000);
