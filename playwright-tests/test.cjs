console.log("Test script loaded");
module.exports = { imgCheck };
// playwright-tests/test.js
//import { chromium } from 'playwright';
console.log("BEFORE TEST");
// Exportera imgCheck-funktionen korrekt
async function imgCheck(page) { //funktionens namn som hänvisas i flowFunction i yaml-filen dvs imgCheck
  console.log("INSIDE TEST");
  //const browser = await chromium.launch({ headless: false });  // Sätt till `true` för att köra utan gränssnitt
  

  // Funktion för att kontrollera att alla bilder är synliga
  async function checkImagesOnPage(url) {
    await page.goto(url);  // Navigera till sidan

    // Vänta tills alla bilder är laddade (kan justeras beroende på behov)
    const images = await page.$$('img');  // Hämta alla <img> element på sidan

    // Kontrollera om varje bild är synlig (har storlek)
    for (let img of images) {
      const isVisible = await img.isVisible();
      if (!isVisible) {
        console.log(`Bild på ${url} är inte synlig.`);
        throw new Error(`Bild på ${url} är inte synlig.`);
      }
    }

    console.log(`Alla bilder på ${url} är synliga.`);
  }

  // Kontrollera bilder på varje URL
  try {
    await checkImagesOnPage('http://127.0.0.1:4000/kategori/frukt-och-gront');
    await checkImagesOnPage('http://127.0.0.1:4000/kategori/blommor-och-tradgard');
    await checkImagesOnPage('http://127.0.0.1:4000/kategori/apotek');
  } catch (error) {
    console.error('Fel vid bildkontroll:', error);
    await browser.close();
    throw error;  // Om något går fel, kasta ett fel så att Artillery kan hantera det
  }

  // Stäng browsern när testet är klart
  //await browser.close();
}

/*

.: ANVÄNDARES RÖRELSEMÖNSTER? :.

	1. Nyfiken förstagångs-användare - klickar runt för att se vad som finns

	2. "Vet vad jag är ute efter"-användare - klickar in direkt på en kategori och specifik vara utefter specifikt sorteringsval

	3. "Kompareraren"-användare - klickar runt på snarlika varor och velar mellan två eller flera varor och försöker göra en jämförelse (jämförelsepris?)

	4. "den snåle"-användaren - klickar runt och försöker hitta de billigaste priserna på varor i kategorier - sorteringsval efter billigast

*/
