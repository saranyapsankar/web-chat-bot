﻿import jsPDF from 'jspdf';
(function (jsPDFAPI) {
const callAddFont = function () {
this.addFileToVFS('NotoSansCJKjp-bold.ttf', font);
this.addFont('NotoSansCJKjp-bold.ttf', 'NotoSansCJKjp', 'bold');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);