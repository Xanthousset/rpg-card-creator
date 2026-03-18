import JSZip from "jszip";
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Card } from "~/models/Card"
import html2canvas from 'html2canvas-pro';

type DeckFile = {
  file: Blob,
  filename: string,
}

export const zipAndDownload = (files: DeckFile[] , deckName:string = 'deck') => {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.filename , file.file)
  })

  zip.generateAsync({type:"blob"}).then(function(content) {
    saveAs(content, `${deckName}.zip`);
  });

}

export const saveAsPng = (node: HTMLElement , name: string) => {

  html2canvas(node, {
    width: 750,
    height: 1050,
    scale: 1,
    backgroundColor: null,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob, `${name}.png`);
    }, 'image/png');
  });

}

export const convertToPng = async (node: HTMLElement , name: string ) => {

  let blob = await new Promise((resolve) => {
    html2canvas(node, {
      width: 750,
      height: 1050,
      scale: 1,
      backgroundColor: null,
    }).then((canvas) => {
      canvas.toBlob(resolve, 'image/png');
    });
  });

  return { file: blob, filename: `${name}.png` };

}

export const prepareCardsPng = async (node: HTMLElement , name: string ) => {

  console.log("prepareCardsPng", node, name)

  return await new Promise<string>((resolve) => {
    html2canvas(node, {
      width: 750,
      height: 1050,
      scale: 1,
      backgroundColor: null,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  });

}

export const exportDeckToPDF = async (cards:string[] , name:string = "deck") => {

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [2481, 3507], // A4 in pixels at 300 DPI
    compress: true,
  });

  // 1. Get back of card (last item)
  const cardBack = cards.pop();
  if (!cardBack) {
    console.error("No back of card found !");
    return;
  }

  // 2.Setup PDF template
  // grid 3x3
  const margin = 50;
  const xStart = (2481 - (3 * 750 + 2 * margin)) / 2; // Center X
  const yStart = (3507 - (3 * 1050 + 2 * margin)) / 2; // Center Y

  // 3. Cards loop
  let x = xStart;
  let y = yStart;
  let pageNumber = 0;

  for (let i = 0; i < cards.length; i++) {

    if (i > 0 && i % 9 === 0) {
      pdf.addPage([2481, 3507], 'portrait'); // Ajoute une nouvelle page A4
      pageNumber++;
      x = xStart; // Reset x
      y = yStart; // Reset y
    }

    // New row (every 3 cards)
    else if (i > 0 && i % 3 === 0) {
      x = xStart;
      y += 1050 + margin;
    }

    pdf.addImage(cards[i], 'PNG', x, y, 750, 1050);
    x += 750 + margin;
  }

  // 4. Final page with 9x Back of card
  pdf.addPage([2481, 3507], 'portrait');
  x = xStart;
  y = yStart;

  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      x = xStart;
      y += 1050 + margin;
    }
    pdf.addImage(cardBack, 'PNG', x, y, 750, 1050);
    x += 750 + margin;
  }

  // 5. Save PDF

  if (name === "") {
    name = "deck";
  }

  pdf.save(`${name}.pdf`);

}
