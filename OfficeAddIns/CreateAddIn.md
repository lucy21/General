# Create Office Add-in
The steps below walk you through all the setup of the environment required to run Banana Office Add-ins.

## Prerequisite
Applies to: Microsoft Office Excel 2016 and Microsoft Office Word 2016

## Setup the environment - Local Drive
The simplest way to create a correct and working environment is the following:

1. Create a folder on your local drive (for example, C:\AccountCard).

2.	Create a folder for the Manifests on a network share.

	a)	Create a folder on your local drive (for example, C:\Manifests).
	
    b)	Right click on the folder, select **properties**.
    
	c)	Click on **Sharing** tab.
    
	d)	Click on **Advanced Sharing...**
    
	e)	Check the **Share this folder** box.
  	
	f)	Click **Apply** and then **Ok**.
    
3.	Download the files of the chosen add-in from the Banana Accounting Office Add-ins GitHub repository (for example, https://github.com/BananaAccounting/General/tree/master/OfficeAddIns/ExcelAddIns/AccountCard):
	
	* AccountCardManifest.xml
	* Common.css
	* Home.html
	* Home.js
	* Notification.js


4.	Save all the files into the folder from the step 1.
5.	Edit the XML manifest file (for example, AccountCardManifest.xml):

	a)	Edit the **SourceLocation** tag so that it points to the Home.html file:

	```html
	<SourceLocation DefaultValue="C:\AccountCard\Home.html"/>
	```

	b)	Generate a GUID using an online generator of your choice. Then, replace the value in the **Id** tag:

	```html
	<Id>a64caf30-6b3a-4328-881f-c99623505d23</Id>
	```

6.	Save the file. 
7.	Copy the XML manifest file to the network share from the step 2.
8.	Add the share location that contains the manifest as a trusted app catalog in Excel.
	
    a)	Launch Excel and open a blank spreadsheet.
    
    b)	Choose the **File** tab, and then choose **Options**.

    c)	Choose **Trust Center**, and then choose the **Trust Center Settings** button.

    d)	Choose **Trusted Add-in Catalogs**.

    e)	In the Catalog Url box, enter the **path to the network share you created in step 2**, and then choose **Add Catalog** (to see the path: right click on the shared folder -> Properties -> Sharing -> Network Path).

    f.	Select the **Show** in Menu check box, and then choose **OK**. A message appears to inform you that your settings will be applied the next time you start Office.



## Setup the environment - Web Server
Instead of using a folder on the local drive it is possible to install a local web server and deploy all the add-ins files into it.
In this case just replace the **step 1.** of the **Setup the environment - Local Drive** procedure with the following:

1.	Download a web server (for example, [XAMPP](https://www.apachefriends.org/index.html) for windows).

2.	Install XAMPP.

3.	After the installation, open the **XAMPP Control Panel** and activate **Apache web server** by checking the box and clicking Start.

4.	Go to the folder where XAMPP is installed (usually **C:\xampp\htdocs**).

5.	Basically this is the folder where to put all the files, but it is recommended to create other folder and subfolder in order to separate each add-in. In our case, the final structure should be something like
	* **C:\xampp\htdocs\OfficeAddIns\ExcelAddIns** for all the Excel Add-ins.
		* C:\xampp\htdocs\OfficeAddIns\ExcelAddIns\FirstAddIn
		* C:\xampp\htdocs\OfficeAddIns\ExcelAddIns\SecondAddIn
		* ...
 
	* **C:\xampp\htdocs\OfficeAddIns\WordAddIns** for all the Word Add-ins.
		* C:\xampp\htdocs\OfficeAddIns\WordAddIns\FirstAddIn
		* C:\xampp\htdocs\OfficeAddIns\WordAddIns\SecondAddIn
		* ...




## Resources
Some useful links:
* [Build your first Excel add-in](https://msdn.microsoft.com/en-us/library/office/mt616491.aspx)
* [Excel add-ins programming overview](https://msdn.microsoft.com/en-us/library/office/mt616487.aspx)
* [Excel add-ins JavaScript API reference](https://msdn.microsoft.com/en-us/library/office/mt616490.aspx)


