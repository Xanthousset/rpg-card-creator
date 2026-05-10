import JSZip from "jszip";
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Card } from "~/models/Card"
import html2canvas from 'html2canvas-pro';

type DeckFile = {
  file: Blob,
  filename: string,
}

export const zipAndDownload = async (files: DeckFile[] , deckName:string = 'deck') => {
  const zip = new JSZip();

  if (!deckName) {
    deckName = "deck";
  }

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
    removeContainer: true,
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

export const exportDeckToPDFBackup = async (cards:string[] , name:string = "deck") => {

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

export const exportDeckToPDF = async (cards: string[], name: string = "deck") => {

  const settings = useOptionsStore().options

  const cutLinesEnabled = settings.print.cutLines;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const drawConnectedCutMarks = (
    pdf: jsPDF,
    xStart: number,
    yStart: number,
    cardWidth: number,
    cardHeight: number,
    margin: number
  ) => {

    if(!cutLinesEnabled) {
      return
    }

      pdf.setDrawColor(150);
    pdf.setLineWidth(0.2);
    pdf.setLineDash([1, 1], 0);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {

        const x = xStart + col * (cardWidth + margin);
        const y = yStart + row * (cardHeight + margin);

        // 🔹 LIGNES HORIZONTALES (haut + bas de chaque carte)
        pdf.line(
          x - margin / 2,
          y,
          x + cardWidth + margin / 2,
          y
        );

        pdf.line(
          x - margin / 2,
          y + cardHeight,
          x + cardWidth + margin / 2,
          y + cardHeight
        );

        // 🔹 LIGNES VERTICALES (gauche + droite)
        pdf.line(
          x,
          y - margin / 2,
          x,
          y + cardHeight + margin / 2
        );

        pdf.line(
          x + cardWidth,
          y - margin / 2,
          x + cardWidth,
          y + cardHeight + margin / 2
        );
      }
    }

    pdf.setLineDash([]);
  };

  // A4 dimensions
  const pageWidth = 210;
  const pageHeight = 297;

  // Card size (standard ~63x89 mm)
  const cardWidth = 63;
  const cardHeight = 89;
  const margin = 4;

  // 1. Get back of card (last item)
  const cardBack = cards.pop();
  if (!cardBack) {
    console.error("No back of card found !");
    return;
  }

  // 2. Center grid 3x3
  const xStart = (pageWidth - (3 * cardWidth + 2 * margin)) / 2;
  const yStart = (pageHeight - (3 * cardHeight + 2 * margin)) / 2;

  // 3. Cards loop
  let x = xStart;
  let y = yStart;

  for (let i = 0; i < cards.length; i++) {

    // New page every 9 cards
    if (i > 0 && i % 9 === 0) {

      pdf.addPage();

      x = xStart;
      y = yStart;
        drawConnectedCutMarks(pdf, xStart, yStart, cardWidth, cardHeight, margin)
    }

    // New row every 3 cards
    else if (i > 0 && i % 3 === 0) {
      x = xStart;
      y += cardHeight + margin;
    }

    pdf.addImage(cards[i], 'PNG', x, y, cardWidth, cardHeight);
      drawConnectedCutMarks(pdf, xStart, yStart, cardWidth, cardHeight, margin)
    x += cardWidth + margin;
  }

  // 4. Final page with 9x back of card
  pdf.addPage();
  x = xStart;
  y = yStart;

  for (let i = 0; i < 9; i++) {
    if (i > 0 && i % 3 === 0) {
      x = xStart;
      y += cardHeight + margin;
    }

    pdf.addImage(cardBack, 'PNG', x, y, cardWidth, cardHeight);
      drawConnectedCutMarks(pdf, xStart, yStart, cardWidth, cardHeight, margin)
    x += cardWidth + margin;
  }

  // 5. Save PDF
  if (!name) {
    name = "deck";
  }

  pdf.save(`${name}.pdf`);
}
