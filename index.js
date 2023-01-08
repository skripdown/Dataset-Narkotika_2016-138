const fileStream    = require('fs');
const pdfParse      = require('pdf-parse');
const excel         = require('excel4node');

let size            = 0;
const records       = [];
const makeRecord    = (id, evidence, statement)=>{
    evidence        = (evidence.replaceAll(/\n/gm, ' ')).replaceAll(/;/g, ';\n').replaceAll(/ +/g, ' ');
    statement       = statement.replaceAll(/\n+/gm, ' ').replaceAll(/\d+\./gm, '\n').replaceAll(/ +/g, ' ');

    return  {
        'No Putusan'        : id,
        'Lembaga Peradilan' : 'PN Banda Aceh',
        'Barang Bukti'      : evidence,
        'Amar Putusan'      : statement,
    };
};
const getPdf        = async file=>{
    let readFile    = fileStream.readFileSync(file);
    try {
        let extract     = await pdfParse(readFile);
        let text        = extract.text.replaceAll(/Halaman +\d+ +dari +\d+ +Putusan +Nomor [\w\/. ]+\n/gm, '').replaceAll(/Halaman \d+ *\n/gm, '').replaceAll(/\n+/gm, '\n');
        let id          = (/P *U *T *U *S *A *N\nNomor *([\w \/.]+)\n/m.exec(text))[1];
        let target      = '1.Menyatakan' + (text.split(/\d+\. *Menyatakan/))[1];
        let evidence    = (target.split(/\d+\.(Menyatakan|Menetapkan) +barang +bukti +berupa *:? *\n/m))[1];
        let statements  = target.split(/(Halaman +\d+ +dari|Disclaimer)/);

        if (evidence === 'Menetapkan' || evidence === 'Menyatakan') {
            evidence    = (target.split(/\d+\.(Menyatakan|Menetapkan) +barang +bukti +berupa *:? *\n/m))[2];
            evidence    = (evidence.split(/untuk +dimusnahkan *.?/m))[0] + 'untuk dimusnahkan.';
            evidence    = (evidence.split(/\n\d+ *\. */m))[0];
        }
        if (!evidence) {
            target      = '1.Menyatakan' + (text.split(/\d+\. *Menyatakan/))[2];
            if (/\d+\.(Menyatakan|Menetapkan) +barang +bukti +berupa *:?\n/m.exec(target) != null) {
                //console.log('not evidence');
                evidence    = (target.split(/\d+\.(Menyatakan|Menetapkan) +barang +bukti +berupa *:?\n/m))[2];
                evidence    = (target.split(/Disclaimer/m))[0];
                evidence    = evidence.split(/\d+\. *(Menetapkan|Menghukum)/)[0];
                console.log(evidence + '\n\n');
            }
            else {
                target      = '1.Menyatakan' + (text.split(/\d+\. *Menyatakan/))[3];
                evidence    = target;
                evidence    = evidence.split(/\d+\. *(Menetapkan|Menghukum)/)[0];
                evidence    = evidence.split('Disclaimer')[0]
            }
        }
        else {
            evidence    = evidence.split(/\d+\. *(Menetapkan|Menghukum|Menyatakan)/)[0];
        }

        evidence        = evidence.replaceAll(/^\d+ *\.? *Menyatakan +barang +bukti +berupa *:? *\n/gm, '');
        //console.log(evidence);
        records.push(makeRecord(id, evidence, statements[0]));
    } catch (e) {
        console.error(e);
    }
};
// const pdf           = 'berkas/putusan_207_pid.sus_2022_pn_bna_20230107124626.pdf';
// getPdf(pdf);
const root          = 'berkas';
fileStream.readdir(root, (err, files)=>{
    if (err)
        console.error(err);
    else {
        size        = files.length;
        files.forEach(filename=>{
            getPdf(root + '/' + filename).then(()=>{
                size--;
            });
        })
    }
});
const iter          = setInterval(()=>{
    if (size < 1) {
        clearInterval(iter);
        const wb    = new excel.Workbook();
        const sheet = wb.addWorksheet('PN Banda Aceh');
        const heading   = [
            'No Putusan',
            'Lembaga Peradilan',
            'Barang Bukti',
            'Amar Putusan',
        ];
        let hdColIndex  = 1;
        heading.forEach(hd=>{
            sheet.cell(1, hdColIndex++).string(hd);
        });
        let rowIndex    = 2;
        records.forEach(record=>{
            let colIndex    = 1;
            Object.keys(record).forEach(colName=>{
                sheet.cell(rowIndex, colIndex++).string(record[colName]);
            });
            rowIndex++;
        });
        wb.write('Overview/overview.xlsx');
    }
}, 100);