// Test script using Banana.Report
//
// @id = ch.banana.app.utilties.booksreport
// @api = 1.0
// @pubdate = 2016-09-21
// @publisher = Banana.ch SA
// @description = Book Report
// @task = app.command
// @doctype = 400.140.*
// @docproperties = library
// @outputformat = none
// @inputdatasource = none
// @timeout = -1

function exec(string) {

    //Parameters
    var parametri = {};
    parametri.reportHeader = "Elenco completo: " + Banana.document.info("Base", "HeaderLeft");
    parametri.soloDirittoVoto = false;
    parametri.soloUnaRiga = false;
    
    //Check if the table Items exists
    var itemsTable = Banana.document.table("Items");
    if (!itemsTable) { return; }
    
    //Create the report 
    var report = Banana.Report.newReport(parametri.reportHeader);
    
    //Get all the rows of the Items table and sort them
    itemsRows = itemsTable.findRows(function (row) { return (!row.isEmpty) });
    itemsRows = itemsRows.sort(function (a, b) { return sortByCategory(a, b) });


    //************ BEGIN REPORT ************//
    report.addParagraph(" ", "");
    report.addParagraph(" ", "");
    report.addParagraph(parametri.reportHeader, "title");

    var text;
    var cellReport;
    var tableReport = report.addTable("tableReport");
    
    /* 
        Header tabella 
    */
    var tableHeader = tableReport.getHeader();
    var tableHeaderRow = tableHeader.addRow("");

    tableHeaderRow.addCell(Banana.document.info("Items","TableHeader"), "headerTable bold center");
    tableHeaderRow.addCell("Location", "headerTable bold center");
   

    /* 
        Dati tabella 
    */
    for (var i = 0; i < itemsRows.length; i++) {
        var currentRow = itemsRows[i];

        //Check if the given columns of the current row are not empty
        if (!columnsEmpty(currentRow, ["Title", "Author", "Publisher", "Category"])) {
            
            var rowReport = tableReport.addRow();

            var cell = rowReport.addCell("", "");

    		AddText(currentRow, "Title", cell, "bold", true);
    		AddText(currentRow, "Author", cell, "");
    		AddText(currentRow, "Publisher", cell, "italic");
    		AddText(currentRow, "Cast", cell, "italic");
    		AddText(currentRow, "Producer", cell, "italic");
    		AddText(currentRow, "Category", cell, "");
    		AddText(currentRow, "SubCategory", cell, "");
    		AddText(currentRow, "Subject", cell, "italic");
    		AddText(currentRow, "Genres", cell, "");
    		AddText(currentRow, "Classification", cell, "");
    		AddText(currentRow, "Code", cell, "italic");
    		AddText(currentRow, "ProductVolume", cell, "");
    		AddText(currentRow, "SubCategory", cell, "");
    		AddText(currentRow, "Section", cell, "");
    		AddText(currentRow, "Location", cell, "");
    		AddDate(currentRow, "DateEntry", cell, "");
    		/* Eventually ask user if he wants to print other columns */
    		
    			
            text = currentRow.value("RowId");
            cellReport = rowReport.addCell(text, "");
    		
            /*text = Banana.Converter.toLocaleDateFormat(currentRow.value("DateOfBirth"));
            cellReport = rowReport.addCell();
            cellReport.addParagraph(text);
            */
        }
    }

    //Add header and footer
    addHeader(report);
    addFooter(report);
    
    //Aggiunge stile e stampa il report
    var stylesheet = createStyleSheet();
    Banana.Report.preview(report, stylesheet);
}




//Function that checks if the columns of the row are empty
function columnsEmpty(row, arrColumns) {
    for (var i = 0; i < arrColumns.length; i++) {
        if (!row.value(arrColumns[i])) {
            return true;
        }
    }
}




function AddText(currentRow, column, report, style, first) {

	var text = currentRow.value(column);
	if (text && text.length > 0) {
		
        // if first don't add separator
		if (first) {
			report.addText(text, style);
		}
		else {
			report.addText("; " + text, style);
		}
	}
}




function AddDate(currentRow, column, report, style, first) {
	var text = currentRow.value(column);
	if (text && text.length > 0) {
		text = Banana.Converter.toLocaleDateFormat(currentRow.value(text));
		if (first) {
			report.addText(text, style);
		}
		else {
			report.addText("; " + text, style);
		}
	}

}






function sortByCategory(a, b) {
    var texta = a.value("Category") + "$" + a.value("Author") + "$" + a.value("Title");
    var textb = b.value("Category") + "$" + b.value("Author") + "$" + b.value("Title");
    if (texta > textb)
        return 1;
    else if (texta == textb)
        return 0;
    return -1;
}





