﻿import jsPDF from 'jspdf';
(function (jsPDFAPI) {
const callAddFont = function () {
this.addFileToVFS('NotoSansCJKjp-normal.ttf', font);
this.addFont('NotoSansCJKjp-normal.ttf', 'NotoSansCJKjp', 'normal');
};
jsPDFAPI.events.push(['addFonts', callAddFont])
 })(jsPDF.API);