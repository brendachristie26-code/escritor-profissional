import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';

export async function generateDOCX(content: string, filename: string, logoDataUrl?: string): Promise<void> {
  const lines = content.split('\n');
  const children = lines.map((line, index) => {
    const isHeading = index < 2 && line.trim().length > 2 && line.trim() === line.trim().toUpperCase();

    return new Paragraph({
      alignment: isHeading ? AlignmentType.CENTER : AlignmentType.LEFT,
      spacing: { after: line.trim() ? 120 : 240, line: 360 },
      children: [
        new TextRun({
          text: line,
          bold: isHeading,
          font: 'Times New Roman',
          size: isHeading ? 28 : 24,
        }),
      ],
    });
  });

  const logoChildren = logoDataUrl
    ? [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 180 },
          children: [
            new ImageRun({
              data: logoDataUrl.split(',')[1] ?? '',
              type: logoDataUrl.startsWith('data:image/jpeg') ? 'jpg' : 'png',
              transformation: { width: 160, height: 80 },
            }),
          ],
        }),
      ]
    : [];

  const document = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [...logoChildren, ...children],
      },
    ],
  });

  const blob = await Packer.toBlob(document);
  const url = window.URL.createObjectURL(blob);
  const anchor = window.document.createElement('a');
  anchor.href = url;
  anchor.download = `${filename}.docx`;
  anchor.click();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
}