/* Function that prints the header */
function addHeader(report) {

    var headerLeft = Banana.document.info("Base","HeaderLeft");
    var headerRight = Banana.document.info("Base","HeaderRight");
    var startDate = Banana.document.info("AccountingDataBase","OpeningDate");
    var endDate = Banana.document.info("AccountingDataBase","ClosureDate");
    var company = Banana.document.info("AccountingDataBase","Company");
    var courtesy = Banana.document.info("AccountingDataBase","Courtesy");
    var name = Banana.document.info("AccountingDataBase","Name");
    var familyName = Banana.document.info("AccountingDataBase","FamilyName");
    var address1 = Banana.document.info("AccountingDataBase","Address1");
    var address2 = Banana.document.info("AccountingDataBase","Address2");
    var zip = Banana.document.info("AccountingDataBase","Zip");
    var city = Banana.document.info("AccountingDataBase","City");
    var state = Banana.document.info("AccountingDataBase","State");
    var country = Banana.document.info("AccountingDataBase","Country");
    var web = Banana.document.info("AccountingDataBase","Web");
    var email = Banana.document.info("AccountingDataBase","Email");
    var phone = Banana.document.info("AccountingDataBase","Phone");
    var mobile = Banana.document.info("AccountingDataBase","Mobile");
    var fax = Banana.document.info("AccountingDataBase","Fax");
    var fiscalNumber = Banana.document.info("AccountingDataBase","FiscalNumber");
    var vatNumber = Banana.document.info("AccountingDataBase","VatNumber");

    var pageHeader = report.getHeader();
    //pageHeader.addClass("header");
    //pageHeader.addText(parametri.reportHeader);

    var tab = pageHeader.addTable("header");
    var col1 = tab.addColumn("headerCol1");
    var col2 = tab.addColumn("headerCol2");


    var image = Banana.document.table('Documents').findRowByValue('RowId', 'logo').value('Attachments');
    if (image) {
        tableRow = tab.addRow();
        tableRow.addCell("", "", 1).addImage("documents:logo", "img center");
    } else {
        tableRow = tab.addRow();
        tableRow.addCell("", "", 1);
    }
    
    var businessCell = tableRow.addCell("", "", 1);
    businessCell.addParagraph(company, "bigLogo timeNewRoman center");
    businessCell.addParagraph(address1 + ", " + zip + " - " + city, "center");
    businessCell.addParagraph("Tel: " + phone + ", Email: " + email, "center");
}




/* Function that prints the footer */
function addFooter(report) {
    var footer = report.getFooter();
    footer.addText(Banana.Converter.toLocaleDateFormat(new Date()) + "                                                               ");
    footer.addText("Banana Library" + "                                                               ").setUrlLink("http://www.banana.ch");
    footer.addFieldPageNr();
} 




function createStyleSheet() {
    
    var stylesheet = Banana.Report.newStyleSheet();
    var pageStyle = stylesheet.addStyle("@page");
    
    pageStyle.setAttribute("margin", "15mm 20mm 10mm 20mm");

    stylesheet.addStyle("body", "font-family:Helvetica; font-size:10pt");
    stylesheet.addStyle(".italic", "font-style:italic;");
    stylesheet.addStyle(".center", "text-align:center");
    stylesheet.addStyle(".bold", "font-weight:bold");

    stylesheet.addStyle(".headerCol1", "width:20pt");
    stylesheet.addStyle(".headerCol2", "width:65pt");
    stylesheet.addStyle(".bigLogo", "font-size: 35");
    stylesheet.addStyle(".img", "heigth:50%;width:50%;padding-bottom:20pt");
    stylesheet.addStyle(".padding-top", "padding-top:20pt");


    var titleStyle = stylesheet.addStyle(".title");
    titleStyle.setAttribute("font-size", "13");
    titleStyle.setAttribute("text-align", "center");
    titleStyle.setAttribute("margin-bottom", "0.5em");

    var headerStyle = stylesheet.addStyle(".header");
    headerStyle.setAttribute("width", "100%");

    var headerTableStyle = stylesheet.addStyle(".headerTable");
    headerTableStyle.setAttribute("background-color", "#E0E0E0");
    headerTableStyle.setAttribute("color", "black");

    var tableStyle = stylesheet.addStyle(".tableReport");
    tableStyle.setAttribute("width", "100%");
    stylesheet.addStyle("table.tableReport td", "border: thin solid black;");

    return stylesheet;
}
