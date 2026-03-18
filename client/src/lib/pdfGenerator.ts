import jsPDF from 'jspdf';

export function generatePDF(content: string, filename: string) {
  try {
    // Criar novo documento PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Configurar fonte
    pdf.setFont('times', 'normal');
    pdf.setFontSize(11);

    // Definir margens
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Dividir texto em linhas
    const lines = pdf.splitTextToSize(content, maxWidth);

    // Adicionar texto ao PDF
    let yPosition = margin;
    const lineHeight = 7;
    const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);

    lines.forEach((line: string, index: number) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    // Salvar o PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Erro ao gerar PDF');
  }
}
