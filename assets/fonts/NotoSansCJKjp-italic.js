﻿import jsPDF from 'jspdf';
(function (jsPDFAPI) {
const callAddFont = function () {
this.addFileToVFS('NotoSansCJKjp-italic.ttf', font);
this.addFont('NotoSansCJKjp-italic.ttf', 'NotoSansCJKjp', 'italic');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);